package com.example.backend.service;

import com.example.backend.dto.AlbumDTO;
import com.example.backend.entity.Album;
import com.example.backend.entity.Photo;
import com.example.backend.exception.AlbumNotFoundException;
import com.example.backend.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final R2StorageService r2StorageService;

    @Transactional
    public AlbumDTO.Response createAlbum(AlbumDTO.CreateRequest request) {

        Album album = Album.builder()
                .eventName(request.getEventName())
                .eventDate(request.getEventDate())
                .fileName(request.getFileName())
                .originalFileName(request.getOriginalFileName())
                .build();

        Album savedAlbum = albumRepository.save(album);

        return AlbumDTO.Response.from(savedAlbum);
    }
    @Transactional
    public AlbumDTO.Response createAlbum(AlbumDTO.UploadRequest request, MultipartFile file, String fileName) {

        Album album = Album.builder()
                .eventName(request.getEventName())
                .eventDate(request.getEventDate())
                .fileName(fileName)
                .originalFileName(file.getOriginalFilename())
                .build();

        Album savedAlbum = albumRepository.save(album);

        return AlbumDTO.Response.from(savedAlbum);
    }

    public Page<AlbumDTO.Response> getAllAlbums(Pageable pageable) {

        return albumRepository.findAllByOrderByEventDateDesc(pageable)
                .map(AlbumDTO.Response::from);
    }

    public Album getAlbumById(Long albumId) {

        return albumRepository.findById(albumId)
                .orElseThrow(() -> new AlbumNotFoundException("Album not found with id: " + albumId));
    }

    @Transactional
    public AlbumDTO.Response updateAlbum(Long albumId, AlbumDTO.UpdateMetadataRequest request) {

        Album album = getAlbumById(albumId);
        album.updateMetadata(request.getEventName(), request.getEventDate());

        return AlbumDTO.Response.from(album);
    }

    @Transactional
    public AlbumDTO.Response updateThumbnail(Long albumId, AlbumDTO.UpdateThumbnailRequest request) {

        Album album = getAlbumById(albumId);
        album.updateThumbnail(request);

        return AlbumDTO.Response.from(album);
    }

    @Transactional
    public void deleteAlbum(Long albumId) {

        Album album = getAlbumById(albumId);

        for (Photo photo : album.getPhotos()) {
            r2StorageService.deleteObjectPair(photo.getFileName());
        }

        r2StorageService.deleteObjectPair(album.getFileName());

        albumRepository.delete(album);

    }
}
