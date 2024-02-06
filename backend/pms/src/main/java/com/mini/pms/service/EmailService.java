package com.mini.pms.service;

public interface EmailService {

    // Method 1
    // To send a simple email
    void sendSimpleMail(String title, String message, String receiverEmail);
}
