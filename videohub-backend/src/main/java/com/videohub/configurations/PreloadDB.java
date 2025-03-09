package com.videohub.configurations;

import com.videohub.dtos.userDtos.UserDto;
import com.videohub.dtos.videoDtos.VideoDto;
import com.videohub.enumerations.FoldersNames;
import com.videohub.models.Role;
import com.videohub.repositories.userRepositories.RoleRepository;
import com.videohub.repositories.userRepositories.UserRepository;
import com.videohub.repositories.videoRepositories.CommentRepository;
import com.videohub.repositories.videoRepositories.VideoRepository;
import com.videohub.services.authServices.AdminService;
import com.videohub.services.authServices.AuthenticationService;
import com.videohub.services.userServices.UserService;
import com.videohub.services.videoServices.VideoService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class PreloadDB {

    private final VideoRepository fr;
    private final VideoService vs;
    private final CommentRepository commentRepository;
    private final UserService us;
    private final RoleRepository rr;
    private final AdminService as;
    private final AuthenticationService authenticationService;
    private final UserRepository ur;
    private final FilePreload fp;

    @Value("${files.video-directory}")
    String storagePath;

    @Bean
    @Transactional
    CommandLineRunner preloadData() {
        return args -> {
            log.info("--------------------PRELOAD------------------------");
            log.info("FOLDERS--------------------------------------------");
            for (String el : new String[] {
                    FoldersNames.AVATARS,
                    FoldersNames.MEDIA,
                    FoldersNames.MEDIA_STATIC,
                    FoldersNames.PICTURES,
                    FoldersNames.VIDEO_PREVIEWS
            }) {
                new File(storagePath + el).mkdirs();
                log.info("create if not exist folder : {}", el.replace("/", ""));
            }
            log.info("ROLES----------------------------------------------");
            log.info("preload {}", rr.save(new Role(1L, "ROLE_USER")));
            log.info("preload {}", rr.save(new Role(2L, "ROLE_ADMIN")));
            log.info("USERS----------------------------------------------");
            log.info("preload {}", us.create(UserDto.builder().login("user").password("user123").build()));
            log.info("preload {}", as.createAdmin(UserDto.builder().login("admin").password("admin").build()));
            log.info("---------------------------------------------------");

        };
    }

}
