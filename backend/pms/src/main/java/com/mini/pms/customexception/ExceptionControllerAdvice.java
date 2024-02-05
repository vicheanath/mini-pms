package com.mini.pms.customexception;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@Log4j2
public class ExceptionControllerAdvice {

//    @ExceptionHandler({Exception.class})
//    public void handleGlobalException(Exception e) {
//        e.printStackTrace();
//    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ExceptionResponse> handleException(Exception e) {
        log.error(e);
        if (e instanceof PlatformException) {
            var platform = (PlatformException) e;
            return ResponseEntity.status(platform.getHttpStatusCode())
                    .body(
                            ExceptionResponse.builder()
                                    .message(platform.getMessage())
                                    .code(platform.getHttpStatusCode())
                                    .build());
        } else if (e instanceof AccessDeniedException) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(
                            ExceptionResponse.builder()
                                    .message("Access Denied")
                                    .code(HttpStatus.FORBIDDEN)
                                    .build());
        } else if(e instanceof NoResourceFoundException){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(
                            ExceptionResponse.builder()
                                    .message("Resource Not Found")
                                    .code(HttpStatus.NOT_FOUND)
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
