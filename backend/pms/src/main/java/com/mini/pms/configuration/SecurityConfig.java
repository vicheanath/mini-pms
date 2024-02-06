package com.mini.pms.configuration;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@EnableWebSecurity
@Configuration
@EnableJpaAuditing()
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private static final String[] STATIC_RESOURCES = {
        "/images/**",
        "/js/**",
        "/webjars/**",
        "/swagger-resources/",
        "/swagger-ui/**",
        "/v3/api-docs/**"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(
                        cors ->
                                cors.configurationSource(
                                        request -> {
                                            var all = List.of(CorsConfiguration.ALL);
                                            var c = new CorsConfiguration();
                                            c.setAllowedHeaders(all);
                                            c.setAllowedMethods(all);
                                            c.setAllowedOriginPatterns(all);
                                            return c;
                                        }))
                .authorizeHttpRequests(
                        authorize -> {
                            String contextPath = "**/api/v1";
                            authorize
                                    .requestMatchers(
                                            contextPath + "/public",
                                            contextPath + "/auth/**",
                                            contextPath + "/files/**",
                                            contextPath + "/properties",
                                            contextPath + "/properties/**"
                                    )
                                    .permitAll()
                                    .requestMatchers(contextPath + "/admins/**")
                                    .hasAuthority("Admin")
                                    .requestMatchers(contextPath + "/owners/**")
                                    .hasAuthority("Owner")
                                    .requestMatchers(contextPath + "/customers/**")
                                    .hasAuthority("Customer")
                                    .anyRequest()
                                    .authenticated();
                        })
                .exceptionHandling(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(STATIC_RESOURCES);
    }

    @Bean
    AuthenticationManager authenticationManager(
            UserDetailsService myUserDetailsService, PasswordEncoder encoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(myUserDetailsService);
        provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }
}
