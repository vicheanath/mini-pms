package com.mini.pms.service.impl;
import java.util.List;
import java.util.stream.Collectors;

import com.mini.pms.customexception.MemberNotFoundException;
import com.mini.pms.customexception.PropertyNotFoundException;
import com.mini.pms.entity.Favorite;
import com.mini.pms.restcontroller.request.AddFavoriteRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.Member;
import com.mini.pms.repo.FavoriteRepo;
import com.mini.pms.service.FavoriteService;
import com.mini.pms.service.MemberService;
import com.mini.pms.service.PropertyService;

@Service
public class FavoriteServiceImpl implements FavoriteService{
    @Autowired
    private FavoriteRepo favoriteRepo;
    @Autowired
    private MemberService memberService;
    @Autowired
    private PropertyService propertyService;
    @Override
    public void addFavorite(long propertyId, long memberId) {
        // Retrieve the Member and Property entities using the IDs provided in the DTO
        Member member = memberService.findById(memberId);
        Property property = propertyService.findById(propertyId);
        // Check if the member exists
        if (member == null) {
            throw new MemberNotFoundException("Member with ID " + memberId + " not found.");
        }
        // Check if the property exists
        if (property == null) {
            throw new PropertyNotFoundException("Property with ID " + propertyId + " not found.");
        }
        // At this point, both member and property exist
        // Create a new Favorite entity and set its member and property
        Favorite favorite = new Favorite();
        favorite.setMember(member);
        favorite.setProperty(property);

        // Save the new Favorite entity to the repository
        favoriteRepo.save(favorite);
    }

    @Override
    public void removeFavorite(long propertyId, long memberId) {
        Member member = memberService.profile(memberId);
        Property property = propertyService.findById(propertyId);
        favoriteRepo.deleteByMemberAndProperty(member, property);
    }

    @Override
    public boolean isFavorite(long propertyId) {
        Member member = memberService.profile(propertyId);
        Property property = propertyService.findById(propertyId);
        return favoriteRepo.existsByMemberAndProperty(member, property);
    }

    @Override
    public List<Property> getFavoriteByMemberId(long memberId) {
        return favoriteRepo.findFavoritePropertyByMemberId(memberId);
    }

    @Override
    public List<Member> getFavoritePropertyId(long propertyId) {
        return favoriteRepo.findFavoritesUsersByPropertyId(propertyId);
    }
    @Override
    public List<Property> findFavoritesByMemberId(long memberId) {
        List<Favorite> favorites = favoriteRepo.findByMemberId(memberId);
        return favorites.stream()
                .map(Favorite::getProperty)
                .collect(Collectors.toList());
    }

//    @Override
//     public void unFavorite(long favoriteId) {
//         favoriteRepo.deleteById(favoriteId);
//     }

    
}
