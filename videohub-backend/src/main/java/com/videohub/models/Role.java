package com.videohub.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "roles")
@JsonIgnoreProperties(value = {
        "users"
})
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String name;

    @Transient
    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    private Set<User> users;

    @Override
    public String getAuthority() {
        return getName();
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
