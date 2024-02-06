package com.mini.pms.restcontroller;

import com.mini.pms.entity.Property;
import com.mini.pms.restcontroller.request.AddFavoriteRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mini.pms.service.FavoriteService;

import java.util.List;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

     @PostMapping("/add")
        public void addFavorite(@RequestBody AddFavoriteRequestDto addFavoriteRequestDto) {
            favoriteService.addFavorite(addFavoriteRequestDto);
        }

        @PostMapping("/remove")
        public void removeFavorite(long propertyId) {
            favoriteService.removeFavorite(propertyId);
        }

        @PostMapping("/isFavorite")
        public boolean isFavorite(long propertyId) {
            return favoriteService.isFavorite(propertyId);
        }

        @PostMapping("/getFavoriteByMemberId")
        public void getFavoriteByMemberId(long memberId) {
            favoriteService.getFavoriteByMemberId(memberId);
        }

        @PostMapping("/getFavoritePropertyId")

        public void getFavoritePropertyId(long propertyId) {
            favoriteService.getFavoritePropertyId(propertyId);
        }
    @GetMapping("/listFavorites/{memberId}")
    public List<Property> listFavoritesByMemberId(@PathVariable long memberId) {
        return favoriteService.findFavoritesByMemberId(memberId);
    }

        // @PostMapping("/unFavorite")
        // public void unFavorite(long favoriteId) {
        //     favoriteService.unFavorite(favoriteId);
        // }
    
}
