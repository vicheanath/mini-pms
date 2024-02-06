package com.mini.pms.repo;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;

import com.mini.pms.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Long> {
    @Query("select o from Offer o where o.customer = :customer order by o.createdAt desc")
    List<Offer> findOfferByCustomerOrderedByCreatedAtDesc(@Param("customer") Member customer);
    @Query("select o from Offer o where o.property = :property order by o.createdAt desc")
    List<Offer> findOfferByPropertyOrderedByCreatedAtDesc(@Param("property") Property property);
    //
}
