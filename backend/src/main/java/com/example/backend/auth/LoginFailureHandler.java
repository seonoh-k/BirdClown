package com.example.backend.auth;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.util.GlobalStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 로그인 실패 메시지를 ApiResponse에 담아 반환
 */
@Component
public class LoginFailureHandler implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);


        ApiResponse<?> apiResponse = ApiResponse.error(GlobalStatus.ADMIN_LOGIN_FAIL);

        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));

    }
}
