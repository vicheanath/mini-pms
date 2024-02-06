package com.mini.pms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SavedProperty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Member customer;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    public SavedProperty(Member customer, Property property) {
        this.customer = customer;
        this.property = property;
    }
}
