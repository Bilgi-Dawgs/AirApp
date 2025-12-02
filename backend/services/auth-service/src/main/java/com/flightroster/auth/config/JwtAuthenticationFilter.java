package com.flightroster.auth.config;

// ===== Imports =====

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

// ===== Class =====

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /**
     * @brief Filter to authenticate requests using JWT tokens
	 * 
	 * @param request (HttpServletRequest): The incoming HTTP request
	 * @param response (HttpServletResponse): The outgoing HTTP response
	 * @param filterChain (FilterChain): The filter chain to continue processing
	 * 
	 * @throws ServletException if a servlet error occurs
	 * @throws IOException if an I/O error occurs
	 * 
	 * @details This filter checks for JWT tokens in the Authorization header of incoming requests.
	 * If a valid token is found, it loads the user details and sets the authentication in the SecurityContext.
	 * Public endpoints are bypassed to allow unauthenticated access.
	 * The filter ensures that only authenticated requests can access protected resources.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
                                    throws ServletException, IOException
    {
        // Check if the request is for a public endpoint
        if (isPublicEndpoint(request))
        {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract JWT token from the request header
        String jwt = extractTokenFromRequest(request);

        // If no token is found, continue the filter chain
        if (jwt == null)
        {
            filterChain.doFilter(request, response);
            return;
        }

        // Perform authentication if the token is valid
        String userEmail = jwtService.extractUsername(jwt);
        
        if (userEmail != null && isContextEmpty())
        {
            authenticateUser(request, jwt, userEmail);
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }

    // ==========================================
    // Private Helper Methods
    // ==========================================

    /**
     * @brief Checks if the request path corresponds to a public endpoint
	 * 
     * @param request (HttpServletRequest) The incoming HTTP request
	 * 
     * @return true if the endpoint is public, false otherwise
     */
    private boolean isPublicEndpoint(HttpServletRequest request)
    {
        String path = request.getServletPath();
        
        boolean isPublic = path.startsWith("/auth/register")
            || path.startsWith("/auth/login")
            || path.startsWith("/auth/health")
            || path.startsWith("/auth/refresh-token")
            || path.startsWith("/auth/forgot-password")
            || path.startsWith("/auth/reset-password");
            

        return (isPublic);
    }

    /**
     * @brief Extracts the JWT token from the Authorization header
	 * 
     * @param request (HttpServletRequest): The incoming HTTP request
	 * 
     * @return The JWT token string or null if not present/invalid
     */
    private String extractTokenFromRequest(HttpServletRequest request)
    {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer "))
        {
            return (null);
        }

        return (authHeader.substring(7));
    }

    /**
     * @brief Checks if the SecurityContext currently has no authentication
     * 
	 * @return true if context is empty, false otherwise
     */
    private boolean isContextEmpty()
    {
        return (SecurityContextHolder.getContext().getAuthentication() == null);
    }

    /**
     * @brief Loads user details and updates the SecurityContext
	 * 
     * @param request The incoming HTTP request (for details)
     * @param jwt The JWT token
     * @param userEmail The email extracted from the token
	 * 
	 * @return void
     */
    private void authenticateUser(HttpServletRequest request, String jwt, String userEmail)
    {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        if (jwtService.isTokenValid(jwt, userDetails))
        {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
            );

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
}