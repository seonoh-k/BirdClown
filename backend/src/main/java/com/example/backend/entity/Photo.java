package com.example.backend.entity;

import com.example.backend.dto.PhotoDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Builder
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String caption;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false, unique = true)
    private String objectKey;

    private Long fileSize;

    private String mimeType;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id", nullable = false)
    private Album album;

    public void updateCaption(String caption) {
        this.caption = caption;
    }

    public void updatePhoto(PhotoDTO.UpdatePhotoRequest request) {
        this.caption = request.getCaption();
        this.objectKey = request.getObjectKey();
        this.originalFileName = request.getOriginalFileName();
        this.fileName = request.getFileName();
    }

}