package com.mini.pms.entity;

import com.mini.pms.entity.type.MemberStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String name;

    @Email
    @Column(unique = true)
    String email;

    String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")})
    List<Role> roles;

    @Enumerated(EnumType.STRING)
    @ColumnDefault(value = "'ACTIVE'")
    MemberStatus status;

    @OneToMany(mappedBy = "owner")
    List<Property> properties;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "customer")
    @BatchSize(size = 10)
    List<Offer> offers;

    @CreatedDate LocalDateTime createdAt;

    @LastModifiedDate LocalDateTime updatedAt;
}
