package com.supun.lostfound.repository;

import com.supun.lostfound.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByType(String type);
    List<Item> findByUser_Email(String email);

}