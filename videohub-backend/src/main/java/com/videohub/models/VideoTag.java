package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "tags", uniqueConstraints = {
        @UniqueConstraint(columnNames = "text"),
})
public class VideoTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String text;

    private Long clicked = 0L;

    @ManyToMany
    @JsonIgnoreProperties("tags")
    @ToString.Exclude
    private Set<Video> videos;

    public VideoTag(String text) {
        this.text = text;
    }

}