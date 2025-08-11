package com.example.backend.util;

/**
 * 해당 인터페이스는 Enum만 구현해서 사용하세요.
 *
 * @param <U>
 */
public interface StatusCode<U> {
    Integer getCode();
    String getMessage();


    default String Name() {
        return ((Enum<?>)this).name();
    }
    default U getData(U data){
        return data;
    }
}
