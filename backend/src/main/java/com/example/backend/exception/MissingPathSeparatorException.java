package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "파일 경로에 '/' 구분자가 없습니다")
public class MissingPathSeparatorException extends RuntimeException{
    public MissingPathSeparatorException() {
        super("파일 경로에 '/' 구분자가 없습니다");
    }

    public MissingPathSeparatorException(String message) {
        super(message);
    }
}
