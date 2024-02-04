package com.mini.pms.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

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
                                            contextPath + "/public", contextPath + "/auth/**")
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
                //                .addFilterBefore()
                .formLogin(Customizer.withDefaults())
                .build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
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
