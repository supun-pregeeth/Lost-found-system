package com.supun.lostfound.service;

import com.supun.lostfound.entity.Message;
import com.supun.lostfound.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<Message> getMessages(String email) {
        return messageRepository.findByReceiverEmail(email);
    }
}