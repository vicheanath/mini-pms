package com.mini.pms.service.impl;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.service.OfferService;
//import jakarta.transaction.Transactional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferServiceImpl implements OfferService {

    private final OfferRepo offerRepo;
    private final PropertyRepo propertyRepo;

    @Autowired
    public OfferServiceImpl(OfferRepo offerRepo, PropertyRepo propertyRepo) {
        this.offerRepo = offerRepo;
        this.propertyRepo = propertyRepo;
    }

    @Override
    @Transactional(rollbackFor = DataAccessException.class)
    public Offer submitOffer(Member customer, Property property, String remark) {
        try {
            Offer offer = new Offer();
            offer.setCustomer(customer);
            offer.setProperty(property);
            offer.setRemark(remark);
            offer.setStatus(OfferStatus.PENDING);
            return offerRepo.save(offer);
        } catch (DataAccessException ex) {
            // Log exception and throw custom exception or return null
            ex.fillInStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }

    @Override
    public List<Offer> getAllOffersByCustomer(Member customer) {
        return offerRepo.findAllOffersByCustomer(customer);
    }

    @Override
    public List<Offer> getAllOffersForProperty(Property property) {
        return offerRepo.findAllOffersByProperty(property);
    }

    @Override
    public List<Offer> getOffersForPropertyByStatus(Property property, OfferStatus status) {
        return offerRepo.findAllByPropertyAndStatus(property, status);
    }

    @Override
    @Transactional(rollbackFor = DataAccessException.class)
    public void acceptOffer(Offer offer) {
        try {
            offer.setStatus(OfferStatus.AGREED);
            // update property status to 'PENDING' here
            Property property = offer.getProperty();
            property.setOfferStatus(PropertyOfferStatus.PENDING);
            // Save the updated property status to the database
            propertyRepo.save(property);
            offerRepo.save(offer);
        } catch (DataAccessException ex) {
            // Log exception and throw custom exception or handle it accordingly
            ex.fillInStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }

    @Override
    public void rejectOffer(Offer offer) {
        offer.setStatus(OfferStatus.REJECTED);
        offerRepo.save(offer);
    }

    @Override
    @Transactional(rollbackFor = DataAccessException.class)
    public void cancelOffer(Offer offer) {
        // Customers can cancel an offer placed.
        // Customers cannot cancel an offer after 'contingency'

        if (isOfferCancelable(offer)) {
            // Offer can be canceled, delete it from the database
            offerRepo.delete(offer);
        } else {
            // Offer cannot be canceled due to 'contingency'
            throw new IllegalStateException("Offer cannot be canceled after 'contingency'.");
        }
    }

    // Method to check if an offer can be canceled based on its status ('contingency' or not)
    private boolean isOfferCancelable(Offer offer) {
        // Let's determine if offer can be canceled
        return offer.getProperty().getOfferStatus() != PropertyOfferStatus.CONTINGENT;
    }
    @Override
    public Offer findById(long offerId){
        Optional<Offer> optionalOffer = offerRepo.findById(offerId);
        return optionalOffer.orElse(null);
    }
}
