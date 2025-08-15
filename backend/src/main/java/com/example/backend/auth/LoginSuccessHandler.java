package com.example.backend.auth;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.util.GlobalStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 로그인 성공 메세지를 ApiResponse에 담아 반환
 */
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);

        UserCustomDetails userDetails = (UserCustomDetails) authentication.getPrincipal();
        ApiResponse<?> apiResponse = ApiResponse.success(GlobalStatus.ADMIN_LOGIN_SUCCESS, userDetails);

        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));

    }
}
