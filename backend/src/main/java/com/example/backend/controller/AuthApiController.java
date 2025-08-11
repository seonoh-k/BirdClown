package com.example.backend.controller;

import com.example.backend.dto.AuthDTO;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.util.GlobalStatus;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor // RequiredArgsConstructor 추가
public class AuthApiController {

    // private final AuthService authService; // AuthService가 있다면 주입

//    @PostMapping("/login")
//    @Operation(summary = "로그인", description = "관리자 로그인을 요청합니다.")
//    public ResponseEntity<ApiResponse<AuthDTO.LoginResponse>> login(@RequestBody AuthDTO.LoginRequest loginRequest){
        // 실제 로그인 로직은 AuthService에서 처리하고, 결과를 ApiResponse에 담아 반환합니다.
        // 예시:
        // AuthDTO.LoginResponse loginResponse = authService.login(loginRequest);
        // return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(GlobalStatus.ADMIN_LOGIN_SUCCESS, "로그인 성공", loginResponse));

        // 현재는 주석 해제 및 ApiResponse 형식만 맞춥니다.
        // return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(GlobalStatus.ADMIN_LOGIN_SUCCESS, "로그인 성공", null));
    // }

}
