package com.mini.pms.customexception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Log4j2
public class ExceptionControllerAdvice {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionResponse> handleException(RuntimeException e) {
        log.error(e.getMessage());
        if (e instanceof PlatformException) {
            var platform = (PlatformException) e;
            return ResponseEntity.status(platform.getHttpStatusCode())
                    .body(
                            ExceptionResponse.builder()
                                    .message(platform.getMessage())
                                    .code(platform.getHttpStatusCode())
                                    .build());
        }
        return ResponseEntity.internalServerError()
                .body(
                        ExceptionResponse.builder()
                                .message("General Error")
                                .code(HttpStatus.INTERNAL_SERVER_ERROR)
                                .build());
    }
}
