package com.flightroster.auth.config; // Kendi paket isminle aynı olduğundan emin ol

// ===== Imports =====

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService
{
    /**
     * The secret key used for signing the JWT token
     */
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    /**
     * The expiration time for the JWT token in milliseconds
     */
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    /**
     * Extracts the username from the JWT token
     * 
     * @param token (String): The JWT token from which to extract the username
     * 
     * @return String representing the extracted username
     */
    public String extractUsername(String token)
    {
        return (extractClaim(token, Claims::getSubject));
    }

    /**
     * Extracts a specific claim from the JWT token
     * 
     * @param token (String): The JWT token from which to extract the claim
     * @param claimsResolver (Function<Claims, T>): A function to extract a specific claim from the claims
     * 
     * @param <T> The type of the claim to be extracted
     * 
     * @return
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
    {
        final Claims claims = extractAllClaims(token);
        return (claimsResolver.apply(claims));
    }

    /**
     * Generates a JWT token for the given user details
     * 
     * @param userDetails (UserDetails): The user details for whom the token is being generated
     * 
     * @return String representing the generated JWT token
     */
    public String generateToken(UserDetails userDetails)
    {
        return (generateToken(new HashMap<>(), userDetails));
    }

    /**
     * Generates a JWT token with extra claims
     * 
     * @param extraClaims (Map<String, Object>): Additional claims to include in the token
     * @param userDetails (UserDetails): The user details for whom the token is being generated
     * 
     * @return String representing the generated JWT token
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails)
    {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    /**
     * Builds the JWT token with given claims, user details, and expiration
     * 
     * @param extraClaims (Map<String, Object>): Additional claims to include in the token
     * @param userDetails (UserDetails): The user details for whom the token is being generated
     * @param expiration (long): The expiration time for the token in milliseconds
     * 
     * @return String representing the generated JWT token
     */
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration)
    {
        return (Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact());
    }

    /**
     * Validates the JWT token against user details
     * 
     * @param token (String): The JWT token to validate
     * @param userDetails (UserDetails): The user details to compare against
     * 
     * @return boolean indicating whether the token is valid
     */
    public boolean isTokenValid(String token, UserDetails userDetails)
    {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Checks if the JWT token is expired
     * 
     * @param token (String): The JWT token to check for expiration
     * 
     * @return boolean indicating whether the token is expired
     */
    private boolean isTokenExpired(String token)
    {
        return (extractExpiration(token).before(new Date()));
    }

    /**
     * Extracts the expiration date from the JWT token
     * 
     * @param token (String): The JWT token from which to extract the expiration date
     * 
     * @return Date representing the expiration date of the token
     */
    private Date extractExpiration(String token)
    {
        return (extractClaim(token, Claims::getExpiration));
    }

    /**
     * Extracts all claims from the JWT token
     * 
     * @param token (String): The JWT token from which to extract claims
     * 
     * @return Claims extracted from the token
     */
    private Claims extractAllClaims(String token)
    {
        return (Jwts.parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody());
    }

    // Extract signing key
    private Key getSignInKey()
    {
        // Burada artık yukarıdaki 'secretKey' değişkenini kullanıyoruz
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return (Keys.hmacShaKeyFor(keyBytes));
    }
}

