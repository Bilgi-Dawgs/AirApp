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
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;

    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration;

    // Extract username from token
    public String extractUsername(String token)
    {
        return (extractClaim(token, Claims::getSubject));
    }

    // Extract general claim from token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver)
    {
        final Claims claims = extractAllClaims(token);
        return (claimsResolver.apply(claims));
    }

    // Generate token without extra claims
    public String generateToken(UserDetails userDetails)
    {
        return (generateToken(new HashMap<>(), userDetails));
    }

    // Generate token with extra claims
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails)
    {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration)
    {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    // Check if token is valid
    public boolean isTokenValid(String token, UserDetails userDetails)
    {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Check if token is expired
    private boolean isTokenExpired(String token)
    {
        return (extractExpiration(token).before(new Date()));
    }

    // Extract expiration date from token
    private Date extractExpiration(String token)
    {
        return (extractClaim(token, Claims::getExpiration));
    }

    // Extract all claims from token
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