package application.service;

import application.model.Customer;
import application.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public String saveCustomer(Customer customer) {
        customerRepository.save(customer);
        return "customer has been added successfully";
    }

    @Override
    public void saveListOfCustomers(List<Customer> customers) {
        for (Customer c : customers) {
            saveCustomer(c);
        }
    }

    @Override
    public List<Customer> retrieveAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public String updateCustomer(Customer customer) {

        customerRepository.save(customer);

        return null;
    }


}
