package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "찾을 수 없는 앨범")
public class AlbumNotFoundException extends RuntimeException {

    public AlbumNotFoundException() {
        super("찾을 수 없는 앨범");
    }
    public AlbumNotFoundException(String message) {
        super(message);
    }


}
