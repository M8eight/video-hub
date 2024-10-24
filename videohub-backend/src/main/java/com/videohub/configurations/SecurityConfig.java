package com.videohub.configurations;

import com.videohub.filters.JwtAuthenticationFilter;
import com.videohub.helpers.SecurityHelpers;
import com.videohub.services.userServices.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserService userService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final SecurityHelpers securityHelpers;

    @Bean
    @Deprecated(since = "for test")
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(HttpMethod.GET, "/media/**").permitAll()

//                        .requestMatchers(HttpMethod.GET, "/api/videos").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/video/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/api/video").permitAll()
//                        .requestMatchers("/api/video/*").permitAll()
//
//                        .requestMatchers(HttpMethod.GET, "/api/video/*/comments").permitAll()
//                        .requestMatchers("/api/video/*/comment/new").authenticated()
//                        .requestMatchers("/api/video/**").hasRole("ADMIN")
//
//                        .requestMatchers("/api/rating/**").authenticated()
//                        .requestMatchers("/auth/**").anonymous()
//
//                        .requestMatchers("/api/admin/**").permitAll()

                        .requestMatchers("/api/user/*").permitAll()

//                        .anyRequest().hasRole("ADMIN"));
                        .anyRequest().permitAll());
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService.userDetailsService());
        authenticationProvider.setPasswordEncoder(securityHelpers.passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}