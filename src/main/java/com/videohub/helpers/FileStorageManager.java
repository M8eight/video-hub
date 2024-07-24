package com.videohub.helpers;

import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileStorageManager {
    @Value("${files.video-directory}")
    private String videoPath;

    private static final Logger log = LoggerFactory.getLogger(FileStorageManager.class);

    @SneakyThrows
    public String save(MultipartFile file) {
        if (file != null && !Objects.requireNonNull(file.getOriginalFilename()).isEmpty()) {
            String uuidFile = UUID.randomUUID().toString();

            String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);

            String resultFileName = uuidFile + "." + fileExtension;
            String resultFilePath = videoPath + "/" + resultFileName;
            log.info("upload new file {}", resultFileName);

            file.transferTo(new File(resultFilePath));
            return resultFileName;
        } else {
            throw new FileNotFoundException();
        }
    }
}
