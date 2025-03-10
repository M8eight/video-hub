package com.videohub.helpers;

import com.github.kokorin.jaffree.ffmpeg.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

@Component
@Slf4j
public class FfmpegHelpers {
    @Value("${files.video-directory}")
    private String storagePath;

    public void createVideoCutPreview(String path, int duration) {

        int[] segments = {(int) (duration * 0.15), (int) (duration * 0.5), (int) (duration * 0.9)};

        FFmpegResult ffmpegResult = FFmpeg.atPath()
                .addInput(
                        UrlInput.fromPath(Paths.get(storagePath, "/media/", path))
                                .setPosition(segments[0], TimeUnit.SECONDS)
                                .setDuration(3, TimeUnit.SECONDS)
                )
                .addInput(
                        UrlInput.fromPath(Paths.get(storagePath, "/media/", path))
                                .setPosition(segments[1], TimeUnit.SECONDS)
                                .setDuration(3, TimeUnit.SECONDS)
                )
                .addInput(
                        UrlInput.fromPath(Paths.get(storagePath, "/media/", path))
                                .setPosition(segments[2], TimeUnit.SECONDS)
                                .setDuration(3, TimeUnit.SECONDS)
                )
                .setComplexFilter("[0:v][1:v][2:v]concat=n=3:v=1[outv]")
                .addArguments("-map", "[outv]")
                .addOutput(UrlOutput.toUrl(storagePath + "/previews/" + path))
                .execute();
        log.info("FFMPEG execute result, create cut preview {}", path);
    }
    public String getImageFromVideo(String path, int duration) {

        String filename = path.substring(0,path.lastIndexOf("."));
        int currDur =  duration/2;
        String formatTime = String.format("%02d:%02d:%02d", currDur / 3600, currDur / 60 % 60, currDur % 60);

        FFmpegResult ffmpegResult = FFmpeg.atPath()
                .addInput(
                        UrlInput.fromUrl(storagePath + "/media/" + path)
                )
                .addArguments("-ss", formatTime)
                .addArguments("-vframes", "1")
                .addOutput(UrlOutput.toUrl(storagePath + "/pictures/" + filename + ".png"))
                .execute();

        log.info("FFMPEG execute result, get frame {}", filename);
        return filename + ".png";
    }

    public int getDuration(String path) {
        final AtomicLong durationMillis = new AtomicLong();
        log.info(path);
        FFmpegResult ffmpegResult = FFmpeg.atPath()
                .addInput(
                        UrlInput.fromPath(Paths.get(storagePath, "/media/", path))
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
