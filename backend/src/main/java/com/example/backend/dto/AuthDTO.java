package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.LocalDate;

public class AuthDTO {

    @Getter
    public static class LoginRequest {
        @Schema(description = "관리자 아이디", example = "admin123")
        private String username;
        @Schema(description = "관리자 비밀번호", example = "qwer1234")
        private String password;
    }

}
