package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;

import java.util.List;

public interface OfferService {

    // Method to submit an offer for a property
    Offer submitOffer(Member customer, Property property, String remark);

    // Method to get all offers made by a specific customer
    List<Offer> getAllOffersByCustomer(Member customer);

    // Method to get all offers for a specific property
    List<Offer> getAllOffersForProperty(Property property);

    // Method to get all offers for a property with a specific status
    List<Offer> getOffersForPropertyByStatus(Property property, OfferStatus status);

    // Method to accept an offer and change the property status to 'pending'
    void acceptOffer(Offer offer);

    // Method to reject an offer
    void rejectOffer(Offer offer);

    // Method to cancel an offer (if allowed based on 'contingency')
    void cancelOffer(Offer offer);
    Offer findById(long offerId);
}
