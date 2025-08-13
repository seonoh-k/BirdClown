package com.example.backend.service;

import com.example.backend.config.R2Properties;
import com.example.backend.entity.Album;
import com.example.backend.entity.Photo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Delete;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageDeleteService {

    static final String THUMBNAILS_PATH = "thumbnails/";
    static final String ORGINAL_FILE_PATH = "photos/";

    private final S3Client s3Client;
    private final R2Properties r2Properties;
    private final AlbumService albumService;
    private final PhotoService photoService;


    /**
     * R2에 있는 사진만 삭제돼서 데이터베이스에서 에러가 발생하면
     * 1. 트랜잭션 롤백
     * 2. 기존에 있던 파일을 되살리는 방법을 찾으려고했는데 일단 시간 오래 걸릴거같아서 두기
     * @param albumId
     */
    @Transactional
    public void deleteAlbum(Long albumId){
        Album albumById = albumService.getAlbumById(albumId);

        String originalKey = ORGINAL_FILE_PATH + albumById.getFileName();
        String thumbnailKey = THUMBNAILS_PATH + albumById.getFileName();

        List<ObjectIdentifier> keysToDelete = new ArrayList<>();

        keysToDelete.add(ObjectIdentifier.builder().key(originalKey).build());
        keysToDelete.add(ObjectIdentifier.builder().key(thumbnailKey).build());

        Delete deletePayload = Delete.builder().objects(keysToDelete).build();

        DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
                .bucket(r2Properties.getBucketName())
                .delete(deletePayload)
                .build();

        s3Client.deleteObjects(deleteRequest);

    }

    @Transactional
    public void deletePhoto(Long photoId){
        Photo photoById = photoService.getPhotoById(photoId);
        String originalKey = ORGINAL_FILE_PATH + photoById.getFileName();
        String thumbnailKey = THUMBNAILS_PATH + photoById.getFileName();

        List<ObjectIdentifier> keysToDelete = new ArrayList<>();

        keysToDelete.add(ObjectIdentifier.builder().key(originalKey).build());

        keysToDelete.add(ObjectIdentifier.builder().key(thumbnailKey).build());

        Delete deletePayload = Delete.builder().objects(keysToDelete).build();

        DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
                .bucket(r2Properties.getBucketName())
                .delete(deletePayload)
                .build();

        s3Client.deleteObjects(deleteRequest);
    }

    @Transactional
    public void updatePhoto(Long photoId){
        Photo photoById = photoService.getPhotoById(photoId);
        String originalKey = ORGINAL_FILE_PATH + photoById.getFileName();
        String thumbnailKey = THUMBNAILS_PATH + photoById.getFileName();

        List<ObjectIdentifier> keysToDelete = new ArrayList<>();

        keysToDelete.add(ObjectIdentifier.builder().key(originalKey).build());

        keysToDelete.add(ObjectIdentifier.builder().key(thumbnailKey).build());

        Delete deletePayload = Delete.builder().objects(keysToDelete).build();

        DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
                .bucket(r2Properties.getBucketName())
                .delete(deletePayload)
                .build();

        s3Client.deleteObjects(deleteRequest);
    }

}
