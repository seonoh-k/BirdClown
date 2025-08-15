package com.example.backend.config;

import com.example.backend.auth.CustomLogoutSuccessHandler;
import com.example.backend.auth.LoginFailureHandler;
import com.example.backend.auth.LoginSuccessHandler;
import com.example.backend.auth.UserCustomDetailsService;
import com.example.backend.util.AppURLs;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserCustomDetailsService userCustomDetailsService;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailureHandler loginFailureHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(auth -> auth
//
//                        .requestMatchers(AppURLs.getCombineURL(AppURLs.PUBLIC_URLS,AppURLs.PREFIX_WHITELIST)).permitAll()
//
//                        .requestMatchers(HttpMethod.POST, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.PUT, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.PATCH, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.DELETE, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
//
//                        .anyRequest().permitAll()
//                )
//                .formLogin(form -> form
//                        .loginProcessingUrl("/api/auth/login")
//                        .usernameParameter("username")
//                        .passwordParameter("password")
//                        .successHandler(loginSuccessHandler)
//                        .failureHandler(loginFailureHandler)
//                        .permitAll()
//                )
//                .logout(logout -> logout
//                        .logoutUrl("/api/auth/logout")
//                        .logoutSuccessHandler(customLogoutSuccessHandler)
//                        .deleteCookies("JSESSIONID")
//                )
//                .csrf(AbstractHttpConfigurer::disable);
//
//
//        return http.build();
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer(){
//        return web -> web.ignoring()
//                .requestMatchers(PathRequest
//                        .toStaticResources()
//                        .atCommonLocations()
//                ).requestMatchers(AppURLs.PREFIX_WHITELIST)
//                .requestMatchers("/assets/**");
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 비활성화
        .authorizeHttpRequests(auth -> auth
                        .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                        .requestMatchers("/assets/**").permitAll()
                        .requestMatchers(AppURLs.PREFIX_WHITELIST).permitAll()
                        .requestMatchers(AppURLs.PUBLIC_URLS).permitAll()
                        .requestMatchers("/", "/index.html").permitAll() // 루트 경로 추가

                        .requestMatchers(HttpMethod.POST, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, AppURLs.ADMIN_URLS_PREFIX).hasRole("ADMIN")
                        .anyRequest().authenticated()
        )
            .formLogin(form -> form
                            .loginProcessingUrl("/api/auth/login")
                            .usernameParameter("username")
                            .passwordParameter("password")
                            .successHandler(loginSuccessHandler)
                            .failureHandler(loginFailureHandler)
                            .permitAll() // 로그인 페이지 자체는 모두 접근 가능해야 함
            )
            .logout(logout -> logout
                            .logoutUrl("/api/auth/logout")
                            .logoutSuccessHandler(customLogoutSuccessHandler)
                            .deleteCookies("JSESSIONID")
            );
//            .csrf(csrf -> csrf.disable())
//            .authorizeHttpRequests(auth -> auth
//                    .requestMatchers("/assets/**", "/", "/index.html", "/favicon.ico", "/manifest.json")
//                    .permitAll()
//                    .anyRequest().authenticated()
//            )
//            .formLogin(Customizer.withDefaults());
    return http.build();
    }

}
