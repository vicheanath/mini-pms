package com.mini.pms.restcontroller;

import com.mini.pms.entity.Member;
import com.mini.pms.entity.Offer;
import com.mini.pms.entity.type.OfferStatus;
import com.mini.pms.entity.Property;
import com.mini.pms.restcontroller.request.OfferSubmissionRequest;
import com.mini.pms.restcontroller.response.OfferResponse;
import com.mini.pms.restcontroller.response.PageResponse;
import com.mini.pms.service.MemberService;
import com.mini.pms.service.OfferService;
import com.mini.pms.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Page<OfferResponse>> getAllOffers(
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        Page<OfferResponse> offerResponses = offerService.getAllOffers(pageable);
        return new ResponseEntity<>(offerResponses, HttpStatus.OK);
    }


    @PostMapping("/submit")
    public ResponseEntity<?> submitOffer
            (@Valid @RequestBody OfferSubmissionRequest request)
    {
        try {
            Member customer = memberService.findById(request.getCustomerId());
            Property property = propertyService.findById(request.getPropertyId());
            String remark = request.getRemark();
            Offer submittedOffer = offerService.submitOffer(customer, property, remark);
            return new ResponseEntity<>(submittedOffer, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getAllOffersByCustomer(
            @PathVariable("customerId") long customerId,

            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Member customer = memberService.findById(customerId);
            Page<Offer> offers = offerService.getAllOffersByCustomer(customerId, pageable);
            return new ResponseEntity<>(new PageResponse(offers, OfferResponse.class), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<?> getAllOffersForProperty(
            @PathVariable("propertyId") long propertyId,
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Property property = propertyService.findById(propertyId);
            Page<Offer> offers = offerService.getAllOffersForProperty(propertyId, pageable);
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/property/{propertyId}/offer-status/{offerStatus}")
    public ResponseEntity<?> getOffersForPropertyByStatus(
            @PathVariable("propertyId") long propertyId,
            @PathVariable("offerStatus") String offerStatus,
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Property property = propertyService.findById(propertyId);
            Page<Offer> offers = offerService.getOffersForPropertyByStatus(propertyId, offerStatus, pageable);
            return new ResponseEntity<>(offers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/property/{customerID}/property-status/{propertyStatus}")
    public ResponseEntity<?> findAllByCustomerAndProperty_Status(
            @PathVariable("customerID") long propertyId,
            @PathVariable("propertyStatus") String propertyStatus,
            @PageableDefault(
                    size = 50,
                    direction = Sort.Direction.DESC,
                    sort = {"createdAt"}
            )
            Pageable pageable
    ) {
        try {
            Property property = propertyService.findById(propertyId);
            Page<Offer> offers = offerService.getOffersForPropertyByStatus(propertyId, propertyStatus, pageable);
            return new ResponseEntity<>(offers, HttpStatus.OK);
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

    @DeleteMapping("/cancel/{offerId}")
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
