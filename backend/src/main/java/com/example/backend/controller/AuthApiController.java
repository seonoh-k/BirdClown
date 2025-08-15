package com.example.backend.controller;

import com.example.backend.auth.UserCustomDetails;
import com.example.backend.dto.AdminDTO;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.service.AuthService;
import com.example.backend.util.GlobalStatus;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthApiController {

    private final AuthService authService;
    @GetMapping("/me")
    @Operation(summary = "현재 로그인된 사용자 정보 조회", description = "현재 세션을 기준으로 로그인된 사용자의 정보를 반환합니다.")
    public ResponseEntity<ApiResponse<?>> getCurrentUser(@AuthenticationPrincipal UserCustomDetails userDetails) {
        if (userDetails != null) {

            AdminDTO.Response response = AdminDTO.Response.builder()
                    .username(userDetails.getUsername())
                    .role(userDetails.getAuthorities().toString())
                    .build();


            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(GlobalStatus.OK, "인증된 사용자 정보를 반환합니다.", response));
        } else {

            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(GlobalStatus.AUTHENTICATION_FAIL, "인증되지 않은 사용자입니다."));
        }
    }

//    @PostMapping("/join")
//    public void join(@RequestParam("username") String username, @RequestParam("password") String password ) {
//        authService.join(username, password);
//    }

    // TODO: 회원가입(register) 등등등등등등등등등
}
