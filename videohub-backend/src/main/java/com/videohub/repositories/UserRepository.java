package com.videohub.repositories;

import com.videohub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByLogin(String username);

    boolean existsUserByLogin(String email);

     boolean existsUserByEmail(String email);
}
