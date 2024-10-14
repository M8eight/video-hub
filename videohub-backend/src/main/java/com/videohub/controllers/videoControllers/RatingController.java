package com.videohub.controllers.videoControllers;

import com.videohub.models.Rating;
import com.videohub.repositories.videoRepositories.RatingRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class RatingController {

    private final RatingRepository ratingRepository ;

    @PostMapping("/rating/{id}/up")
    public Rating ratingUpEndpoint(@PathVariable Long id) {
        Rating rating = ratingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        rating.setRating_up(rating.getRating_up()+1);
        return ratingRepository.save(rating);
    }

    @PostMapping("/rating/{id}/down")
    public Rating ratingDownEndpoint(@PathVariable Long id) {
        Rating rating = ratingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        rating.setRating_down(rating.getRating_down()+1);
        return ratingRepository.save(rating);
    }
}
