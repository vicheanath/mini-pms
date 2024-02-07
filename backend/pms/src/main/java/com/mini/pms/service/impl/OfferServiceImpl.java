package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.restcontroller.response.OfferResponse;
import com.mini.pms.service.OfferService;
//import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public Page<Offer> getAllOffersByCustomer(long customerID, Pageable pageable) {
        return offerRepo.findAllOffersByCustomer(customerID, pageable);
    }

    @Override
    public Page<Offer> getAllOffersForProperty(long propertyID, Pageable pageable) {
        return offerRepo.findAllOffersByProperty(propertyID, pageable);
    }

    @Override
    public Page<Offer> getOffersForPropertyByStatus(long propertyID, String status, Pageable pageable) {
        return offerRepo.findAllByPropertyAndStatus(propertyID, status, pageable);
    }

    @Override
    public Page<Offer> findAllByCustomerAndProperty_Status(long customerID, String status, Pageable pageable) {
        return offerRepo.findAllByCustomerAndProperty_Status(customerID, status, pageable);
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
    public Offer findById(long offerId) {
        return offerRepo
                .findById(offerId)
                .orElseThrow(() -> new PlatformException("Offer not found", HttpStatus.NOT_FOUND));
    }

//    @Override
//    public Page<Offer> getAllOffers(Pageable pageable) {
//        return offerRepo.findAll(pageable);
//    }

    // OfferResponse
    @Override
    public Page<OfferResponse> getAllOffers(Pageable pageable) {
        Page<Offer> offers = offerRepo.findAll(pageable);
        return offers.map(this::mapToOfferResponse);
    }

    private OfferResponse mapToOfferResponse(Offer offer) {
        OfferResponse offerResponse = new OfferResponse();
        offerResponse.setId(offer.getId());
        offerResponse.setCustomerId(offer.getCustomer().getId());
        offerResponse.setPropertyId(offer.getProperty().getId());
        offerResponse.setRemark(offer.getRemark());
        offerResponse.setStatus(offer.getStatus().toString()); // Assuming OfferStatus is an enum
        return offerResponse;
    }

}
