package com.example.oauth2resourceservertutorial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class})
public class Oauth2ResourceServerTutorialApplication {
	public static void main(String[] args) {
		SpringApplication.run(Oauth2ResourceServerTutorialApplication.class, args);
	}
}
