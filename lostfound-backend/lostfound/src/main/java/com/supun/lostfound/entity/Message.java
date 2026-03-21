package com.supun.lostfound.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderEmail;
    private String receiverEmail;

    private String content;

    private boolean unread;

    private LocalDateTime createdAt;
}