package com.flightroster.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.flightroster.auth.services.AuthUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig 
{
    private final AuthUserDetailsService userDetailsService;

    /**
     * Configures the AuthenticationProvider bean
     * 
     * @return AuthenticationProvider instance
     */
    @Bean
    public AuthenticationProvider authenticationProvider() 
    {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);        
        authProvider.setPasswordEncoder(passwordEncoder());

        return (authProvider);
    }

    /**
     * Configures the AuthenticationManager bean
     * 
     * @param config (AuthenticationConfiguration): The authentication configuration
     * 
     * @throws Exception if an error occurs during configuration
     * 
     * @return AuthenticationManager instance
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception 
    {
        return (config.getAuthenticationManager());
    }

    /**
     * Configures the PasswordEncoder bean
     * 
     * @return PasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() 
    {
        return (new BCryptPasswordEncoder());
    }
}