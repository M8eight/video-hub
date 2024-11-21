package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Table(name = "reports")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean isResolved = false;

    @Column(nullable = false)
    @Size(min = 4, max = 200)
    private String message;

    @ManyToOne
    @ToString.Exclude
    @JsonIgnoreProperties("reports")
    private Video video;

}
