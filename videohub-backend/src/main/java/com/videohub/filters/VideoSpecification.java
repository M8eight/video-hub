package com.videohub.filters;

import com.videohub.models.Video;
import com.videohub.models.VideoTag;
import com.videohub.models.Video_;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class VideoSpecification {

    public static Specification<Video> sortByViews() {
        return (root, query, criteriaBuilder) -> {
            assert query != null;
            query.orderBy(criteriaBuilder.desc(root.get("views")));
            return null;
        };
    }

    public static Specification<Video> sortByRating() {
        return (root, query, criteriaBuilder) -> {
            assert query != null;
            query.orderBy(criteriaBuilder.desc(root.get("rating")));
            return null;
        };
    }

    public static Specification<Video> sortByCreated_atDesc() {
        return (root, query, criteriaBuilder) -> {
            assert query != null;
            query.orderBy(criteriaBuilder.desc(root.get("created_at")));
            return null;
        };
    }

    public static Specification<Video> hasManyTags(List<String> tags) {
        return (root, query, criteriaBuilder) -> {
            if (tags == null || tags.isEmpty()) {
                return null;
            }
            Join<VideoTag, Video> videoJoin = root.join("tags");
            return criteriaBuilder.in(videoJoin.get("text")).value(tags);
        };
    }
}
