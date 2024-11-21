package com.videohub.services;

import com.videohub.dtos.ReportDto;
import com.videohub.exceptions.userExceptions.UserNotFoundException;
import com.videohub.exceptions.videoExceptions.VideoNotFoundException;
import com.videohub.models.Report;
import com.videohub.repositories.videoRepositories.ReportRepository;
import com.videohub.repositories.videoRepositories.VideoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final VideoRepository videoRepository;

    public Page<Report> getAll(Integer offset, Integer limit) {
        return reportRepository.findAll(PageRequest.of(offset, limit));
    }

    @SneakyThrows
    @Transactional
    public Report save(@ModelAttribute ReportDto reportDto) {
        Report report = Report.builder()
                .message(reportDto.getMessage())
                .video(videoRepository.findById(
                        reportDto.getVideoId()).orElseThrow(() -> new VideoNotFoundException(reportDto.getVideoId()))
                )
                .build();
        return reportRepository.save(report);
    }

    @SneakyThrows
    @Transactional
    public Report resolve(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        videoRepository.deleteById(report.getVideo().getId());
        return report;
    }

    @Transactional
    public Report ignore(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        reportRepository.deleteById(reportId);
        return report;
    }

}
