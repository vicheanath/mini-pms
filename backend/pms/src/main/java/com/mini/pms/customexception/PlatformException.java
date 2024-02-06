package com.mini.pms.customexception;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatusCode;

@Data
@Builder
public class PlatformException extends RuntimeException {

    private String message;
    private HttpStatusCode httpStatusCode;

    public PlatformException(String message, HttpStatusCode httpStatusCode) {
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
