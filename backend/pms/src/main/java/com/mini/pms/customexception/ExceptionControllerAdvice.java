package com.mini.pms.customexception;

import lombok.extern.log4j.Log4j2;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@Log4j2
public class ExceptionControllerAdvice {

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ExceptionResponse> handleException(Exception e) {
        log.error(e);
        if (e instanceof PlatformException) {
            var platform = (PlatformException) e;
            return createResponseEntity(platform.getMessage(), platform.getHttpStatusCode());
        } else if (e instanceof AccessDeniedException) {
            return createResponseEntity("Access Denied", HttpStatus.FORBIDDEN);
        } else if (e instanceof NoResourceFoundException) {
            return createResponseEntity("Resource Not Found", HttpStatus.NOT_FOUND);
        }
        return createResponseEntity("General Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ExceptionResponse> createResponseEntity(
            String message, HttpStatusCode code) {
        return ResponseEntity.status(code)
                .body(ExceptionResponse.builder().message(message).code(code).build());
    }
}
