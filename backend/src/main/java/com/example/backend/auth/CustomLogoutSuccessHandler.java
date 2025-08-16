package com.example.backend.auth;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.util.GlobalStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 로그아웃 성공 메시지를 ApiResponse에 담아 반환
 */
@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);

        ApiResponse<?> apiResponse = ApiResponse.success(GlobalStatus.OK, "로그아웃 되었습니다.");

        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));

    }
}
