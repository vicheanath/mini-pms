package com.mini.pms.entity;

import com.mini.pms.entity.type.PropertyCategory;
import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
import com.mini.pms.entity.type.PropertyType;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
@DynamicUpdate
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private double price;
    private String location;
    private String description;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "property")
    private List<Picture> pictures;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "property")
    @BatchSize(size = 10)
    private List<Offer> offers;

    @ManyToOne(fetch = FetchType.EAGER)
    private Member owner;

    @Enumerated(EnumType.STRING)
    private PropertyCategory category;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'AVAILABLE'")
    private PropertyOfferStatus offerStatus;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'ACTIVE'")
    private PropertyStatus status;

    private int numberOfRoom;

    private double latitude;
    private double longitude;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
