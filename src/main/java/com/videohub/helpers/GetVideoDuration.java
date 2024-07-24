package com.videohub.helpers;

import com.github.kokorin.jaffree.ffmpeg.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class GetVideoDuration {
    @Value("${files.video-directory}")
    private String storagePath;
    private static final Logger log = LoggerFactory.getLogger(GetVideoDuration.class);
    //todo перенести зависимости
    public int getDuration(String path) {
        final AtomicLong durationMillis = new AtomicLong();
        System.out.println(path);
        FFmpegResult ffmpegResult = FFmpeg.atPath()
                .addInput(
                        UrlInput.fromUrl(storagePath + "/" + path)
                )
                .addOutput(new NullOutput())
                .setProgressListener(new ProgressListener() {
                    @Override
                    public void onProgress(FFmpegProgress progress) {
                        durationMillis.set(progress.getTimeMillis());
                    }
                })
                .execute();

        log.info("FFMPEG execute result, get duration {}", durationMillis);
        return (int) (durationMillis.get() / 1000);
    }
}
