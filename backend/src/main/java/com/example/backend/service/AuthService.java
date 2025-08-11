package com.example.backend.service;


import com.example.backend.dto.AuthDTO;
import com.example.backend.entity.Admin;
import com.example.backend.exception.AdminNotFoundException;
import com.example.backend.repository.AdminRepository;
import com.example.backend.util.GlobalStatus;
import com.example.backend.util.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;


    public StatusCode login(AuthDTO.LoginRequest loginRequest){
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        Optional<Admin> byUsername = adminRepository.findByUsername(username);
        if (byUsername.isPresent()){
            String encode = passwordEncoder.encode(password);
            boolean matches = passwordEncoder.matches(encode, byUsername.get().getPassword());
            if (matches){
                return GlobalStatus.ADMIN_LOGIN_SUCCESS;
            } else{
                return GlobalStatus.ADMIN_LOGIN_FAIL;
            }

        } else{
            throw new AdminNotFoundException();
        }

    }

}
