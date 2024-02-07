package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
import com.mini.pms.restcontroller.response.OfferResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OfferService {

    // Method to submit an offer for a property
    Offer submitOffer(Member customer, Property property, String remark);

    // Method to get all offers made by a specific customer
    Page<Offer> getAllOffersByCustomer(long customerID, Pageable pageable);

    // Method to get all offers for a specific property
    Page<Offer> getAllOffersForProperty(long propertyID, Pageable pageable);

    // Method to get all offers for a property with a specific status
    Page<Offer> getOffersForPropertyByStatus(long propertyID, String status, Pageable pageable);
    Page<Offer> findAllByCustomerAndProperty_Status(long customerID, String status, Pageable pageable);

    // Method to accept an offer and change the property status to 'pending'
    void acceptOffer(Offer offer);

    // Method to reject an offer
    void rejectOffer(Offer offer);

    // Method to cancel an offer (if allowed based on 'contingency')
    void cancelOffer(Offer offer);
    Offer findById(long offerId);
    Page<OfferResponse> getAllOffers(Pageable pageable);
}
