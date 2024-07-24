package com.videohub.configurations;

import com.videohub.models.Video;
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
    CommandLineRunner preloadData(VideoRepository fr) {
        return args -> {
            log.info("preload {}", fr.save(new Video("Gavno", "описание говна", 1488, "example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна", 777,"example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна", 777,"example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна", 777,"example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна описание говнаописаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говнаописание говна", 777,"example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна", 777,"example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна", 777,"example2.mp4", "example.jpg")));
            log.info("preload {}", fr.save(new Video("JAVA", "описание говна", 777,"example2.mp4", "example.jpg")));
        };
    }

}
