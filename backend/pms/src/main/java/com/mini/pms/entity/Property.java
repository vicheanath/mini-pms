package com.mini.pms.entity;

import com.mini.pms.entity.type.PropertyCategory;
import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
import com.mini.pms.entity.type.PropertyType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    
    String title;
    double price;
    String location;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "property")
    List<Picture> pictures;
    
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "property")
    @BatchSize(size = 10)
    List<Offer> offers;

    @ManyToOne(fetch = FetchType.EAGER)
    Member owner;

    @Enumerated(EnumType.STRING)
    PropertyCategory category;

    @Enumerated(EnumType.STRING)
    PropertyType type;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'Available'")
    PropertyOfferStatus offerStatus;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'ACTIVE'")
    PropertyStatus status;

    int numberOfRoom;

    double latitude;
    double longitude;

    @CreatedDate LocalDateTime createdAt;

    @LastModifiedDate LocalDateTime updatedAt;
}
