package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * JPA 관련 설정
 * JPA Java Persistance API의 Authditing 기능을 활성화 하는 스위치 역할<br/><br/>
 *
 * Album이나 Photo 데이터가 데이터베이스에 처음 저장될 때,<br/>
 * createdAt (생성일시) 필드에 현재 시간을 자동으로 기록하고 싶어서 설정
 * <br/><br/>
 * Album.java와 Photo.java 파일의 createdAt 필드 위에 @CreatedDate 라는 어노테이션을 붙였습니다. <br/>
 * 이는 "이 필드는 생성일시를 기록하는 필드입니다"라고 JPA에게 알려주는 것<br/>
 *
 * 하지만 @CreatedDate 어노테이션만 붙여서는 기능이 동작하지 않는데,<br/>
 * Spring Boot 애플리케이션 전체에
 * "지금부터 nAuditing 기능을 사용 시작하겠습니다!" 라고 알려주는 신호가 필요
 * 그 역할을 하는 것이 바로 @EnableJpaAuditing 어노테이션
 *
 */
@Configuration
@EnableJpaAuditing // Jpa 관련 설정
public class JpaAuditingConfig {
}
