package com.example.backend.dto;

import com.example.backend.entity.Album;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AlbumDTO {

    @Getter
    public static class CreateRequest {
        @Schema(description = "이벤트/행사명", example = "2024 여름 워크샵")
        private String eventName;
        @Schema(description = "이벤트 날짜", example = "2024-07-26")
        private LocalDate eventDate;
        @Schema(description = "썸네일 원본 파일명", example = "thumbnail.jpg")
        private String originalFileName;
        @Schema(description = "UUID 처리된 파일 명", example = "53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String fileName;
        @Schema(description = "썸네일 R2 Object Key", example = "thumbnails/53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String objectKey;
    }

    @Getter
    public static class UpdateMetadataRequest {
        @Schema(description = "이벤트/행사명", example = "2024 가을 체육대회")
        private String eventName;
        @Schema(description = "이벤트 날짜", example = "2024-10-15")
        private LocalDate eventDate;
    }

    @Getter
    public static class UpdateThumbnailRequest {
        @Schema(description = "이벤트/행사명", example = "2024 가을 체육대회")
        private String eventName;
        @Schema(description = "이벤트 날짜", example = "2024-10-15")
        private LocalDate eventDate;
        @Schema(description = "새 썸네일 원본 파일명", example = "new_thumbnail.jpg")
        private String originalFileName;
        @Schema(description = "새 썸네일의 UUID 처리된 파일 명", example = "new-uuid.jpg")
        private String fileName;
        @Schema(description = "새 썸네일의 R2 Object Key", example = "thumbnails/new-uuid.jpg")
        private String objectKey;
    }

    @Getter
    @Builder
    public static class Response {
        @Schema(description = "이벤트/행사명", example = "2024 여름 워크샵")
        private String eventName;
        @Schema(description = "이벤트 날짜", example = "2024-07-26")
        private LocalDate eventDate;
        @Schema(description = "썸네일 원본 파일명", example = "thumbnail.jpg")
        private String originalFileName;
        @Schema(description = "UUID 처리된 파일 명", example = "53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String fileName;
        @Schema(description = "썸네일 R2 Object Key", example = "thumbnails/53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String objectKey;
        @Schema(description = "생성 일시", example = "2025-08-08")
        private LocalDateTime createdAt;

        public static Response from(Album album) {
            return Response.builder()
                    .eventName(album.getEventName())
                    .eventDate(album.getEventDate())
                    .fileName(album.getFileName())
                    .originalFileName(album.getOriginalFileName())
                    .objectKey(album.getObjectKey())
                    .createdAt(album.getCreatedAt())
                    .build();
        }

    }
}
