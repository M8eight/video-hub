package com.videohub.configurations;

import com.videohub.helpers.SecurityHelpers;
import com.videohub.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserService userService;
    private final SecurityHelpers securityHelpers;

    @Autowired
    public SecurityConfig(UserService userService, SecurityHelpers securityHelpers) {
        this.userService = userService;
        this.securityHelpers = securityHelpers;
    }

    //    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//                .inMemoryAuthentication()
//                .withUser("user1")
//                .password(passwordEncoder().encode("user1Pass"))
//                .authorities("ROLE_USER");
//    }

    //                        request.requestMatchers("/api/**")
//                        .permitAll()
//                        .requestMatchers(HttpMethod.GET, "/media/**", "/static/**")
//                        .permitAll()

    //                .csrf(csrf -> csrf.csrfTokenRepository
//                        (CookieCsrfTokenRepository.withHttpOnlyFalse()))

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(request -> request
                        .anyRequest()
                        .anonymous())
                .formLogin(form -> form.loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/", true)
                        .failureUrl("/login?error=true"))
                .logout(logout -> logout.logoutUrl("/logout")
                        .deleteCookies("JSESSIONID"))
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .build();
    }
//                .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(securityHelpers.passwordEncoder());
    }
}