package com.mini.pms.service.impl;

import com.mini.pms.entity.type.EmailDetails;
import com.mini.pms.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Value("${mail.enabled}")
    private boolean isEnabled;

    // Method 1
    // To send a simple email
    @Override
    public void sendSimpleMail(String title, String content, String recipient) {

        if (!isEnabled) {
            log.info("Email service is disabled, Skipped sending email...");
            return;
        }

        // Try block to check for exceptions
        try {
            
            // Creating a simple mail message
            var mailMessage = new SimpleMailMessage();

            var details = new EmailDetails();
            details.setSubject(title);
            details.setMsgBody(content);
            details.setRecipient(recipient);

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            // Sending the mail
            javaMailSender.send(mailMessage);
            log.info("Mail Sent Successfully...");
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            log.info("Error while Sending Mail");
        }
    }
}
