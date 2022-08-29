package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {
    @Autowired
    private final UserService userService;


    public RestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> apiAllUsers() {
        List <User> userList = userService.findAll();
        return userList != null &&  !userList.isEmpty()
                ? new ResponseEntity<>(userList, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> apiReadUser(@PathVariable(name = "id") Long id) {
         User user = userService.findById(id);

        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }



    @PostMapping("/users")
    public ResponseEntity<User> apiAddUser(@RequestBody User user,
                                           @RequestParam(value = "inputRoles",
                                                   required = false) Long[] inputRoles) {
        Set<Role> roleHashSet = new HashSet<>();
        for (Long i : inputRoles) {
            roleHashSet.add(userService.findRoleById(i));
        }
        user.setRoles(roleHashSet);
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/users")
    public ResponseEntity<User> apiUpdateUser(@RequestBody User user,
                                              @RequestParam(value = "inputRoles",
                                                      required = false) Long[] inputRoles) {
        Set<Role> roleHashSet = new HashSet<>();
        for (Long i : inputRoles) {
            roleHashSet.add(userService.findRoleById(i));
        }
        user.setRoles(roleHashSet);
        userService.updateById(user, user.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> apiDeleteUser(@PathVariable("id") long id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //ROLES CONTROLLER

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return userService.getAllRoles();
    }

    @GetMapping("/user")
    public User getAuthUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.findByEmail(userDetails.getUsername());
    }

}
