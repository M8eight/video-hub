package com.videohub.configurations;

import com.videohub.daos.UserForm;
import com.videohub.models.Comment;
import com.videohub.models.Rating;
import com.videohub.models.Role;
import com.videohub.models.Video;
import com.videohub.repositories.CommentRepository;
import com.videohub.repositories.RoleRepository;
import com.videohub.repositories.VideoRepository;
import com.videohub.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PreloadDB {
    private static final Logger log = LoggerFactory.getLogger(PreloadDB.class);

    @Bean
    @Autowired
    CommandLineRunner preloadData(VideoRepository fr, CommentRepository commentRepository, UserService us, RoleRepository rr) {
        return args -> {
            log.info("--------------------PRELOAD------------------------");
            log.info("VIDS-----------------------------------------------");
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example.mp4", "example.jpg", new Rating())));
            log.info("preload {}", fr.save(new Video("Gavno2", "описание говна2", 1488, "example.mp4", "example.jpg", new Rating())));

            log.info("COMMENTS--------------------------------------------");
            log.info("preload {}", commentRepository.save(new Comment("Example comment", new Rating(), fr.getReferenceById(1L))));
            log.info("preload {}", commentRepository.save(new Comment("Example comment2", new Rating(), fr.getReferenceById(2L))));

            log.info("ROLES----------------------------------------------");
            log.info("preload {}", rr.save(new Role(1L, "ROLE_USER")));
            log.info("preload {}", rr.save(new Role(2L, "ROLE_ADMIN")));

            log.info("USERS----------------------------------------------");
            log.info("preload {}", us.createUser(new UserForm("IVAN", "12345")));
            log.info("preload {}", us.createUser(new UserForm("ПЕтя", "123456")));

            log.info("---------------------------------------------------");
        };
    }

}
