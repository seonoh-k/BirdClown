package com.example.backend.service;

import com.example.backend.dto.PhotoDTO;
import com.example.backend.entity.Album;
import com.example.backend.entity.Photo;
import com.example.backend.exception.PhotoNotFoundException;
import com.example.backend.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final AlbumService albumService;
    private final R2StorageService r2StorageService;

    @Transactional
    public PhotoDTO.Response savePhotoMetadata(PhotoDTO.CreateRequest request) {

        Album album = albumService.getAlbumById(request.getAlbumId());
        Photo photo = Photo.builder()
                .album(album)
                .caption(request.getCaption())
                .originalFileName(request.getOriginalFileName())
                .fileName(request.getFileName())
                .fileSize(request.getFileSize())
                .mimeType(request.getMimeType())
                .build();

        Photo savedPhoto = photoRepository.save(photo);

        return PhotoDTO.Response.from(savedPhoto);
    }

    public Page<PhotoDTO.Response> getPhotosByAlbum(Long albumId, Pageable pageable) {

        albumService.getAlbumById(albumId);

        return photoRepository.findByAlbumId(albumId, pageable)
                .map(PhotoDTO.Response::from);
    }
    public Photo getPhotoById(Long photoId) {

        return photoRepository.findById(photoId)
                .orElseThrow(() -> new PhotoNotFoundException("Photo not found with id: " + photoId));
    }

    @Transactional
    public PhotoDTO.Response updatePhotoCaption(Long photoId, PhotoDTO.UpdateCaptionRequest request) {

        Photo photo = getPhotoById(photoId);
        photo.updateCaption(request.getCaption());

        return PhotoDTO.Response.from(photo);
    }
    @Transactional
    public PhotoDTO.Response updatePhoto(Long photoId, PhotoDTO.UpdatePhotoRequest request) {

        Photo photo = getPhotoById(photoId);

        r2StorageService.deleteObjectPair(photo.getFileName());

        photo.updatePhoto(request);

        return PhotoDTO.Response.from(photo);
    }

    @Transactional
    public void deletePhoto(Long photoId) {

        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new PhotoNotFoundException());

        r2StorageService.deleteObjectPair(photo.getFileName());
        photoRepository.delete(photo);

    }
}
