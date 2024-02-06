package com.mini.pms.service.impl;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.SavedProperty;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.repo.SavedPropertyRepo;
import com.mini.pms.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OfferServiceImpl implements OfferService {

    private final OfferRepo offerRepo;
    private final PropertyRepo propertyRepo;
    private final SavedPropertyRepo savedPropertyRepo;

    @Autowired
    public OfferServiceImpl(OfferRepo offerRepo, PropertyRepo propertyRepo, SavedPropertyRepo savedPropertyRepo) {
        this.offerRepo = offerRepo;
        this.propertyRepo = propertyRepo;
        this.savedPropertyRepo = savedPropertyRepo;
    }
    @Override
    public void submitOffer(String remark, Member customer, long propertyId) {
        Optional<Property> optionalProperty = propertyRepo.findById(propertyId);
        if (optionalProperty.isPresent()) {

            // Create an Offer entity
            Offer offer = Offer.builder()
                    .remark(remark)
                    .customer(customer)
                    .property(optionalProperty.get())
                    .status(OfferStatus.PENDING)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            // Save the offer to the database
            offerRepo.save(offer);
        }
        // Error handling here

    }

    @Override
    public void acceptOffer(long offerId) {
        Optional<Offer> optionalOffer = offerRepo.findById(offerId);
        if (optionalOffer.isPresent()) {
            Offer offer = optionalOffer.get();
            // This should be as long as the offer is accepted by the owner too
            offer.setStatus(OfferStatus.AGREED); // why did we change the status names @Deng
            offerRepo.save(offer);

            // Update property status to 'pending'
            Property property = offer.getProperty();
            property.setStatus(PropertyStatus.ACTIVE);// we need to check these status changes
            propertyRepo.save(property);
        }
//        We need to creat a class that handles the OfferNotFoundException
//        else {
//            throw new OfferNotFoundException("Offer with ID " + offerId + " not found.");
//        }
    }

    @Override
    public void addToSavedList(Member customer, SavedProperty savedProperty) {
        // Add property to customer's saved list
        //savedPropertyRepo.save(customer, property);
    }

    @Override
    public void cancelOffer(long offerId) {
        Optional<Offer> optionalOffer = offerRepo.findById(offerId);
        if (optionalOffer.isPresent()) {
            Offer offer = optionalOffer.get();

            //  checking if the offer status is not 'contingency'
            if (!offer.getStatus().equals(OfferStatus.AGREED)) {
                offerRepo.delete(offer);
            } else {
                throw new IllegalStateException("Cannot cancel offer in contingency status.");
            }
        } else {
            // throw new OfferNotFoundException("Offer with ID " + offerId + " not found.");
        }
    }

    @Override
    public void removeFromSavedList(Member customer, SavedProperty savedProperty) {
        // Remove property from customer's saved list
        savedPropertyRepo.delete(customer, savedProperty);
    }

    @Override
    public List<Property> getSavedList(Member customer) {
        // Pull saved properties for the customer
        return null;
    }

    @Override
    public List<Offer> getOfferHistoryForMember(Member customer) {
        return offerRepo.findOfferByCustomerOrderedByCreatedAtDesc(customer);
    }

    @Override
    public List<Offer> getOfferHistoryForProperty(Property property) {
        return offerRepo.findOfferByPropertyOrderedByCreatedAtDesc(property);
    }
}
