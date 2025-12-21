package com.airapp.main_service.clients;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.airapp.main_service.dto.AuthUser;
import com.airapp.main_service.dto.TokenValidateRequest;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthClient
{
    private final RestTemplate restTemplate;

    @Value("${services.auth-service.url}")
    private String authServiceUrl;

    public AuthUser validate(String accessToken)
    {
        String url = authServiceUrl + "/auth/validate";

        try
        {
            return restTemplate.postForObject(
                url,
                new TokenValidateRequest(accessToken),
                AuthUser.class
            );
        }
        catch (HttpClientErrorException.Unauthorized e)
        {
            return null;
        }
    }
}
