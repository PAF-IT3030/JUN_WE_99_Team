package com.paf.atlas.service;

import com.paf.atlas.entity.User;
import com.paf.atlas.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getByUserId(String id) {
        return userRepository.findById(id).orElseGet(User::new);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Map<String, String> deleteUserById(String id) {
        Optional<User> user = userRepository.findById(id);
        Map<String, String> response = new HashMap<>();
        if (user.isPresent()) {
            userRepository.deleteById(id);
            response.put("response", "User deleted successfully");
        } else {
            response.put("response", "User not found");
        }
        return response;
    }
    @Override
    public User editUserById(String id, User user) {
        Optional<User> oldUser = userRepository.findById(id);
        if (oldUser.isPresent()) {
            userRepository.save(user);
        } else {
            return new User();
        }
        return user;
    }
}
