package com.example.backend.dto;

import com.example.backend.entity.Admin;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class AdminDTO {

    @Getter
    public static class LoginRequest {
        @Schema(description = "관리자 아이디", example = "admin123")
        private String username;
        @Schema(description = "관리자 비밀번호", example = "qwer1234")
        private String password;
    }

    @Schema(name = "AdminResponse", description = "Admin 상세 응답 DTO")
    @Getter
    @Builder
    public static class Response {
        @Schema(description = "계정 식별자 ID", example = "1")
        private Long id;
        @Schema(description = "아이디", example = "smdasn231")
        private String username;
        @Schema(description = "계정 생성 시간", example = "1")
        private LocalDateTime createAt;
        @Schema(description = "계정 수정 시간", example = "1")
        private LocalDateTime updateAt;

        public static AdminDTO.Response from(Admin admin) {
            return AdminDTO.Response.builder()
                    .username(admin.getUsername())
                    .createAt(admin.getCreateAt())
                    .updateAt(admin.getUpdateAt())
                    .build();
        }
    }

}
