package com.example.backend.dto;

import com.example.backend.entity.Photo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class PhotoDTO {

    @Schema(name = "CreateRequest", description = "사진 생성 요청 DTO")
    @Getter
    public static class CreateRequest {
        @Schema(description = "사진을 추가할 앨범 ID", required = true, example = "1")
        private Long albumId;
        @Schema(description = "사진 캡션", example = "거울 축제에서의 현장")
        private String caption;
        @Schema(description = "썸네일 원본 파일명", example = "thumbnail.jpg")
        private String originalFileName;
        @Schema(description = "UUID 처리된 파일 명", example = "53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String fileName;
        @Schema(description = "썸네일 R2 Object Key", example = "photos/53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String objectKey;
        @Schema(description = "파일 크기 (bytes)", required = true, example = "2048576")
        private Long fileSize;
        @Schema(description = "파일 MIME 타입", required = true, example = "image/jpeg")
        private String mimeType;
    }

    @Schema(name = "UpdateCaptionRequest", description = "사진 caption 정보 수정 요청 DTO")
    @Getter
    public static class UpdateCaptionRequest {
        @Schema(description = "새로운 사진 캡션", example = "팀 빌딩 활동")
        private String caption;
    }

    @Schema(name = "UpdatePhotoRequest", description = "사진 수정 요청 DTO")
    @Getter
    public static class UpdatePhotoRequest {
        @Schema(description = "새로운 사진 캡션", example = "팀 빌딩 활동")
        private String caption;
        @Schema(description = "새 사진 원본 파일명", example = "new_photo.jpg")
        private String originalFileName;
        @Schema(description = "새 사진의 UUID 처리된 파일 명", example = "new-uuid.jpg")
        private String fileName;
        @Schema(description = "새 사진의 R2 Object Key", example = "photos/new-uuid.jpg")
        private String objectKey;
    }

    @Schema(name = "PhotoResponse", description = "사진 상세 응답 DTO")
    @Getter
    @Builder
    public static class Response {
        @Schema(description = "사진 ID", example = "101")
        private Long id;
        @Schema(description = "사진 캡션", example = "팀 빌딩 활동")
        private String caption;
        @Schema(description = "썸네일 원본 파일명", example = "thumbnail.jpg")
        private String originalFileName;
        @Schema(description = "UUID 처리된 파일 명", example = "53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String fileName;
        @Schema(description = "썸네일 R2 Object Key", example = "thumbnails/53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String objectKey;
        @Schema(description = "생성 일시")
        private LocalDateTime createdAt;
        @Schema(description = "파일 MIME 타입", required = true, example = "image/jpeg")
        private String mimeType;

        public static Response from(Photo photo) {
            return Response.builder()
                    .id(photo.getId())
                    .caption(photo.getCaption())
                    .originalFileName(photo.getOriginalFileName())
                    .fileName(photo.getFileName())
                    .objectKey(photo.getObjectKey())
                    .createdAt(photo.getCreatedAt())
                    .mimeType(photo.getMimeType())
                    .build();
        }
    }
}
