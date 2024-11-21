package com.videohub.configurations;

import com.videohub.dtos.videoDtos.VideoDto;
import com.videohub.services.videoServices.VideoService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;

@Slf4j
@RequiredArgsConstructor
@Component
public class FilePreload {

    private final VideoService vs;

    @Transactional
    @SneakyThrows
    public void preload() {
        MultipartFile multipartFile = new MockMultipartFile("fire_alarm.mp4", "fire alarm.mp4", "video/mp4", new FileInputStream("C:\\Storage\\tests\\fire alarm.mp4"));
        MultipartFile multipartFile2 = new MockMultipartFile("michael.mp4", "michael.mp4", "video/mp4", new FileInputStream("C:\\Storage\\tests\\michael.mp4"));
        MultipartFile multipartFile3 = new MockMultipartFile("viperr.mp4", "viperr.mp4", "video/mp4", new FileInputStream("C:\\Storage\\tests\\viperr.mp4"));
        log.info("preload {}", vs.addVideo(VideoDto.builder().name("Это файр аларм").description("Вайперы опять сделали мясо rr").videoFile(multipartFile).build()));
        log.info("preload {}", vs.addVideo(VideoDto.builder().name("Майк тусон пизит по еблузон").description("Майк тусон пизит по еблузон всяких школьников и мальчиков").videoFile(multipartFile2).build()));
        log.info("preload {}", vs.addVideo(VideoDto.builder().name("Viperr type beat").description("Вайперы снова сделали мясо viperrrrrr").videoFile(multipartFile3).build()));
    }
}
