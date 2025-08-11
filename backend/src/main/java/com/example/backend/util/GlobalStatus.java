package com.example.backend.util;

public enum GlobalStatus implements StatusCode{

    // ✅ 성공 상태 코드
    OK(200, "요청이 정상적으로 처리되었습니다"),
    CREATED(201, "요청이 성공적으로 처리되어 리소스가 생성되었습니다"),
    ACCEPTED(202, "요청이 접수되었으며 비동기적으로 처리됩니다"),
    NO_CONTENT(204, "요청이 성공했으나 반환할 데이터가 없습니다"),
    SUCCESS_WITH_DATA(200, "데이터를 정상적으로 반환하였습니다"),
    ADMIN_NOT_FOUND(404, "확인할 수 없는 아이디"),
    PHOTO_NOT_FOUND(404, "확인할 수 없는 사진"),
    ALBUM_NOT_FOUND(404, "확인할 수 없는 앨범"),
    ADMIN_LOGIN_SUCCESS(200,"관리자 로그인 성공"),
    ADMIN_LOGIN_FAIL(401,"관리자 로그인 실패"),

    VALIDATION_FAIL(400, "입력값 검증 실패"),
    TYPE_MISMATCH(400, "입력 타입 불일치"),
    MISSING_PATH_SEPARATOR(400,"스토리지 경로 미입력"),

    ENTITY_NOT_FOUND(404, "요청한 데이터를 찾을 수 없습니다"),
    DATA_INTEGRITY_VIOLATION(409, "데이터 제약 조건 위반"),

    ACCESS_DENIED(403, "권한이 없습니다"),
    AUTHENTICATION_FAIL(401, "인증 실패"),
    JWT_VALIDATION_FAIL(401, "JWT 검증 실패"),

    NULL_POINTER(500, "Null 참조 예외"),

    ILLEGAL_STATE(500, "잘못된 상태 예외"),

    INPUT_OUPUT_ERROR(500, "입출력 오류"),

    S3_FILE_NOT_FOUND(404, "스토리지 파일 미발견"),

    UNKNOWN_ERROR(500, "알 수 없는 오류"),
    STATIC_RESOURCE_NOT_FOUND(404,"정적 리소스 탐색 실패"),
    SERVER_ERROR(500,"서비스 서버 이상"),
    FIREBASE_ERROR(500,"인증 서버 오류"),
    FIREBASE_ROLE_SAVE_FAIL(500,"인증 서버 인증 정보 저장 실패"),
    USERNAME_VALIDATION_FAILED(400,"사용할 수 없는 아이디"),
    EMAIL_VALIDATION_FAILED(400, "사용할 수 없는 이메일"),
    PHONENUMBER_VALIDATION_FAILED(400, "사용할 수 없는 전화번호");



    private Integer code;
    private String message;

    GlobalStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }
    @Override
    public String getMessage() {
        return this.message;
    }
}
