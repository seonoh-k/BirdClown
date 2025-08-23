package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@NoArgsConstructor
public class PresignedUrlDTO {

    @Getter
    public static class Request {

        @Schema(description = "원본 파일 이름", example = "원본파일이다.jpg")
        private String originalFileName;
        @Schema(description = "스토리지에 저장된 파일 이름(UUID가 처리되어있음)", example = "9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg")
        private String filename;
        @Schema(description = "스토리지에 저장된 경로가 포함 (UUID가 처리되어있음)", example = "9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg")
        private String objectKey;
        @Schema(description = "업로드할 파일의 MIME 타입", required = true, example = "image/jpeg")
        private String contentType;
        @Schema(description = "업로드할 파일의 크기 (bytes)", required = true, example = "102400")
        private Long contentLength;
    }
    @Getter @Setter
    public static class GetRequest {

        @Schema(description = "원본 파일 이름", example = "원본파일이다.jpg")
        private String originalFileName;
        @Schema(description = "스토리지에 저장된 파일 이름(UUID가 처리되어있음)", example = "9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg")
        private String filename;
        @Schema(description = "스토리지에 저장된 경로가 포함 (UUID가 처리되어있음)", example = "9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg")
        private String objectKey;
        @Schema(description = "업로드할 파일의 MIME 타입", required = true, example = "image/jpeg")
        private String contentType;
        @Schema(description = "업로드할 파일의 크기 (bytes)", required = true, example = "102400")
        private Long contentLength;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        @Schema(description = "생성된 Presigned URL", example = " https://bird-clown.91a6bfab5004efd9395e8151d45fffc9.r2.cloudflarestorage.com/thumbnails/9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250811T022629Z&X-Amz-SignedHeaders=content-length%3Bcontent-type%3Bhost&X-Amz-Credential=eef3870835300b935ce6cd1825d8eead%2F20250811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Expires=300&X-Amz-Signature=11319e752157d43ffa450421255b6eaeb440ba19044862cfb50ec3c58272c15c ")
        private String presignedUrl;
        @Schema(description = "UUID", example = "9f2b432b-f91a-4a32-8e19-9d7100578a3d.jpg ")
        private String fileName;
        @Schema(description = "파일 원본의 이름", example = "aaa.jpg")
        private String originalFileName;

        public Response(String url){
            this.presignedUrl = url;
        }
    }

}
