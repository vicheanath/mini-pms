package com.mini.pms.repo;


import com.mini.pms.entity.Picture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureRepo extends JpaRepository<Picture, Long> {
    //
}
