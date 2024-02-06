package com.mini.pms.service;

import java.util.List;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Property;
import com.mini.pms.restcontroller.request.AddFavoriteRequestDto;

public interface FavoriteService {
//    void addFavorite(long propertyId);
    void addFavorite(AddFavoriteRequestDto addFavoriteRequestDto);
    void removeFavorite(long propertyId);
    boolean isFavorite(long propertyId);
    List<Property> getFavoriteByMemberId(long memberId);
    List<Member> getFavoritePropertyId(long propertyId);
    List<Property> findFavoritesByMemberId(long memberId);

    //void unFavorite(long favoriteId);
    
}
