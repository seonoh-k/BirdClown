package com.example.backend.entity;

import com.example.backend.dto.AlbumDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Builder
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventName;

    private LocalDate eventDate;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String fileName;

    // 경로까지 포함된
    @Column(nullable = false, unique = true)
    private String objectKey;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "album", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos = new ArrayList<>();

    public void updateMetadata(String eventName, LocalDate eventDate) {
        this.eventName = eventName;
        this.eventDate = eventDate;
    }

    public void updateThumbnail(AlbumDTO.UpdateThumbnailRequest request) {
        this.eventName = request.getEventName();
        this.eventDate = request.getEventDate();
        this.objectKey = request.getObjectKey();
        this.originalFileName = request.getOriginalFileName();
        this.fileName = request.getFileName();

    }
}

