package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "comments")
@JsonIgnoreProperties(value ={
        "video"
})
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String text;

    @ManyToOne
    @JoinColumn(name = "users_id")
    @ToString.Exclude
    @JsonIgnoreProperties("comments")
    private User user;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "ratings_id")
    private Rating rating;

    @ManyToOne
    @JoinColumn(name = "videos_id")
    @ToString.Exclude
    @JsonIgnoreProperties("comments")
    private Video video;

    @CreationTimestamp
    @Column
    private java.sql.Timestamp created_at;

    @UpdateTimestamp
    @Column
    private java.sql.Timestamp updated_at;

    public Comment(String text, Rating rating, Video video) {
        this.text = text;
        this.rating = rating;
        this.video = video;
    }
}
