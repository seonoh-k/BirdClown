package com.example.backend.controller;

import com.example.backend.dto.AlbumDTO;
import com.example.backend.dto.PhotoDTO;
import com.example.backend.dto.PresignedUrlDTO;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.Album;
import com.example.backend.service.AlbumService;
import com.example.backend.service.PhotoService;
import com.example.backend.service.R2StorageService;
import com.example.backend.util.GlobalStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
@Tag(name = "Album API", description = "앨범 생성, 조회, 수정, 삭제 API")
@Log4j2
public class AlbumApiController {

    private final AlbumService albumService;
    private final PhotoService photoService;
    private final R2StorageService r2StorageService;

    @GetMapping
    @Operation(summary = "앨범 목록 조회", description = "생성된 모든 앨범의 목록을 최신순으로 페이징하여 조회합니다.")
    public ResponseEntity<ApiResponse<Page<AlbumDTO.Response>>> getAllAlbums(
            @PageableDefault(size = 10, sort = "eventDate", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<AlbumDTO.Response> albums = albumService.getAllAlbums(pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "모든 앨범 목록을 성공적으로 조회했습니다.", albums));
    }

    @PostMapping
    @Operation(summary = "새 앨범 생성", description = "새로운 이벤트 앨범을 생성합니다.")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> createAlbum(
            @RequestBody AlbumDTO.CreateRequest request) {
        log.info("🔴 event Date : {}, getEventName : {} ", request.getEventDate(),request.getEventName());
        log.info("🟠 getObjectKey : {}, getOriginalFileName : {}",request.getObjectKey(),request.getOriginalFileName());
        log.info("🟠 getFileName : {}",request.getFileName());
        AlbumDTO.Response response = albumService.createAlbum(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(GlobalStatus.CREATED, "앨범이 성공적으로 생성되었습니다.", response));
    }

    @PostMapping("/presigned-url")
    @Operation(summary = "사진 업로드를 위한 Presigned URL 생성", description = "파일 정보를 받아 R2에 직접 업로드할 수 있는 유효시간 5분의 Presigned URL을 생성하여 반환합니다.")
    public ResponseEntity<ApiResponse<PresignedUrlDTO.Response>> getPresignedUrl(
            @RequestBody PresignedUrlDTO.Request request) {

        String originalFileName = request.getFileName();
        String objectKey = r2StorageService.generateThumbnailObjectKey(request.getFileName());
        String fileName = r2StorageService.extractFilename(objectKey);
        String url = r2StorageService.generatePresignedUrl(
                objectKey,
                request.getContentType(),
                request.getContentLength()
        );



        log.info("(☞ﾟヮﾟ)☞ Thumnail Presigned URL : {} ", url);
        log.info("(☞ﾟヮﾟ)☞ Thumnail objectKey : {} ", objectKey);
        log.info("(☞ﾟヮﾟ)☞ Thumnail fileName : {} ", fileName);
        log.info("(☞ﾟヮﾟ)☞ Thumnail originalFileName : {} ", originalFileName);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "Presigned URL이 성공적으로 생성되었습니다.",
                        new PresignedUrlDTO.Response(url, objectKey, fileName, originalFileName)));
    }



    @GetMapping("/{albumId}")
    @Operation(summary = "특정 앨범 및 사진 목록 조회", description = "특정 앨범의 정보와 해당 앨범에 속한 사진 목록을 페이징하여 조회합니다.")
    public ResponseEntity<ApiResponse<Page<PhotoDTO.Response>>> getAlbumWithPhotos(
            @PathVariable Long albumId, @PageableDefault(size = 10) Pageable pageable) {

        Page<PhotoDTO.Response> photos = photoService.getPhotosByAlbum(albumId, pageable);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "앨범 및 사진 목록을 성공적으로 조회했습니다.", photos));
    }
    @PatchMapping("/{albumId}")
    @Operation(summary = "앨범 정보 수정", description = "특정 앨범의 이름 또는 날짜를 수정합니다.")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> updateAlbum(
            @PathVariable Long albumId,
            @RequestBody AlbumDTO.UpdateMetadataRequest request) { // DTO 변경

        AlbumDTO.Response updatedAlbum = albumService.updateAlbum(albumId, request);


        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "앨범 정보가 성공적으로 수정되었습니다.", updatedAlbum));
    }

    @PutMapping("/{albumId}")
    @Operation(summary = "앨범 썸네일 교체", description = "특정 앨범의 썸네일을 수정")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> updateAlbumThumbnail(
            @PathVariable Long albumId,
            @RequestBody AlbumDTO.UpdateThumbnailRequest request) { // DTO 변경

        Album albumById = albumService.getAlbumById(albumId);

        r2StorageService.deleteObject(albumById.getObjectKey());

        AlbumDTO.Response updatedAlbum = albumService.updateThumbnail(albumId, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "앨범 정보가 성공적으로 수정되었습니다.", updatedAlbum));
    }

    @DeleteMapping("/{albumId}")
    @Operation(summary = "앨범 삭제", description = "특정 앨범 및 해당 앨범에 속한 모든 사진을 R2와 DB에서 삭제합니다.")
    public ResponseEntity<ApiResponse<Void>> deleteAlbum(@PathVariable Long albumId) {

        albumService.deleteAlbum(albumId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.success(GlobalStatus.NO_CONTENT, "앨범이 성공적으로 삭제되었습니다."));
    }
}
