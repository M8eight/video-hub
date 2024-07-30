package com.videohub.configurations;

import com.videohub.models.Comment;
import com.videohub.models.Rating;
import com.videohub.models.Video;
import com.videohub.repositories.CommentRepository;
import com.videohub.repositories.VideoRepository;
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
    CommandLineRunner preloadData(VideoRepository fr, CommentRepository commentRepository) {
        return args -> {
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example.mp4", "example.jpg", new Rating())));
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example.mp4", "example.jpg", new Rating())));
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example.mp4", "example.jpg", new Rating())));
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example.mp4", "example.jpg", new Rating())));
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example.mp4", "example.jpg", new Rating())));

            log.info("preload {}", commentRepository.save(new Comment("Example comment", new Rating(), fr.getReferenceById(1L))));
        };
    }

}
