//package com.videohub.models;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Getter
//@Setter
//@ToString
//@RequiredArgsConstructor
//@Table(name = "tags")
//public class VideoTag {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @NotBlank
//    private String text;
//
//    @ManyToOne
//    @JsonIgnoreProperties("tags")
//    private Video video;
//}