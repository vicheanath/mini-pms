package com.mini.pms;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.PropertyCategory;
import com.mini.pms.entity.type.PropertyType;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;

@SpringBootApplication
public class PmsApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(PmsApplication.class, args);
    }

    @Autowired PropertyRepo propertyRepo;

    @Autowired MemberRepo memberRepo;

    @Autowired OfferRepo offerRepo;

    void createProperty() {
        var owner =
                memberRepo
                        .findByEmail("b@b.com")
                        .orElseThrow(
                                () -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        var prop =
                Property.builder()
                        .title("Renting a home")
                        .category(PropertyCategory.HOME)
                        .type(PropertyType.SELL)
                        .latitude(10d)
                        .longitude(20d)
                        .location("ABC")
                        .numberOfRoom(3)
                        .price(3000)
                        .owner(owner)
                        .build();

        propertyRepo.save(prop);
    }

    void createOffer() {
        var prop = propertyRepo.findById(1l).orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
        var customer = memberRepo.findByEmail("c@c.com").orElseThrow(() -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
        var offer = Offer.builder()
                .remark("Hello")
                .property(prop)
                .customer(customer)
                .build();

        offerRepo.save(offer);
    }

    @Override
    public void run(String... args) throws Exception {
        createProperty();
        createOffer();
    }
}
