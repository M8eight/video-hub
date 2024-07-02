package com.videopub.body.configurations;

import com.videopub.body.models.Video;
import com.videopub.body.repositories.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PreloadDB {
    private static final Logger log = LoggerFactory.getLogger(PreloadDB.class);

    @Bean
    CommandLineRunner preloadData(VideoRepository fr) {
        return args -> {
            log.info("preload " + fr.save(new Video("Gavno", 1488, "err.png")));
            log.info("preload " + fr.save(new Video("JAVA", 777, "err.png")));
        };
    }
}
