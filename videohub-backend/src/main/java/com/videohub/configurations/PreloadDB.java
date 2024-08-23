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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class PreloadDB {

    private final VideoRepository fr;
    private final CommentRepository commentRepository;
    private final UserService us;
    private final RoleRepository rr;
    @Bean
    CommandLineRunner preloadData() {
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

            var u = new UserForm();
            u.setUsername("IVAN");
            u.setPassword("12345");
            u.setEmail("alekskoch234@gmail.com");

            log.info("preload {}", us.createUser(u));
            log.info("---------------------------------------------------");
        };
    }

}
