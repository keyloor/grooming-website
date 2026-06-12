package com.example.demo.dtos;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OwnersRequestDto {

    private String name;
    private String email;
    private String phone;
    
    @Pattern(
        regexp = "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{6,15}$",
        message = "La contraseña debe tener entre 6 y 15 caracteres e incluir al menos un carácter especial"
    )
    private String password;
}
