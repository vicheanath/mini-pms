package com.mini.pms.repo;

import com.mini.pms.entity.Offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Long> {
    //
}
