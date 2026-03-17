package com.supun.lostfound.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {

    private String name;
    private String email;
    private String password;

}