package com.example.backend.service;


import com.example.backend.dto.AdminDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.Role;
import com.example.backend.exception.AdminNotFoundException;
import com.example.backend.exception.MissingCredentialsException;
import com.example.backend.exception.UsernamePasswordMismatchException;
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


    public StatusCode login(AdminDTO.LoginRequest loginRequest) throws UsernamePasswordMismatchException{

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (username == null || password == null){
            throw new MissingCredentialsException();
        }

        Optional<Admin> byUsername = adminRepository.findByUsername(username);

        if (byUsername.isPresent()){
            String encode = passwordEncoder.encode(password);
            boolean matches = passwordEncoder.matches(encode, byUsername.get().getPassword());

            if (matches){
                return GlobalStatus.ADMIN_LOGIN_SUCCESS;
            } else{
                throw new UsernamePasswordMismatchException();
            }

        } else{
            throw new UsernamePasswordMismatchException();
        }

    }

//    public void join(String username, String password) throws UsernamePasswordMismatchException {
//        Admin admin = new Admin();
//        admin.setUsername(username);
//        String encodedPassword = passwordEncoder.encode(password);
//        admin.setPassword(encodedPassword);
//        admin.setRole(Role.ROLE_ADMIN);
//
//        adminRepository.save(admin);
//    }

}
