package com.example.backend.service;

import com.example.backend.config.R2Properties;
import com.example.backend.dto.AlbumDTO;
import com.example.backend.entity.Photo;
import com.example.backend.exception.MissingPathSeparatorException;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.io.*;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class R2StorageService {
    static final String THUMBNAILS_PATH = "thumbnails/";
    static final String ORGINAL_FILE_PATH = "photos/";

    private final S3Client s3Client;
    private final S3Presigner s3Presigner;
    private final R2Properties r2Properties;
    private final ResizeService resizeService;

    /**
     * upload를 위한 presignedUrl 발급
     *
     * @param objectKey
     * @param contentType
     * @param contentLength
     * @return
     */
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

    /**
     * 조회를 위한 presignedUrl 발급
     *
     * @param objectKey 경로까지 붙은 파일명
     * @return
     */
    public String generatePresignedUrl(String objectKey) {

        GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(r2Properties.getBucketName())
                .key(objectKey)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(5))
                .getObjectRequest(objectRequest)
                .build();

        return s3Presigner.presignGetObject(presignRequest).url().toString();
    }


    public void deleteObject(String objectKey) {

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(r2Properties.getBucketName())
                .key(objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    public void deleteObjectPair(String filename) {


        String originalKey = ORGINAL_FILE_PATH + filename;
        String thumbnailKey = THUMBNAILS_PATH + filename;

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



    /**
     * extention만 추출 파일 이름 -> UUID로 치환
     *
     * @param fileName
     * @return @return "원본 파일 경로인 <strong> photos/ + UUID + 확장자 </strong> 형태로 파일이름 반환"
     */
    public String generatePhotoObjectKey(String fileName){

        String extension = getFileExtension(fileName);

        return ORGINAL_FILE_PATH + UUID.randomUUID().toString() + "." + extension;
    }

    /**
     *
     * @param file
     * @return @return "원본 파일 경로인 <strong> photos/ + UUID + 확장자 </strong> 형태로 파일이름 반환"
     */
    public String generatePhotoObjectKey(MultipartFile file){

        String extension = getFileExtension(file.getOriginalFilename());

        return ORGINAL_FILE_PATH + UUID.randomUUID().toString() + "." + extension;
    }

    /**
     * 파일 이름 -> UUID로 치환
     *
     * @param String
     * @return "썸네일 경로인 <strong>thumbnails/ + UUID + 확장자 </strong> 형태로 파일이름 반환"
     */
    public String generateThumbnailObjectKey(String fileName){

        String extension = getFileExtension(fileName);

        return THUMBNAILS_PATH + UUID.randomUUID().toString() + "." + extension;
    }

    /**
     * 파일 이름 -> UUID로 치환
     *
     * @param file
     * @return "썸네일 경로인 <strong>thumbnails/ + UUID + 확장자 </strong> 형태로 파일이름 반환"
     */
    public String generateThumbnailObjectKey(MultipartFile file){

        String extension = getFileExtension(file.getOriginalFilename());

        return THUMBNAILS_PATH + UUID.randomUUID().toString() + "." + extension;
    }

    /**
     *
     * @param fileName
     * @return UUID와 확장자로 파일이름 반환
     */
    public String generateObjectKey(String fileName){

        String extension = getFileExtension(fileName);

        return UUID.randomUUID().toString() + "." + extension;
    }

    /**
     *
     * @param file
     * @return UUID와 확장자로 파일이름 반환
     */
    public String generateObjectKey(MultipartFile file){

        String extension = getFileExtension(file.getOriginalFilename());

        return UUID.randomUUID().toString() + "." + extension;
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
     * "photos/" , "thumbnails/" 경로를 제외한 파일 이름만 추출해서 반환
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

    public String uploadAlbumImage(MultipartFile file) throws IOException {
        // 원본 파일 업로드
        String fileName = this.generateObjectKey(file);
        String originalKey = ORGINAL_FILE_PATH + fileName;
        String thumbnailKey = THUMBNAILS_PATH + fileName;

        uploadToS3(file.getInputStream(), file.getSize(), originalKey, file.getContentType());

        // Resizing
        byte[] resizedImage = resizeService.resizeImage(file.getInputStream());

        // 리사이징된 이미지 업로드
        uploadToS3(new ByteArrayInputStream(resizedImage), resizedImage.length, thumbnailKey, file.getContentType());

        return fileName;
    }

    public String uploadPhotoImage(MultipartFile file) throws IOException {
        // 원본 파일 업로드
        String fileName = this.generateObjectKey(file);
        String originalKey = ORGINAL_FILE_PATH + fileName;
        String thumbnailKey = THUMBNAILS_PATH + fileName;

        uploadToS3(file.getInputStream(), file.getSize(), originalKey, file.getContentType());

        // Resizing
        byte[] resizedImage = resizeService.resizeImage(file.getInputStream());

        // 리사이징된 이미지 업로드
        uploadToS3(new ByteArrayInputStream(resizedImage), resizedImage.length, thumbnailKey, file.getContentType());

        return fileName;
    }

    private void uploadToS3(InputStream inputStream, long contentLength, String objectKey, String contentType) {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(r2Properties.getBucketName())
                .key(objectKey)
                .contentType(contentType) // Content-Type 설정
                .build();
        s3Client.putObject(request, RequestBody.fromInputStream(inputStream, contentLength));
    }

}
