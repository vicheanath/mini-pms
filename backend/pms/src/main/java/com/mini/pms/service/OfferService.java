package com.mini.pms.service;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;

import java.util.List;

public interface OfferService {
    void submitOffer(String remark, Member customer, long propertyId);

    List<Offer> getOfferHistoryForMember(Member customer);

    List<Offer> getOfferHistoryForProperty(Property property);
}
