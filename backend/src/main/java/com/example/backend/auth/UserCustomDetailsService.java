package com.example.backend.auth;

import com.example.backend.entity.Admin;
import com.example.backend.exception.AdminNotFoundException;
import com.example.backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCustomDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> byUsername = adminRepository.findByUsername(username);
        if (byUsername.isPresent()) {
            return new UserCustomDetails(byUsername.get());
        } else{
            throw new AdminNotFoundException();
        }

    }
}
