package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.SavedProperty;

import java.util.List;

public interface OfferService {
    void submitOffer(String remark, Member customer, long propertyId);
    void acceptOffer(long offerId);
    List<Property> getSavedList(Member customer);
    List<Offer> getOfferHistoryForMember(Member customer);
    List<Offer> getOfferHistoryForProperty(Property property);
    void removeFromSavedList(Member customer, SavedProperty savedProperty);
    public void addToSavedList(Member customer, SavedProperty savedProperty);
    void cancelOffer(long offerId);
}
