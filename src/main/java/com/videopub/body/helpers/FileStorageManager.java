package com.videopub.body.helpers;

import com.videopub.body.exceptions.VideoFileNotFoundException;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileStorageManager {
    @Value("${files.video-directory}")
    private String videoPath;

    @SneakyThrows
    @Async
    public String save(MultipartFile file) {
        if (file != null && !Objects.requireNonNull(file.getOriginalFilename()).isEmpty()) {
            File uploadDir = new File(videoPath);
            String uuidFile = UUID.randomUUID().toString();
            String resultFileName = uuidFile + "." + file.getOriginalFilename();
            String resultFilePath = videoPath + "/" + resultFileName;
            file.transferTo(new File(resultFilePath));
            return resultFileName;
        } else {
            throw new VideoFileNotFoundException();
        }
    }
}
