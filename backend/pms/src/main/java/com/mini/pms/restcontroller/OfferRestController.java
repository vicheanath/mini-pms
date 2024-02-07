package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.Property;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.restcontroller.request.OfferSubmissionRequest;
import com.mini.pms.restcontroller.response.OfferResponse;
import com.mini.pms.restcontroller.response.PageResponse;
import com.mini.pms.service.MemberService;
import com.mini.pms.service.OfferService;
import com.mini.pms.service.PropertyService;
import com.mini.pms.util.Util;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/offers")
public class OfferRestController {
    private final OfferService offerService;
    private final MemberService memberService;
    private final PropertyService propertyService;

    @Autowired
    public OfferRestController
            (OfferService offerService, MemberService memberService, PropertyService propertyService)
    {
        this.offerService = offerService;
        this.memberService = memberService;
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<?> getAllOffers(
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        Page<Offer> offers = offerService.getAllOffers(pageable);
        return new ResponseEntity<>(new PageResponse(offers, OfferResponse.class), HttpStatus.OK);
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitOffer
            (@Valid @RequestBody OfferSubmissionRequest request)
    {
        try {
            Member customer = memberService.findById(request.getCustomerId());
            Property property = propertyService.findById(request.getPropertyId());
            String remark = request.getRemark();
            double price = request.getPrice();
            Offer submittedOffer = offerService.submitOffer(customer, property, price, remark);
            return new ResponseEntity<>(Util.mapObj(submittedOffer, OfferResponse.class), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getAllOffersByCustomer(
            @PathVariable long customerId,

            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Member customer = memberService.findById(customerId);
            Page<Offer> offers = offerService.getAllOffersByCustomer(customer, pageable);
            return new ResponseEntity<>(new PageResponse(offers, OfferResponse.class), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<?> getAllOffersForProperty(
            @PathVariable long propertyId,
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Property property = propertyService.findById(propertyId);
            Page<Offer> offers = offerService.getAllOffersForProperty(property, pageable);
            return new ResponseEntity<>(new PageResponse(offers, OfferResponse.class), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/property/{propertyId}/status/{status}")
    public ResponseEntity<?> getOffersForPropertyByStatus(
            @PathVariable long propertyId,
            @PathVariable OfferStatus status,
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Property property = propertyService.findById(propertyId);
            Page<Offer> offers = offerService.getOffersForPropertyByStatus(property, status, pageable);
            return new ResponseEntity<>(new PageResponse(offers, OfferResponse.class), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/accept/{offerId}")
    public ResponseEntity<?> acceptOffer(@PathVariable long offerId) {
        try {
            Offer offer = offerService.findById(offerId);
            offerService.acceptOffer(offer);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/reject/{offerId}")
    public ResponseEntity<?> rejectOffer(@PathVariable long offerId) {
        try {
            Offer offer = offerService.findById(offerId);
            offerService.rejectOffer(offer);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/cancel/{offerId}")
    public ResponseEntity<?> cancelOffer(@PathVariable long offerId) {
        try {
            Offer offer = offerService.findById(offerId);
            offerService.cancelOffer(offer);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
