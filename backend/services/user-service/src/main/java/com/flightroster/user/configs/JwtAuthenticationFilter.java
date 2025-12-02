package com.flightroster.user.configs;

import java.io.IOException;
import java.util.Collections;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filter that intercepts requests to validate JWT.
 * Executes once per request to check the Authorization header.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil)
    {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException
    {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // Check for Bearer token
        if (authHeader == null || !authHeader.startsWith("Bearer "))
        {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);

        try
        {
            userEmail = jwtUtil.extractUsername(jwt);

            // Validate token and set Security Context if not already set
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null)
            {
                if (jwtUtil.isTokenValid(jwt))
                {
                    // TODO: Extract roles from token claims if needed
                    // Note: Roles should ideally be extracted from the token claims here.
                    // For now, we set an empty list as role handling is done via Service/DB lookup if needed.
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userEmail,
                            null,
                            Collections.emptyList()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }
        catch (Exception e)
        {
            // In case of any exception (e.g., token parsing issues), proceed without setting authentication
            // Optionally, log the exception for debugging purposes
        }

        filterChain.doFilter(request, response);
    }
}