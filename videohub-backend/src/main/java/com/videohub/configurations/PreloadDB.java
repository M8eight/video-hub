package com.videohub.configurations;

import com.videohub.dtos.userDtos.UserDto;
import com.videohub.dtos.videoDtos.VideoDto;
import com.videohub.enumerations.FoldersNames;
import com.videohub.models.*;
import com.videohub.repositories.videoRepositories.CommentRepository;
import com.videohub.repositories.userRepositories.RoleRepository;
import com.videohub.repositories.userRepositories.UserRepository;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;

@Configuration
@RequiredArgsConstructor
@Slf4j
@Deprecated(since = "for testing")
public class PreloadDB {

    private final VideoRepository fr;
    private final VideoService vs;
    private final CommentRepository commentRepository;
    private final UserService us;
    private final RoleRepository rr;
    private final AdminService as;
    private final AuthenticationService authenticationService;
    private final UserRepository ur;

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
                log.info("create if not exist folder : {}", el.substring(1, el.length() - 2));
            }
            log.info("COMMENTS--------------------------------------------");
//            log.info("preload {}", commentRepository.save(new Comment("Example comment", new Rating(), fr.getReferenceById(1L))));
//            log.info("preload {}", commentRepository.save(new Comment("Example comment2", new Rating(), fr.getReferenceById(2L))));
            log.info("ROLES----------------------------------------------");
            log.info("preload {}", rr.save(new Role(1L, "ROLE_USER")));
            log.info("preload {}", rr.save(new Role(2L, "ROLE_ADMIN")));
            log.info("USERS----------------------------------------------");
            log.info("preload {}", us.create(UserDto.builder().login("user").password("user123").build()));
            log.info("preload {}", as.createAdmin(UserDto.builder().login("admin").password("admin").build()));
            log.info("VIDS-----------------------------------------------");
            MultipartFile multipartFile = new MockMultipartFile("fire_alarm.mp4", "fire alarm.mp4", "video/mp4", new FileInputStream("C:\\Storage\\tests\\fire alarm.mp4"));
            MultipartFile multipartFile2 = new MockMultipartFile("michael.mp4", "michael.mp4", "video/mp4", new FileInputStream("C:\\Storage\\tests\\michael.mp4"));
            MultipartFile multipartFile3 = new MockMultipartFile("viperr.mp4", "viperr.mp4", "video/mp4", new FileInputStream("C:\\Storage\\tests\\viperr.mp4"));
            log.info("preload {}", vs.addVideo(VideoDto.builder().name("Это файр аларм").description("Вайперы опять сделали мясо rr").videoFile(multipartFile).build()));
            log.info("preload {}", vs.addVideo(VideoDto.builder().name("Майк тусон пизит по еблузон").description("Майк тусон пизит по еблузон всяких школьников и мальчиков").videoFile(multipartFile2).build()));
            log.info("preload {}", vs.addVideo(VideoDto.builder().name("Viperr type beat").description("Вайперы снова сделали мясо viperrrrrr").videoFile(multipartFile3).build()));
            log.info("---------------------------------------------------");
        };
    }

}
