package com.mini.pms.customexception;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatusCode;

import java.util.Objects;

@Data
@Builder
public class ExceptionResponse {
    private String message;
    private HttpStatusCode code;

    @JsonGetter
    public Integer code2() {
        if (Objects.nonNull(code)) {
            return code.value();
        }
        return null;
    }
}
