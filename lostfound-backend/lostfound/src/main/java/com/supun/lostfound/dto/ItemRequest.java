package com.supun.lostfound.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ItemRequest {

    private String type;
    private String title;
    private String category;
    private String description;

    private String location;
    private String address;

    private LocalDate date;

    private Double reward;

    private String email;
    private String phone;

}