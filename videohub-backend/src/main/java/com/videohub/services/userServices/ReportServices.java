package com.videohub.services.userServices;

import com.videohub.repositories.videoRepositories.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServices {

    private final ReportRepository reportRepository;


}
