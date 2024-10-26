package com.videohub.services;

import com.videohub.dtos.ReportDto;
import com.videohub.exceptions.userExceptions.UserNotFoundException;
import com.videohub.exceptions.videoExceptions.VideoNotFoundException;
import com.videohub.models.Report;
import com.videohub.repositories.userRepositories.UserRepository;
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
    private final UserRepository userRepository;

    public Page<Report> getAll(Integer offset, Integer limit) {
        return reportRepository.findAll(PageRequest.of(offset, limit));
    }

    @SneakyThrows
    @Transactional
    public Report save(@ModelAttribute ReportDto reportDto) {

        Report report = new Report();
        report.setMessage(reportDto.getMessage());
        if (reportDto.getVideoId() != null) {
            report.setVideo( videoRepository.findById(reportDto.getVideoId()).orElseThrow(() -> new VideoNotFoundException(reportDto.getVideoId())) );
        }
        if (reportDto.getUserId() != null) {
            report.setUser( userRepository.findById(reportDto.getUserId()).orElseThrow(() -> new UserNotFoundException(reportDto.getUserId())) );
        }
        return reportRepository.save(report);
    }

    @Transactional
    public Report resolve(Long reportId) {
        Report report = reportRepository.getReferenceById(reportId);
        report.setResolved(true);
        return reportRepository.save(report);
    }

    public void deleteById(Long id) {
        reportRepository.deleteById(id);
    }

}
