package com.mini.pms.repo;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;

import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Long> {

        // Method to get all offers made by a specific customer
        @Query("select o from Offer o where o.customer.id = :customerID order by o.createdAt desc")
        Page<Offer> findAllOffersByCustomer(@Param("customerID") long customerID, Pageable pageable);
        // Method to get all offers for a specific property
        @Query("select o from Offer o where o.property.id = :propertyID order by o.createdAt desc")
        Page<Offer> findAllOffersByProperty(@Param("propertyID") long propertyID, Pageable pageable);
        // Method to get all offers for a property with a specific status
        @Query("select o from Offer o where o.property.id= :propertyID and o.status = :status order by o.createdAt desc")
        Page<Offer> findAllByPropertyAndStatus(@Param("propertyID") long propertyID, @Param("status") String status, Pageable pageable);
        // Custom query method to find offers made by a customer for properties with a specific status
        @Query("select o from Offer o where o.customer.id = :customerID and o.property.offerStatus = :status order by o.createdAt desc ")
        Page<Offer> findAllByCustomerAndProperty_Status(@Param("customerID") long customerID, @Param("status") String status, Pageable pageable);
}
