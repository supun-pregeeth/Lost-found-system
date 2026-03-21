package com.supun.lostfound.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;        // LOST or FOUND

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    private String category;

    @Column(length = 1000)
    private String description;

    private String location;

    private String address;

    private LocalDate date;

    private Double reward;

    private String phone;

}