package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "아이디, 비밀번호가 일치하지 않습니다.")
public class UsernamePasswordMismatchException extends RuntimeException{
    public UsernamePasswordMismatchException() {
        super("아이디, 비밀번호가 일치하지 않습니다.");
    }

    public UsernamePasswordMismatchException(String message) {
        super(message);
    }
}
