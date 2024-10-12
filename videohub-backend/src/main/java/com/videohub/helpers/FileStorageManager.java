package com.videohub.helpers;

import com.videohub.exceptions.FileExtensionNotSupport;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

@Service
@Slf4j
public class FileStorageManager {

    @Value("${files.video-directory}")
    private String videoPath;

    @SneakyThrows
    public String save(MultipartFile file, SaveFileType type) {
        if (file != null && !Objects.requireNonNull(file.getOriginalFilename()).isEmpty()) {
            String uuidFile = UUID.randomUUID().toString();

            String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
            log.info(fileExtension);

            String resultFileName = uuidFile + "." + fileExtension;
            String resultFilePath = videoPath;
            switch (type) {
                case VIDEO -> resultFilePath += "/media/" + resultFileName;
                case AVATAR -> resultFilePath += "/avatars/" + resultFileName;
                case PICTURE -> resultFilePath += "/pictures/" + resultFileName;
            }

            switch (type) {
                case PICTURE,AVATAR:
                    if(new ArrayList<>(Arrays.asList("jpg", "png", "webp", "jpeg")).stream().noneMatch(s -> Objects.equals(s, fileExtension)))
                        throw new FileExtensionNotSupport();
                    break;
                case VIDEO:
                    if(new ArrayList<>(Arrays.asList("mp4", "avi", "webm", "mkv")).stream().noneMatch(s -> Objects.equals(s, fileExtension)))
                        throw new FileExtensionNotSupport();
                    break;
            }

            log.info("upload new file {}", resultFileName);

            file.transferTo(new File(resultFilePath));
            return resultFileName;
        } else {
            throw new FileNotFoundException();
        }
    }

    public MultipartFile dataUrlToMultipartFile(String dataUrl) {
        String[] dataUrlParts = dataUrl.split(",");
        String type = dataUrlParts[0].split(";")[0].split(":")[1];
        String base64 = dataUrlParts[1];
        String filename = UUID.randomUUID().toString() + "." + type.split("/")[1];

        byte[] imageBytes = Base64.getDecoder().decode(base64);

        return new MockMultipartFile(filename, filename, type, imageBytes);
    }

}
