package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.hypersistence.utils.hibernate.type.search.PostgreSQLTSVectorType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "videos")
@JsonIgnoreProperties(value = {
        "comments"
})
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private int duration;

    @ManyToOne
    @Nullable
    @ToString.Exclude
    @JsonIgnoreProperties("videos")
    private User user;

    private Long views = 0L;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToMany
    private Set<VideoTag> tags;

    @NotNull
    private String video_path;

    @NotNull
    private String preview_path;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "rating_id")
    public Rating rating;

    @ToString.Exclude
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();

    @CreationTimestamp
    @Column
    private java.sql.Timestamp created_at;

    @UpdateTimestamp
    @Column
    private java.sql.Timestamp updated_at;

    @Deprecated(since = "For tests")
    public Video(String name, String description, int duration, String video_path, String preview_path , Rating rating) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.video_path = video_path;
        this.preview_path = preview_path;
        this.rating = rating;
    }

    public Video(String name, String description, int duration, Set<VideoTag> tags,String video_path, String preview_path, User user , Rating rating) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.tags = tags;
        this.video_path = video_path;
        this.preview_path = preview_path;
        this.user = user;
        this.rating = rating;
    }

    @Deprecated(since = "For tests")
    public Video(String name, String description, int duration, String video_path, String preview_path, Rating rating, Long views) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.video_path = video_path;
        this.preview_path = preview_path;
        this.rating = rating;
        this.views = views;
    }
}