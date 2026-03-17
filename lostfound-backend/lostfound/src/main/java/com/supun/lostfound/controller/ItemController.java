package com.supun.lostfound.controller;

import com.supun.lostfound.dto.ItemRequest;
import com.supun.lostfound.entity.Item;
import com.supun.lostfound.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public Item createItem(@RequestBody ItemRequest request){
        return itemService.createItem(request);
    }

    @GetMapping
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping("/lost")
    public List<Item> lostItems(){
        return itemService.getLostItems();
    }

    @GetMapping("/found")
    public List<Item> foundItems(){
        return itemService.getFoundItems();
    }
}