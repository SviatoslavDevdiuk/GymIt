package application.service;

import application.model.Customer;

import java.util.List;

public interface CustomerService {

    String saveCustomer(Customer customer);

    void saveListOfCustomers(List<Customer> customers);

    List<Customer> retrieveAllCustomers();

    void deleteCustomer(Long id);

    String updateCustomer(Customer customer);

}
