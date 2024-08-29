package com.videohub.controllers;

import com.videohub.models.Rating;
import com.videohub.repositories.RatingRepository;
import com.videohub.repositories.VideoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
public class RatingController {

    private final RatingRepository ratingRepository ;

    @CrossOrigin
    @PostMapping("/rating/{id}/up")
    public Rating ratingUp(@PathVariable Long id) {
        Rating rating = ratingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        rating.setRating_up(rating.getRating_up()+1);
        return ratingRepository.save(rating);
    }

    @CrossOrigin
    @PostMapping("/rating/{id}/down")
    public Rating ratingDown(@PathVariable Long id) {
        Rating rating = ratingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        rating.setRating_down(rating.getRating_down()+1);
        return ratingRepository.save(rating);
    }
}
