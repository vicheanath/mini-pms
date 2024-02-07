package com.mini.pms;

import com.mini.pms.customexception.PlatformException;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.PropertyCategory;
import com.mini.pms.entity.type.PropertyType;
import com.mini.pms.repo.MemberRepo;
import com.mini.pms.repo.OfferRepo;
import com.mini.pms.repo.PropertyRepo;
import com.mini.pms.restcontroller.request.ForgotPasswordRequest;
import com.mini.pms.service.AuthService;
import com.mini.pms.service.EmailService;
import com.mini.pms.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;

import java.util.Random;
import java.util.stream.Stream;

@SpringBootApplication
public class PmsApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(PmsApplication.class, args);
    }

    @Autowired
    PropertyRepo propertyRepo;

    @Autowired
    MemberRepo memberRepo;

    @Autowired
    OfferRepo offerRepo;

    @Autowired
    EmailService emailService;

    @Autowired
    AuthService authService;

    @Autowired
    MemberService memberService;

    void createProperty() {
        var owner =
                memberRepo
                        .findByEmail("b@b.com")
                        .orElseThrow(
                                () -> new PlatformException("Not found", HttpStatus.NOT_FOUND));

        var props =
                Stream.generate(() -> {
                    return Property.builder()
                            .title("Renting a home")
                            .category(
                                    PropertyCategory.values()[new Random().nextInt(0, 3)].name()
                            )
                            .type(
                                    PropertyType.values()[new Random().nextInt(0, 1)].name()
                            )
                            .latitude(10d)
                            .longitude(20d)
                            .location("ABC")
                            .numberOfRoom(new Random().nextInt(2, 10))
                            .price(new Random().nextDouble(100, 3000))
                            .owner(owner)
                            .build();
                }).limit(30).toList();


        propertyRepo.saveAll(props);
    }

    void createOffer() {
        var prop =
                propertyRepo
                        .findById(1L)
                        .orElseThrow(
                                () -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
        var customer =
                memberRepo
                        .findByEmail("c@c.com")
                        .orElseThrow(
                                () -> new PlatformException("Not found", HttpStatus.NOT_FOUND));
        var offer = Offer.builder().remark("Hello").property(prop).customer(customer)
                .price(3000)
                .build();

        offerRepo.save(offer);
    }

    @Override
    public void run(String... args) throws Exception {
        createProperty();
        createOffer();


        //        emailService.sendSimpleMail(
        //                "Hello Everyone", "Hi Dear, How are you?", "dengbunthai@gmail.com");

        var f = new ForgotPasswordRequest();
        f.setEmail("dengbunthai@gmail.com");
        memberService.forgotPassword(f);
    }
}
