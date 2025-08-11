package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PresignedUrlDTO {

    @Getter
    public static class Request {

        @Schema(description = "UUID 처리된 파일 명", example = "53362a62-913c-49b0-a0a1-6d518cce88df.jpg")
        private String originalFileName;
        @Schema(description = "업로드할 파일의 MIME 타입", required = true, example = "image/jpeg")
        private String contentType;
        @Schema(description = "업로드할 파일의 크기 (bytes)", required = true, example = "102400")
        private Long contentLength;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        @Schema(description = "생성된 Presigned URL", example = " https://bird-clown.91a6bfab5004efd9395e8151d45fffc9.r2.cloudflarestorage.com/thumbnails/9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250811T022629Z&X-Amz-SignedHeaders=content-length%3Bcontent-type%3Bhost&X-Amz-Credential=eef3870835300b935ce6cd1825d8eead%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Expires=300&X-Amz-Signature=11319e752157d43ffa450421255b6eaeb440ba19044862cfb50ec3c58272c15c ")
        private String presignedUrl;
        @Schema(description = "UUID와 경로를 포함한 데이터베이스와 R2에 저장되는 파일 이름", example = "path/9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg")
        private String objectKey;
        @Schema(description = "UUID", example = "9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg ")
        private String fileName;
        @Schema(description = "파일 원본의 이름", example = "aaa.jpg")
        private String originalFileName;

    }

}
