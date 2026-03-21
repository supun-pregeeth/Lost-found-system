package com.supun.lostfound.controller;

import com.supun.lostfound.entity.Item;
import com.supun.lostfound.entity.Message;
import com.supun.lostfound.service.ItemService;
import com.supun.lostfound.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DashboardController {

    private final ItemService itemService;
    private final MessageService messageService;

    // 🔹 My Reports
    @GetMapping("/reports/my")
    public List<Item> getMyReports(Authentication auth){
        return itemService.getMyItems(auth.getName());
    }

    // 🔹 Matches
    @GetMapping("/matches")
    public List<Item> getMatches(Authentication auth) {
        return itemService.getMatches(auth.getName());
    }

    // 🔹 Messages
    @GetMapping("/messages")
    public List<Message> getMessages(Authentication auth) {
        return messageService.getMessages(auth.getName());
    }

    // 🔹 Stats
    @GetMapping("/dashboard/stats")
    public Map<String, Object> getStats(Authentication auth) {
        return itemService.getStats(auth.getName());
    }
}