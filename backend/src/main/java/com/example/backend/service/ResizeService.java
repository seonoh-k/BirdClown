package com.example.backend.service;


import com.example.backend.config.R2Properties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import net.coobird.thumbnailator.Thumbnails;
import software.amazon.awssdk.services.s3.internal.handlers.ObjectMetadataInterceptor;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ResizeService {

    private final S3Client s3Client;
    private final R2Properties r2Properties;

    /**
     * file 리사이징 후 Byte[] 배열 형태로 반환
     *
     * @param file
     * @return
     * @throws IOException
     */
    public byte[] resizeImage(InputStream inputStream) throws IOException {
        // Thumbnailator를 사용하여 이미지 리사이징
        ByteArrayOutputStream thumbnailOutputStream = new ByteArrayOutputStream();

        Thumbnails.of(inputStream)
                .size(200, 200)
                .toOutputStream(thumbnailOutputStream);


        return thumbnailOutputStream.toByteArray();
    }

    /**
     * file 리사이징 후 Byte[] 배열 형태로 반환
     * 가로 세로 크기를 다르게 하는 경우 사용
     * @param file
     * @return
     * @throws IOException
     */
    public byte[] resizeImage(MultipartFile file,Integer width, Integer height) throws IOException {
        // Thumbnailator를 사용하여 이미지 리사이징
        ByteArrayOutputStream thumbnailOutputStream = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .size(width, height)
                .toOutputStream(thumbnailOutputStream);


        return thumbnailOutputStream.toByteArray();
    }

    /**
     * file 리사이징 후 Byte[] 배열 형태로 반환
     * 가로 세로 크기를 똑같이 하는 경우 사용
     * @param file
     * @param size
     * @return
     * @throws IOException
     */
    public byte[] resizeImage(MultipartFile file,Integer size) throws IOException {
        // Thumbnailator를 사용하여 이미지 리사이징
        ByteArrayOutputStream thumbnailOutputStream = new ByteArrayOutputStream();

        Thumbnails.of(file.getInputStream())
                .size(size, size)
                .toOutputStream(thumbnailOutputStream);


        return thumbnailOutputStream.toByteArray();
    }

}
