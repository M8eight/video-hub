package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

@Entity
@Getter
@Setter
@ToString
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isResolved = false;

    private String message;

    @ManyToOne(cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnoreProperties("reports")
    @Nullable
    private Video video;

    @ManyToOne(cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnoreProperties("reports")
    @Nullable
    private User user;

    @PrePersist
    @PreUpdate
    public void notNullCheck() {
        if (video == null && user == null) {
            throw new RuntimeException("one of the fields (video, user) must be non-null");
        }
    }

}
