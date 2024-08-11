package com.videohub.helpers;

import com.github.kokorin.jaffree.ffmpeg.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicLong;

@Component
public class FfmpegHelpers {
    @Value("${files.video-directory}")
    private String storagePath;

    private static final Logger log = LoggerFactory.getLogger(FfmpegHelpers.class);

    public String getImageFromVideo(String path, int duration) {

        String filename = path.substring(0,path.lastIndexOf("."));
        int currDur =  duration/2;
        String formatTime = String.format("%02d:%02d:%02d", currDur / 3600, currDur / 60 % 60, currDur % 60);

        FFmpegResult ffmpegResult = FFmpeg.atPath()
                .addInput(
                        UrlInput.fromUrl(storagePath + "/" + path)
                )
                .addArguments("-ss", formatTime)
                .addArguments("-vframes", "1")
                .addOutput(UrlOutput.toUrl(storagePath + "/" + filename + ".png"))
                .execute();

        log.info("FFMPEG execute result, get frame {}", filename);
        return filename + ".png";
    }

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
