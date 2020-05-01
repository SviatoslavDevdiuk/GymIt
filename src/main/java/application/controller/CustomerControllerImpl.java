package application.controller;

import application.model.Customer;
import application.service.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerControllerImpl {

    @Autowired
    CustomerServiceImpl service;


    @PostMapping("/customers/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {
        service.updateCustomer(customer);

        return ResponseEntity.ok(customer);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> retrieveAllCustomers() {
        List<Customer> customers = service.retrieveAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @PostMapping("/customers/saveCustomer")
    public ResponseEntity<?> saveCustomer(@RequestBody Customer customer) {
        System.out.println(customer.toString());

        service.saveCustomer(customer);
        System.out.println(customer.toString());
        return ResponseEntity.ok(customer);
    }

    @PostMapping("/customers/saveCustomers")
    public ResponseEntity<?> saveCustomerList(@RequestBody List<Customer> customers) {
        service.saveListOfCustomers(customers);
        return ResponseEntity.ok(customers);

    }

    @DeleteMapping(value = "/customers/{id}/delete")
    public void deleteCustomer(@PathVariable Long id) {
        service.deleteCustomer(id);
        System.out.println("user deleted successfully!");
    }

//    @RequestMapping("/")
//    public String homePage() {
//        return "home.html";
//    }


}
