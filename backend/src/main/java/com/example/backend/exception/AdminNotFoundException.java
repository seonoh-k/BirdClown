package com.example.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason = "확인할 수 없는 아이디")
public class AdminNotFoundException extends RuntimeException{

    public AdminNotFoundException() {
        super("확인할 수 없는 아이디");
    }

    public AdminNotFoundException(String message) {
        super(message);
    }
}
