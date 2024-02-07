package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface OfferService {

    @Transactional(rollbackFor = DataAccessException.class)
    Offer submitOffer(Member customer, Property property, double price, String remark);

    // Method to get all offers made by a specific customer
    Page<Offer> getAllOffersByCustomer(Member customer, Pageable pageable);

    // Method to get all offers for a specific property
    Page<Offer> getAllOffersForProperty(Property property, Pageable pageable);

    // Method to get all offers for a property with a specific status
    Page<Offer> getOffersForPropertyByStatus(Property property, OfferStatus status, Pageable pageable);

    // Method to accept an offer and change the property status to 'pending'
    void acceptOffer(Offer offer);

    // Method to reject an offer
    void rejectOffer(Offer offer);

    // Method to cancel an offer (if allowed based on 'contingency')
    void cancelOffer(Offer offer);
    Offer findById(long offerId);
    Page<Offer> getAllOffers(Pageable pageable);
}
