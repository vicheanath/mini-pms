package com.mini.pms.entity;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.pms.entity.type.PropertyOfferStatus;
import com.mini.pms.entity.type.PropertyStatus;
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
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Where;
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
@Where(clause = "status != 'DELETED'")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private double price;
    private String location;
    private String description;

    @JsonProperty
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "property")
    @JsonManagedReference
    private List<Picture> pictures;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "property")
    @BatchSize(size = 10)
    private List<Offer> offers;

    @ManyToOne(fetch = FetchType.EAGER)
    private Member owner;

    private String category;

    private String subCategory;

    private String type;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'AVAILABLE'")
    private PropertyOfferStatus offerStatus;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'ACTIVE'")
    private PropertyStatus status;

    private int numberOfRoom;

    private double latitude;
    private double longitude;

    @OneToMany(mappedBy = "property")
    List<Favorite> favorites;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @JsonGetter("pictures")
    public List<String> getPictures() {

        return pictures.isEmpty() ? List.of("https://photos.zillowstatic.com/fp/8352ff644b62e323d9697de553de11c7-cc_ft_768.webp"
                , "https://photos.zillowstatic.com/fp/8352ff644b62e323d9697de553de11c7-cc_ft_768.webp")

                : pictures.stream()
                .map(Picture::getUrl)
                .toList();

    }

    @Transient
    private boolean isFavorite;
}
