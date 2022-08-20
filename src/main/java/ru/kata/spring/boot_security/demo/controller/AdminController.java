package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String findAll (Model model){
        List <User> userList = userService.findAll();
        model.addAttribute("userlist", userList);
        return "users";

    }

    @GetMapping("/user/{id}")
    public String read(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userService.findById(id));
        return "/read";
    }

    @GetMapping("/user")
    public String home(Principal principal, Model model) {
        model.addAttribute("user",userService.findByUsername(principal.getName()));
        return "/read";
    }

    @GetMapping("/admin/{id}/edit")
    public String edit (Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.findById(id));
        return "/edit";
    }

    @PostMapping("/admin/{id}")
    public String update (@ModelAttribute("user") User user, @PathVariable("id") Long id) {
        userService.save(user);
        return "redirect:/admin";
    }
    @GetMapping("/admin/{id}/delete")
    public String delete(@PathVariable("id") Long id){
        userService.delete(id);
        return "redirect:/admin";
    }
}