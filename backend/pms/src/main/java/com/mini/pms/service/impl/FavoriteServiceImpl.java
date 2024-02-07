package com.mini.pms.service.impl;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Favorite;
import com.mini.pms.entity.Member;
import com.mini.pms.entity.Property;
import com.mini.pms.repo.FavoriteRepo;
import com.mini.pms.service.FavoriteService;
import com.mini.pms.service.MemberService;
import com.mini.pms.service.PropertyService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {
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

        var existingFav = favoriteRepo.findByMemberAndProperty(member, property);

        if (existingFav.isPresent()) {
            throw new PlatformException("Favorite already exist", HttpStatus.BAD_REQUEST);
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
    @Transactional
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

    public Favorite findFavoriteByMemberAndProperty(Member member, Property property) {
        return favoriteRepo.findByMemberAndProperty(member, property)
                .orElseThrow(() -> new PlatformException("Not Found", HttpStatus.NOT_FOUND));
    }


}
