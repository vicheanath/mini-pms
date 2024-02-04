package com.mini.pms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PmsApplication implements Runnable {

	public static void main(String[] args) {
		SpringApplication.run(PmsApplication.class, args);
	}

	@Override
	public void run() {

	}
}
