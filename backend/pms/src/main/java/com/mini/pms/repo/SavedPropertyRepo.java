package com.mini.pms.repo;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.SavedProperty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedPropertyRepo extends JpaRepository<SavedPropertyRepo, Long> {
    void save(Member customer, Property property);

    void delete(Member customer, SavedProperty savedProperty);
}
