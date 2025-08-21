package com.example.backend.controller;

import com.example.backend.dto.PhotoDTO;
import com.example.backend.dto.PresignedUrlDTO;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.Photo;
import com.example.backend.service.PhotoService;
import com.example.backend.service.R2StorageService;
import com.example.backend.util.GlobalStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/photos")
@RequiredArgsConstructor
@Tag(name = "Photo API", description = "사진 업로드, 정보 저장, 삭제 API")
@Log4j2
public class PhotoApiController {

    private final PhotoService photoService;
    private final R2StorageService r2StorageService;



    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<GlobalStatus>> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("파일 이름: " + file.getOriginalFilename());
        log.info("파일 크기: " + file.getSize());
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.success(GlobalStatus.NO_CONTENT));
    }

    @PostMapping
    @Operation(summary = "사진 저장 업로드", description = "파일 업로드를 완료한 후, 해당 파일의 메타데이터를 DB에 저장합니다.")
    public ResponseEntity<ApiResponse<PhotoDTO.Response>> savePhotoMetadata(@RequestPart("file") MultipartFile file,
                                                                            @RequestPart("request") PhotoDTO.CreateRequest request)  throws IOException {

        String fileName = r2StorageService.uploadPhotoImage(file);
        request.setOriginalFileName(file.getOriginalFilename());
        request.setFileName(fileName);

        PhotoDTO.Response response = photoService.savePhotoMetadata(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(GlobalStatus.CREATED, "사진 메타데이터가 성공적으로 저장되었습니다.", response));
    }

    @PatchMapping("/{photoId}")
    @Operation(summary = "사진 캡션 수정", description = "특정 사진의 캡션을 수정합니다.")
    public ResponseEntity<ApiResponse<PhotoDTO.Response>> updatePhotoCaption(@PathVariable Long photoId,
                                                                             @RequestBody PhotoDTO.UpdateCaptionRequest request) {

        PhotoDTO.Response updatedPhoto = photoService.updatePhotoCaption(photoId, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "사진 캡션이 성공적으로 수정되었습니다.", updatedPhoto));
    }

    @PutMapping("/{photoId}")
    @Operation(summary = "사진 파일 교체", description = "특정 사진의 파일을 새로운 파일로 교체합니다.")
    public ResponseEntity<ApiResponse<PhotoDTO.Response>> updatePhotoFile(@PathVariable Long photoId,
                                                                          @RequestPart("file") MultipartFile file,
                                                                          @RequestPart("request") PhotoDTO.UpdatePhotoRequest request)  throws IOException {
        // 삭제
        Photo photoById = photoService.getPhotoById(photoId);

        String fileName = r2StorageService.uploadAlbumImage(file);

        request.setFileName(fileName);
        request.setOriginalFileName(file.getOriginalFilename());

        PhotoDTO.Response updatedPhoto = photoService.updatePhoto(photoId, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "사진 파일이 성공적으로 교체되었습니다.", updatedPhoto));
    }

    @DeleteMapping("/{photoId}")
    @Operation(summary = "사진 삭제", description = "특정 사진을 R2와 DB에서 삭제합니다.")
    public ResponseEntity<ApiResponse<Void>> deletePhoto(@PathVariable Long photoId) {

        photoService.deletePhoto(photoId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(ApiResponse.success(GlobalStatus.NO_CONTENT, "사진이 성공적으로 삭제되었습니다."));
    }
}
