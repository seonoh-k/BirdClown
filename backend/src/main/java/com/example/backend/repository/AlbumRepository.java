package com.example.backend.repository;

import com.example.backend.entity.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    Page<Album> findAllByOrderByEventDateDesc(Pageable pageable);
}
