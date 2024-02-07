package com.mini.pms.customexception;

import jakarta.servlet.ServletException;
import jakarta.validation.ValidationException;
import lombok.NonNull;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ExceptionControllerAdvice  extends ResponseEntityExceptionHandler {

    private static final Logger logger = LogManager.getLogger(ExceptionControllerAdvice.class);

    @ExceptionHandler({RuntimeException.class, ServletException.class})
    public ResponseEntity<ExceptionResponse> handleException(Exception e) {
        e.fillInStackTrace();
        logger.error(e.fillInStackTrace());
        if (e instanceof PlatformException platform) {
            return createResponseEntity(platform.getMessage(), platform.getHttpStatusCode());
        } else if (e instanceof AccessDeniedException) {
            return createResponseEntity("Access Denied", HttpStatus.FORBIDDEN);
        } else if (e instanceof NoResourceFoundException) {
            return createResponseEntity("Resource Not Found", HttpStatus.NOT_FOUND);
        } else if(e instanceof ValidationException) {
            return createResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return createResponseEntity("General Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ExceptionResponse> createResponseEntity(
            String message, HttpStatusCode code) {
        return ResponseEntity.status(code)
                .body(ExceptionResponse.builder().message(message).code(code).build());
    }

    /**
     * Handle BadCredentialsException. Triggered when validation with hibernate validator fails.
     *
     * @param ex      BadCredentialsException
     * @param request WebRequest
     * @return CommonResult
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  @NonNull HttpHeaders headers,
                                                                  @NonNull HttpStatusCode status,
                                                                  @NonNull WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        List<ObjectError> errorList = ex.getBindingResult().getAllErrors();
        errorList.forEach((error)-> {
            String fieldName = ((FieldError)error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
