package com.example.backend.util;

import lombok.Getter;

import java.util.Arrays;

/**
 * 인증 및 권한별 허용/차단 URL 상수 정의
 */
@Getter
public class AppURLs {

    /**
     * Security, JwtAuthenticationFilter에서 사용
     */
    public static final String[] PUBLIC_URLS = {
            // TODO: 인증 자체가 필요 없는 url을 정확하게 작성
           "/api/auth/login",
            "/swagger-ui.html",





    };

    /**
     * 정적 리소스(prefix) 화이트리스트 URL
     *
     * Security, JwtAuthenticationFilter에서 사용
     */
    public static final String[] PREFIX_WHITELIST = {
            // TODO: 인증 자체가 필요 없는 url 접두사를 작성
            "/css/**",
            "/js/**",
            "/images/**",
            "/.well-known/**",
            "/swagger-ui/**",
            "/v3/api-docs/**"
    };

    /**
     * Admin 전용 URL 접두사
     */
    public static final String[] ADMIN_URLS_PREFIX = {
            "/api/albums/**",
            "/api/photos/**"
            // 여기에 다른 관리자 전용 URL 접두사 추가
    };



    public static String[] getCombineURL(String[]... arrays) {
        return Arrays.stream(arrays)
                .flatMap(Arrays::stream)
                .toArray(String[]::new);
    }

}

