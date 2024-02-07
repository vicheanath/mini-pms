package com.mini.pms.restcontroller.response;

import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyResponse {

    private long id;

    private String title;
    private double price;
    private String location;
    private String description;

    private List<String> pictures;
    private long ownerId;
    private String category;
    private String subCategory;
    private String type;

    private PropertyOfferStatus offerStatus;
    private PropertyStatus status;
    private int numberOfRoom;
    private double latitude;
    private double longitude;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isFavorite;

}
