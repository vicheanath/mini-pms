package com.mini.pms.repo;


import com.mini.pms.entity.Picture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictureRepo extends JpaRepository<Picture, Long> {
    //
    Optional<Picture> findByKey(String key);
}
