package com.videohub.configurations;

import com.videohub.enumerations.FoldersNames;
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
                .addResourceHandler("/media/**")
                .addResourceLocations("file:///" + externalFilePath + FoldersNames.MEDIA);
        registry
                .addResourceHandler("/static-media/**")
                .addResourceLocations("file:///" + externalFilePath + FoldersNames.MEDIA_STATIC);
        registry
                .addResourceHandler("/avatars/**")
                .addResourceLocations("file:///" + externalFilePath + FoldersNames.AVATARS);
        registry
                .addResourceHandler("/pictures/**")
                .addResourceLocations("file:///" + externalFilePath + FoldersNames.PICTURES);
        registry
                .addResourceHandler("/previews/**")
                .addResourceLocations("file:///" + externalFilePath + FoldersNames.VIDEO_PREVIEWS);
        registry
                .addResourceHandler("/static/**")
                .addResourceLocations("classpath:static/");
    }
}
