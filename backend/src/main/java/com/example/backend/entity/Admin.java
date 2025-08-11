package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    private Role role;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    // 데이터 삽입이 이루어질때 사전 작업
    @PrePersist
    public void prePersist() {
        this.createAt = LocalDateTime.now();
        this.updateAt = this.createAt;
    }

    // 데이터 수정이 이루어질때 사전 작업
    @PreUpdate
    public void preUpdate() {
        this.updateAt = LocalDateTime.now();
    }

}
