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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    /*
     Create a new item for the currently authenticated user.
     The user's email is retrieved from the SecurityContext (set by JWT filter),
     not from the request, to prevent spoofing or null email issues.
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
                .phone(request.getPhone())
                .build();

        return itemRepository.save(item);
    }

    //Get all items in the database
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    //Get only lost items
    public List<Item> getLostItems() {
        return itemRepository.findByType("LOST");
    }

    //Get only found items
    public List<Item> getFoundItems() {
        return itemRepository.findByType("FOUND");
    }

    //Get my report
    public List<Item> getMyItems(String email){
        return itemRepository.findByUser_Email(email);
    }

    //match item
    public List<Item> getMatches(String email) {

        List<Item> myItems = itemRepository.findByUser_Email(email);
        List<Item> allItems = itemRepository.findAll();

        List<Item> matches = new ArrayList<>();

        for (Item myItem : myItems) {

            String oppositeType = myItem.getType().equals("LOST") ? "FOUND" : "LOST";

            for (Item item : allItems) { //Item is class. item is one object.

                if (item.getUser() == null) continue;

                // ❌ Skip same user
                if (item.getUser().getEmail().equals(email)) continue;

                // ❌ Skip wrong type
                if (item.getType() == null || !item.getType().equals(oppositeType)) continue;

                // ❌ Skip different category
                if ((item.getCategory() == null || !item.getCategory().equalsIgnoreCase(myItem.getCategory()))) continue;

                //Scoring system
                int score = 0;

                // ✅ Description match
                if (item.getDescription() != null && myItem.getDescription() != null) {
                    if (item.getDescription().toLowerCase()
                            .contains(myItem.getDescription().toLowerCase())) {
                        score++;
                    }
                }

                // ✅ Location match
                if (item.getLocation() != null && myItem.getLocation() != null) {
                    if (item.getLocation().equalsIgnoreCase(myItem.getLocation())) {
                        score++;
                    }
                }

                // ✅ Date match (optional)
                if (item.getDate() != null && myItem.getDate() != null) {
                    if (item.getDate().equals(myItem.getDate())) {
                        score++;
                    }
                }

                // 🔥 Only accept good matches
                if (score >= 1) {   // you can change to 2 for stricter match
                    matches.add(item);
                }
            }
        }

        return matches;
    }

    // add Stats
    public Map<String,Object> getStats(String email){

        List<Item> items = itemRepository.findByUser_Email(email);

        long lost = items.stream().filter(i -> i.getType().equals("LOST")).count();
        long found = items.stream().filter(i -> i.getType().equals("FOUND")).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalReports", items.size());
        stats.put("lost", lost);
        stats.put("found", found);

        return stats;
    }

}

