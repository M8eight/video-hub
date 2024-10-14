package com.videohub.interfaces;

import com.videohub.dtos.userDtos.UserDto;
import com.videohub.models.User;
import com.videohub.models.Video;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserDAO {
    User getById(Long id);
    User getRefById(Long id);
    User findByLogin(String login);
    User create(UserDto userForm);
    User editUser(Long id, UserDto userForm);
    @Deprecated(since = "Нужно ли в сервисе копировать репозиторий")
    User save(User user);
    User changePassword(String oldPassword, String password);
    UserDetailsService userDetailsService();
    User updateAvatar(MultipartFile avatar);

    boolean isFavorite(Long videoId);
    List<Video> getFavorite();
    boolean addFavorite(Long videoId);
    boolean removeFavorite(Long videoId);
}
