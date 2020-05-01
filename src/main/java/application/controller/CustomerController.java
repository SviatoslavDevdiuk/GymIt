package application.controller;

import application.model.Customer;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public interface CustomerController {

    ResponseEntity<?> saveCustomerList(@RequestBody List<Customer> customers);
}
