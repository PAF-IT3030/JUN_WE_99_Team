package com.paf.atlas.security.oauth2.user;


import com.paf.atlas.enumeration.AuthProvider;
import com.paf.atlas.exception.OAuth2AuthenticationProcessingException;
import lombok.experimental.UtilityClass;

import java.util.Map;

@UtilityClass
public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
