package com.mini.pms.restcontroller;

import com.mini.pms.restcontroller.request.EmailRequest;
import com.mini.pms.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/emails")
@RequiredArgsConstructor
public class EmailRestController {

    private final EmailService emailService;

    @PostMapping("send")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendSimpleMail(
                emailRequest.getTitle(), emailRequest.getContent(), emailRequest.getRecipient());
    }
}
