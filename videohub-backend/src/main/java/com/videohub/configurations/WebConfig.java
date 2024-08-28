package com.videohub.configurations;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
@Slf4j
public class WebConfig implements WebMvcConfigurer {
    @Value("${allowed-frontend-domain}")
    private String allowedDomain;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        log.info("Allowed fronted domain is: " + allowedDomain);
        registry.addMapping("/**")
                .allowedOrigins(allowedDomain)
                .allowedMethods("GET","POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                .maxAge(3600L);
    }

}