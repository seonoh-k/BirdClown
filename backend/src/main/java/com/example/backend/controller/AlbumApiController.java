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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
    public ResponseEntity<ApiResponse<Page<AlbumDTO.Response>>> getAllAlbums(@PageableDefault(size = 10, sort = "eventDate", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<AlbumDTO.Response> albums = albumService.getAllAlbums(pageable);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "모든 앨범 목록을 성공적으로 조회했습니다.", albums));
    }
    @GetMapping("/{albumId}")
    @Operation(summary = "앨범 조회", description = "앨범 하나의 정보를 가져옵니다.")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> getAlbum(@PathVariable Long albumId) {

        Album album = albumService.getAlbumById(albumId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "앨범을 성공적으로 조회 했습니다.", AlbumDTO.Response.from(album)));
    }
    @GetMapping("/{albumId}/photos")
    @Operation(summary = "특정 앨범의 사진 목록 조회", description = "특정 앨범의 정보와 해당 앨범에 속한 사진 목록을 페이징하여 조회합니다.")
    public ResponseEntity<ApiResponse<Page<PhotoDTO.Response>>> getAlbumWithPhotos(@PathVariable Long albumId,
                                                                                   @PageableDefault(size = 10, sort="createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<PhotoDTO.Response> photos = photoService.getPhotosByAlbum(albumId, pageable);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "앨범 및 사진 목록을 성공적으로 조회했습니다.", photos));
    }
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<GlobalStatus>> uploadFile(@RequestPart("request") AlbumDTO.UploadRequest request,
                                                                @RequestPart("file") MultipartFile file) throws IOException{

        String fileName = r2StorageService.uploadAlbumImage(file);

        // 업로드 끝 데이터베이스 저장 로직
        albumService.createAlbum(request, file, fileName);


        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.success(GlobalStatus.NO_CONTENT));
    }

    @PostMapping
    @Operation(summary = "새 앨범 생성", description = "새로운 이벤트 앨범을 생성합니다.")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> createAlbum(@RequestPart("request") AlbumDTO.CreateRequest request,
                                                                      @RequestPart("file") MultipartFile file) throws IOException{
        // 수정 완
        String fileName = r2StorageService.uploadAlbumImage(file);

        request.setFileName(fileName);
        request.setOriginalFileName(file.getOriginalFilename());

        AlbumDTO.Response response = albumService.createAlbum(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(GlobalStatus.CREATED, "앨범이 성공적으로 생성되었습니다.", response));
    }

    @PostMapping("/presigned-url")
    @Operation(summary = "사진 업로드를 위한 Presigned URL 생성", description = "파일 정보를 받아 R2에 직접 업로드할 수 있는 유효시간 5분의 Presigned URL을 생성하여 반환합니다.")
    public ResponseEntity<ApiResponse<PresignedUrlDTO.Response>> getPresignedUrl(@RequestBody PresignedUrlDTO.Request request) {

        String originalFileName = request.getOriginalFileName();
        String objectKey = r2StorageService.generateThumbnailObjectKey(request.getOriginalFileName());
        String fileName = r2StorageService.extractFilename(objectKey);
        String url = r2StorageService.generatePresignedUrl(
                objectKey,
                request.getContentType(),
                request.getContentLength()
        );

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "Presigned URL이 성공적으로 생성되었습니다.",
                        new PresignedUrlDTO.Response(url, fileName, originalFileName)));
    }




    @PutMapping("/update/{albumId}")
    @Operation(summary = "앨범 정보 수정", description = "특정 앨범의 이름 또는 날짜를 수정합니다.")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> updateAlbum(@PathVariable Long albumId,
                                                                      @RequestBody AlbumDTO.UpdateMetadataRequest request) {

        AlbumDTO.Response updatedAlbum = albumService.updateAlbum(albumId, request);


        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "앨범 정보가 성공적으로 수정되었습니다.", updatedAlbum));
    }

    @PutMapping("/{albumId}")
    @Operation(summary = "앨범 썸네일 교체", description = "특정 앨범의 썸네일을 수정")
    public ResponseEntity<ApiResponse<AlbumDTO.Response>> updateAlbumThumbnail(@PathVariable Long albumId,
                                                                               @RequestPart("request") AlbumDTO.UpdateThumbnailRequest request,
                                                                               @RequestPart("file") MultipartFile file) throws IOException {
        // 수정 완
        Album albumById = albumService.getAlbumById(albumId);

        r2StorageService.deleteObjectPair(albumById.getFileName());

        String fileName = r2StorageService.uploadAlbumImage(file);
        request.setOriginalFileName(file.getOriginalFilename());
        request.setFileName(fileName);

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
