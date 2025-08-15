package com.example.backend.controller;

import com.example.backend.dto.AdminDTO;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.service.AuthService;
import com.example.backend.util.GlobalStatus;
import com.example.backend.util.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthApiController {

    private final AuthService authService;

//    @GetMapping("/login")
//    public ResponseEntity<ApiResponse<AdminDTO.Response>> login(@RequestBody AdminDTO.LoginRequest request){
//        StatusCode login = authService.login(request);
//
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(ApiResponse.success(GlobalStatus.ADMIN_LOGIN_SUCCESS));
//    }
}
