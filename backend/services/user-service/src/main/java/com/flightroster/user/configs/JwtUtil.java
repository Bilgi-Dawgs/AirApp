package com.flightroster.user.configs;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * Utility class for handling JSON Web Tokens.
 * Responsible for extracting claims and validating tokens using the secret key.
 */
@Component
public class JwtUtil
{
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    /**
     * Extracts the username (subject) from the token.
     * 
     * @param token (String): The JWT from which to extract the username.
     * 
     * @return The username contained in the token.
     */
    public String extractUsername(String token)
    {
        return (extractClaim(token, Claims::getSubject));
    }

    /**
     * Generic method to extract a specific claim.
     * 
     * @param token (String): The JWT from which to extract the claim.
     * @param claimsResolver (Function<Claims, T>): A function to extract the desired claim.
     * 
     * @return The extracted claim.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
    {
        final Claims claims = extractAllClaims(token);
        return (claimsResolver.apply(claims));
    }

    /**
     * Parses the token and returns all claims.
     * 
     * @param token (String): The JWT to parse.
     * 
     * @return Claims contained in the token.
     */
    private Claims extractAllClaims(String token)
    {
        return (Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody());
    }

    /**
     * Retrieves the signing key used for token validation.
     * 
     * @return The signing Key.
     */
    private Key getSignInKey()
    {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return (Keys.hmacShaKeyFor(keyBytes));
    }

    /**
     * Validates if the token is structurally correct and not expired.
     * 
     * @param token (String): The JWT to validate.
     * 
     * @return True if valid, false otherwise.
     */
    public boolean isTokenValid(String token)
    {
        try
        {
            return (!isTokenExpired(token));
        }
        catch (Exception e)
        {
            return (false);
        }
    }

    /**
     * Checks if the token has expired.
     * 
     * @param token (String): The JWT to check.
     * 
     * @return True if expired, false otherwise.
     */
    private boolean isTokenExpired(String token)
    {
        return (extractClaim(token, Claims::getExpiration).before(new Date()));
    }
}