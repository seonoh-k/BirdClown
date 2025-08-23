package com.example.backend.controller;

import com.example.backend.dto.PresignedUrlDTO;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.service.R2StorageService;
import com.example.backend.util.GlobalStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/r2")
@RequiredArgsConstructor
@Tag(name = "R2 API", description = "R2 Presigned URL 발급 및  API")
@Log4j2
public class R2ApiController {

    private final R2StorageService r2StorageService;

    @PutMapping("/presigned-url")
    @Operation(summary = "사진 업로드를 위한 Presigned URL 생성", description = "파일 정보를 받아 R2에 직접 업로드할 수 있는 유효시간 5분의 Presigned URL을 생성하여 반환합니다.")
    public ResponseEntity<ApiResponse<PresignedUrlDTO.Response>> getPresignedUrlForUpload(@RequestBody PresignedUrlDTO.Request request) {

        String originalFileName= request.getOriginalFileName();
        String objectKey = r2StorageService.generatePhotoObjectKey(request.getOriginalFileName());
        String url = r2StorageService.generatePresignedUrl(
                objectKey,
                request.getContentType(),
                request.getContentLength()
        );

        String fileName = r2StorageService.extractFilename(objectKey);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GlobalStatus.OK, "Presigned URL이 성공적으로 생성되었습니다.", new PresignedUrlDTO.Response(url, fileName, originalFileName)));
    }

    @GetMapping("/presigned-url")
    @Operation(summary = "사진 조회를 위한 Presigned URL 생성", description = "objectKey를 받아서 조회가 가능한 유효시간 5분의 Presigned URL을 생성하여 반환합니다.")
    public ResponseEntity<ApiResponse<PresignedUrlDTO.Response>> getPresignedUrlForGet(@ModelAttribute PresignedUrlDTO.GetRequest request) {

        String url = r2StorageService.generatePresignedUrl(request.getObjectKey());

        return ResponseEntity.status(HttpStatus.OK)
                .header("Presigned-Url", url)
                .body(ApiResponse.success(GlobalStatus.OK, "Presigned URL이 성공적으로 생성되었습니다."));
    }

}
