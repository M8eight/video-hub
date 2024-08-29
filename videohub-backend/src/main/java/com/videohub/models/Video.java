package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "videos")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private int duration;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    private String video_path;

    @NotNull
    private String preview_path;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "rating_id")
    public Rating rating;

    @OneToMany(mappedBy = "video")
    private List<Comment> comments = new ArrayList<>();

    @CreationTimestamp
    @Column
    private java.sql.Timestamp created_at;

    @UpdateTimestamp
    @Column
    private java.sql.Timestamp updated_at;

    public Video(String name, String description, int duration, String video_path, String preview_path, Rating rating) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.video_path = video_path;
        this.preview_path = preview_path;
        this.rating = rating;
    }
}
