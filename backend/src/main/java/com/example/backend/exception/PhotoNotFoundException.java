package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "찾을 수 없는 사진")
public class PhotoNotFoundException extends RuntimeException {
    public PhotoNotFoundException() {
        super("찾을 수 없는 사진");
    }
    public PhotoNotFoundException(String message) {
        super(message);
    }
}
