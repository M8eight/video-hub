package com.videohub.helpers;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageManager {

    @Value("${files.video-directory}")
    private String videoPath;

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
