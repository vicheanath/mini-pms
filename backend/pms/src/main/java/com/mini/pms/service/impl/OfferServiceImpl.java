package com.mini.pms.service.impl;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void submitOffer(String remark, Member customer, long propertyId) {
        Optional<Property> optionalOffer = propertyRepo.findById(propertyId);
        if (optionalOffer.isPresent()) {

            // Create an Offer entity
            Offer offer = Offer.builder()
                    .remark(remark)
                    .customer(customer)
                    .property(optionalOffer.get())
                    .status(OfferStatus.PENDING)
                    .build();

            // Save the offer to the database
            offerRepo.save(offer);
        }
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
