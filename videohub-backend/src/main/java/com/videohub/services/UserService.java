package com.videohub.services;

import com.videohub.dtos.UserDto;
import com.videohub.exceptions.OldPasswordNotEqualsException;
import com.videohub.exceptions.UserAlreadyRegisterException;
import com.videohub.exceptions.UserNotFoundException;
import com.videohub.exceptions.VideoAlreadyFavoriteException;
import com.videohub.helpers.AuthHelper;
import com.videohub.helpers.FileStorageManager;
import com.videohub.helpers.SaveFileType;
import com.videohub.helpers.ValidUserFields;
import com.videohub.interfaces.UserDAO;
import com.videohub.mappers.UserMapper;
import com.videohub.models.Role;
import com.videohub.models.User;
import com.videohub.models.Video;
import com.videohub.repositories.UserRepository;
import com.videohub.repositories.VideoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDAO {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final VideoRepository videoRepository;
    private final AuthHelper authHelper;
    private final FileStorageManager fileStorageManager;

    @SneakyThrows
    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @SneakyThrows
    @Override
    public User getRefById(Long id) {
        try {
            return userRepository.getReferenceById(id);
        } catch (EntityNotFoundException e) {
            throw new UserNotFoundException(id);
        }
    }

    @SneakyThrows
    @Override
    public User findByLogin(String username) {
        return userRepository.findUserByLogin(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    @SneakyThrows
    @Override
    public User editUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        user.setLogin(ValidUserFields.validNotNull(userDto.getLogin(), user.getLogin()));
        user.setEmail(ValidUserFields.validNotNull(userDto.getEmail(), user.getEmail()));
        user.setPhoneNumber(ValidUserFields.validNotNull(userDto.getPhoneNumber(), user.getPhoneNumber()));

        return userRepository.save(user);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @SneakyThrows
    @Override
    public User changePassword(String oldPassword, String password) {
        User user = authHelper.getUserFromAuth();
        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(password));
            return userRepository.save(user);
        }
        throw new OldPasswordNotEqualsException();
    }

    @Override
    public UserDetailsService userDetailsService() {
        return this::findByLogin;
    }

    @SneakyThrows
    @Override
    public User createUser(UserDto userDto) {
        if (userRepository.existsUserByLogin(userDto.getLogin())) {
            throw new UserAlreadyRegisterException(userDto);
        }

        User user = userMapper.toUserDtoRegister(userDto);
        user.setRoles(Collections.singleton(new Role(1L, "ROLE_USER")));
        String passwordEncode = passwordEncoder.encode(userDto.getPassword());
        user.setPassword(passwordEncode);

        return userRepository.save(user);
    }

    @SneakyThrows
    @Transactional
    @Override
    public User updateAvatar(MultipartFile avatar) {
        User user = authHelper.getUserFromAuth();
        String avatarFilename = fileStorageManager.save(avatar, SaveFileType.AVATAR);
        user.setAvatar_path(avatarFilename);
        return userRepository.save(user);
    }

    @SneakyThrows
    @Override
    public List<Video> getFavoriteVideos() {

        User user = authHelper.getUserFromAuth();
        return user.getFavoriteVideos();
    }

    @SneakyThrows
    @Override
    public List<Video> addFavoriteVideo(Long videoId) {
        User user = authHelper.getUserFromAuth();
        Video video = videoRepository.findById(videoId).orElseThrow();

        List<Video> favorites = user.getFavoriteVideos();
        if (!favorites.contains(video)) {
            favorites.add(video);
            user.setFavoriteVideos(favorites);
            log.info(favorites.toString());
            User user1 = userRepository.save(user);
            return user1.getFavoriteVideos();
        } else {
            throw new VideoAlreadyFavoriteException();
        }
    }

    @SneakyThrows
    @Override
    public List<Video> removeFavoriteVideo(Long videoId) {
        User user = authHelper.getUserFromAuth();
        Video video = videoRepository.findById(videoId).orElseThrow();
        user.getFavoriteVideos().remove(video);
        return userRepository.save(user).getFavoriteVideos();
    }
}
