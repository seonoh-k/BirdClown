package com.example.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "cloudflare.r2")
@Getter
@Setter
public class R2Properties {

    private String accessKeyId;
    private String secretAccessKey;
    private String accountId;
    private String bucketName;
}
