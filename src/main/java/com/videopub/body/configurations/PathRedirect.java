package com.videopub.body.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class PathRedirect implements WebMvcConfigurer {
    @Value("${files.video-directory}")
    private String externalFilePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/img/**")
                .addResourceLocations("file:///" + externalFilePath + "/");
        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("classpath:static/");
    }
}