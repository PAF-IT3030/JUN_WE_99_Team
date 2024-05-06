package com.paf.atlas.service;

import com.paf.atlas.model.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    
    User getByUserId(String id);

    List<User> getAllUsers();

    Map<String, String> deleteUserById(String id);

    User editUserById(String id, User user);
}
