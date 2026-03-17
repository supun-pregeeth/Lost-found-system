package com.supun.lostfound.service;

import com.supun.lostfound.dto.ItemRequest;
import com.supun.lostfound.entity.Item;
import com.supun.lostfound.entity.User;
import com.supun.lostfound.repository.ItemRepository;
import com.supun.lostfound.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    /**
     * Create a new item for the currently authenticated user.
     * The user's email is retrieved from the SecurityContext (set by JWT filter),
     * not from the request, to prevent spoofing or null email issues.
     */

    public Item createItem(ItemRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal() == "anonymousUser") {
            throw new RuntimeException("User not authenticated");
        }

        User user = (User) auth.getPrincipal(); // cast to your User entity if you implemented UserDetails
        // OR fetch from DB by username/email if auth.getPrincipal() is UserDetails

        Item item = Item.builder()
                .type(request.getType())
                .user(user)
                .title(request.getTitle())
                .category(request.getCategory())
                .description(request.getDescription())
                .location(request.getLocation())
                .address(request.getAddress())
                .date(request.getDate())
                .reward(request.getReward())
                .email(user.getEmail())
                .phone(request.getPhone())
                .build();

        return itemRepository.save(item);
    }
    /**
     * Get all items in the database
     */
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    /**
     * Get only lost items
     */
    public List<Item> getLostItems() {
        return itemRepository.findByType("LOST");
    }

    /**
     * Get only found items
     */
    public List<Item> getFoundItems() {
        return itemRepository.findByType("FOUND");
    }
}