package com.example.backend.service;

import com.example.backend.config.R2Properties;
import com.example.backend.exception.MissingPathSeparatorException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class R2StorageService {

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private final R2Properties r2Properties;

    public String generatePresignedUrl(String objectKey, String contentType, Long contentLength) {

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(r2Properties.getBucketName())
                .key(objectKey)
                .contentType(contentType)
                .contentLength(contentLength)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(5))
                .putObjectRequest(objectRequest)
                .build();

        return s3Presigner.presignPutObject(presignRequest).url().toString();
    }


    public void deleteObject(String objectKey) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(r2Properties.getBucketName())
                .key(objectKey)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
    }

    /**
     * extention만 추출 파일 이름 -> UUID로 치환
     * @param fileName
     * @return
     */
    public String generatePhotoObjectKey(String fileName){
        String extension = getFileExtension(fileName);
        return "photos/" + UUID.randomUUID().toString() + "." + extension;
    }

    /**
     * extention만 추출 파일 이름 -> UUID로 치환
     * @param fileName
     * @return
     */
    public String generateThumbnailObjectKey(String fileName){
        String extension = getFileExtension(fileName);
        return "thumbnails/" + UUID.randomUUID().toString() + "." + extension;
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } catch (Exception e) {
            // 확장자가 없는 경우 기본값으로 jpg를 사용하거나 예외 처리
            return "jpg";
        }
    }

    /**
     *
     * @param objectKey thumbnails/2cacdac9-3e39-4186-adfe-177efb68f58d.jpg
     * @return 2cacdac9-3e39-4186-adfe-177efb68f58d.jpg
     */
    public String extractFilename(String objectKey){

        if (objectKey.isEmpty() || objectKey == null){
            throw new NullPointerException();
        }

        if (!objectKey.contains("/")){
            throw new MissingPathSeparatorException();
        }

        return objectKey.substring(objectKey.indexOf("/") + 1);
    }

}
