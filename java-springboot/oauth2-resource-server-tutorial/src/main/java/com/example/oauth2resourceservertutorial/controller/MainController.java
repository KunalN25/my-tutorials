package com.example.oauth2resourceservertutorial.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/public")
    public String homePage() {
        return "Hello from Spring boot app";
    }

    @GetMapping("/private")
    public String privateRoute() {

//        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return "Private Route";
    }


}
