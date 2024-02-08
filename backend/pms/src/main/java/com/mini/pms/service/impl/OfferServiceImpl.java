package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Offer submitOffer(Member customer, Property property, double price, String remark) {
        try {
            Offer offer = new Offer();
            offer.setCustomer(customer);
            offer.setProperty(property);
            offer.setRemark(remark);
            offer.setPrice(price);
            offer.setStatus(OfferStatus.PENDING);
            return offerRepo.save(offer);
        } catch (DataAccessException ex) {
            // Log exception and throw custom exception or return null
            ex.fillInStackTrace();
            throw new RuntimeException(ex.getMessage());
        }
    }

    @Override
    public Page<Offer> getAllOffersByCustomer(Member customer, Pageable pageable) {
        return offerRepo.findAllOffersByCustomer(customer, pageable);
    }

    @Override
    public Page<Offer> getAllOffersForProperty(Property property, Pageable pageable) {
        return offerRepo.findAllOffersByProperty(property, pageable);
    }

    @Override
    public Page<Offer> getOffersForPropertyByStatus(Property property, OfferStatus status, Pageable pageable) {
        return offerRepo.findAllByPropertyAndStatus(property, status, pageable);
    }

    @Override
    @Transactional(rollbackFor = DataAccessException.class)
    public void acceptOffer(Offer offer) {
        try {
            offer.setStatus(OfferStatus.ACCEPTED);
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
            offer.setStatus(OfferStatus.CANCELED);
            offerRepo.save(offer);
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
    public Offer findById(long offerId) {
        return offerRepo
                .findById(offerId)
                .orElseThrow(() -> new PlatformException("Offer not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<Offer> getAllOffers(Pageable pageable) {
        return offerRepo.findAll(pageable);
    }
}
