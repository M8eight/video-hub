package com.videohub.controllers;

import com.videohub.dtos.ReportDto;
import com.videohub.models.Report;
import com.videohub.services.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("api/report")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/all")
    public Page<Report> getAll(@RequestParam(defaultValue = "0") int offset, @RequestParam(defaultValue = "30") int limit) {
        return reportService.getAll(offset, limit);
    }

    @PostMapping
    public Report save(@ModelAttribute ReportDto reportDto) {
        log.info("save {}", reportDto);
        return reportService.save(reportDto);
    }

    @PostMapping("/accept/{reportId}")
    public Report accept(@PathVariable Long reportId) {
        return reportService.resolve(reportId);
    }

    @PostMapping("/ignore/{reportId}")
    public Report ignore(@PathVariable Long reportId) {
        return reportService.ignore(reportId);
    }

}