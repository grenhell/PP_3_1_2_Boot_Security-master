package ru.kata.spring.boot_security.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Set;
@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    private Long id;
    private String name;

    @JsonBackReference
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;


    public Role() {
    }

    public Role(Long id) {
        this.id = id;
    }

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    @Override
    public String toString (){
        return this.name.substring(5);
    }

}
