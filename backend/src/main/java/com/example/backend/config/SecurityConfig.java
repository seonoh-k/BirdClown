package com.example.backend.config;

import com.example.backend.auth.UserCustomDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserCustomDetailsService userCustomDetailsService;
    private final DataSource dataSource; // application.yml에 설정된 DB 정보로 자동 주입됩니다.

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        // API 문서, H2 콘솔 등 개발 편의를 위한 경로는 모두 허용
                        // 회원가입, 로그인 API는 허용
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/api-docs", // application.yml에 설정된 API docs 경로
                                "/api-docs/**", // 하위 경로 포함
                                "/v3/api-docs", // springdoc의 기본 API docs 경로
                                "/v3/api-docs/**", // springdoc의 기본 API docs 하위 경로
                                "/h2-console/**"
                        ).permitAll()

                        // 그 외 모든 API 요청은 인증된 사용자만 접근 가능
                        .anyRequest().permitAll()
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/api/auth/login") // 로그인 처리 URL
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .defaultSuccessUrl("/", true)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .logoutSuccessUrl("/")
                        .deleteCookies("JSESSIONID")
                )
                .csrf(csrf -> csrf.disable()); // CSRF 보호 비활성화 (API 서버에서는 보통 비활성화)


        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return web -> web.ignoring()
                .requestMatchers(PathRequest
                        .toStaticResources()
                        .atCommonLocations()
                ).requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/h2-console/**");
    }


}
