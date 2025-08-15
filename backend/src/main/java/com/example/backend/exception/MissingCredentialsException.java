package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "아이디와 비밀번호는 필수 입력 값입니다.")
public class MissingCredentialsException extends RuntimeException{
    public MissingCredentialsException() {
        super("아이디와 비밀번호는 필수 입력 값입니다.");
    }

    public MissingCredentialsException(String message) {
        super(message);
    }
}
