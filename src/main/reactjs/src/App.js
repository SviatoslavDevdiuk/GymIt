import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {history} from 'helpers';
import LoginForm from './LoginForm/LoginForm';
import Users from './Users/Users'
import {Button, FormControl, FormGroup, FormLabel, Dropdown, DropdownButton} from "react-bootstrap";
import {cloneDeep} from "lodash";
import About from './About/About';
import './User/NewUser.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Editor from "./Editor/Editor";
import {Alert} from "./components";
import {alertService} from "./servicess";

const ERROR_MESSAGE = "Your email or password is incorrect";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            user: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                address: {
                    street: '',
                    streetNumber: '',
                    city: '',
                    country: ''
                },
                phoneNumber: '',
                accountNumber: ''
            },
            inputEmail: "",
            inputPassword: "",
            credentialsValid: false,
            showModal: false,
            editUser: false,
            users: [],
            filteredUsers: [],
            filterBy: 'Search by first name',
            autoClose: true,
            keepAfterRouteChange: false
        };
    }


    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        fetch('/customers', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET'
        }).then(response => {
            return response.json()
        }).then(data => {
            this.setState({users: this.mapCustomersData(data)});
            this.setState({filteredUsers: this.state.users});
        }).catch(error => console.log("Error" + error));
    };
    mapCustomersData = (data) => {
        let customers = [];
        for (let j = 0; j < data.length; j++) {
            let tempId = data[j].id;
            let tempFirstName = data[j].firstName;
            let tempLastName = data[j].lastName;
            let tempEmail = data[j].email;
            let tempAddress = data[j].address;
            let tempPhoneNumber = data[j].phoneNumber;
            let tempAccountNumber = data[j].accountNumber;
            customers.push(
                {
                    'id': tempId,
                    'firstName': tempFirstName,
                    'lastName': tempLastName,
                    'email': tempEmail,
                    'address': tempAddress,
                    'phoneNumber': tempPhoneNumber,
                    'accountNumber': tempAccountNumber

                }
            );

        }

        return customers;
    };

    mockUsers = () => {
        const firstNames = ['John', 'James', 'Artur', 'Jonas', 'Ben', 'Emma', 'Mia', 'Hannah', 'Sofia',
            'Luis', 'Felix', 'Clara', 'Marie', 'Oskar', 'Luca', 'Emily'];
        const lastNames = ['Fischer', 'Schmidt', 'Smith', 'Wagner', 'Schulz', 'Weber', 'Hoffmann', 'Brown', 'Jones',
            'Wilson', 'Johnson', 'Morris', 'Price', 'Hill', 'Bell', 'Garsia', 'Parker', 'Turner'];
        const emails = ['@gmail.com', '@yahoo.com', '@rambler.com', '@onet.pl', '@meta.ua', '@outlook.com',
            '@icloud.com', '@gmx.com', '@proton.com', '@zoho.com'];
        const phoneNumbers = ['+49 152 901820', '+49 948 230204', '+49 934 390548', '+49 334 2038492', '+49 490 433423', '+49 434 234122',
            '+49 911 203942', '+49 632 954234', '+49 023 342341', '+49 435 345345'];
        const accountNumbers = ['89 3704 0044 0532 0130 00', '89 3434 3545 2344 2345 00', '89 3242 5445 7867 6573 00', '89 5434 2123 2342 2134 00',
            '89 3242 7657 8787 5464 00', '89 0298 2344 1233 5343 00', '89 2342 2341 4543 4343 00', '89 0298 2344 1232 4333 00'];
        const streets = ['Haupstrasse', 'Schulstrasse', 'Bahnhofstrasse', 'Beethhovenstrasse', 'Goethestrasse', 'Schillerstrasse',
            'Dorfstrasse', 'Lindenstraße', 'Mozartstrasse', 'Gartenstrasse'];
        const streetNumbers = ['12', '23', '53', '189', '56', '86', '65', '92', '73', '69', '95'];
        const cities = ['Hamburg', 'Stuttgart', 'Dresden', 'Frankfurt am Main', 'Hanover', 'Dortmund', 'Munich', 'Leipzig', 'Bremen', 'Kiel'];
        let tempFirstName = '';
        let tempLastName = '';
        let tempEmail = '';
        // let tempAddress = '';
        let tempPhoneNumber = '';
        let tempAccountNumber = '';
        let tempStreet = '';
        let tempNumber = '';
        let tempCity = '';
        let mockUsers = [];
        let i = 0;
        for (i; i < 500; i++) {
            tempFirstName = firstNames[Math.floor((Math.random() * firstNames.length))];
            tempLastName = lastNames[Math.floor((Math.random() * lastNames.length))];
            tempEmail = (tempFirstName + "." + tempLastName).toLowerCase() +
                emails[(Math.floor(Math.random() * emails.length))];
            tempStreet = streets[Math.floor((Math.random() * streets.length))];
            tempNumber = streetNumbers[Math.floor((Math.random() * streetNumbers.length))]
            tempCity = cities[Math.floor((Math.random() * cities.length))];
            let tempAddress = {street: tempStreet, streetNumber: tempNumber, city: tempCity, country: 'Germany'};
            tempPhoneNumber = phoneNumbers[Math.floor((Math.random() * phoneNumbers.length))];
            tempAccountNumber = accountNumbers[Math.floor((Math.random() * accountNumbers.length))];
            mockUsers.push({
                'firstName': tempFirstName,
                'lastName': tempLastName,
                'email': tempEmail,
                'address': tempAddress,
                'phoneNumber': tempPhoneNumber,
                'accountNumber': tempAccountNumber
            });
        }

        fetch("customers/saveCustomers", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(mockUsers),
        })
            .then(res => res.json())
            .then(data => {
                console.log(mockUsers);
                console.log(data);
            });


        return mockUsers;
    };

    credentialsValidator = () => {
        this.state.inputEmail === 'admin@coba.com' && this.state.inputPassword === '12345'
            ? this.setState({credentialsValid: true})
            : alert(ERROR_MESSAGE);
    };

    setInputValueForUser = (event, fieldName) => {
        const user = cloneDeep(this.state.user);
        user[fieldName] = event.target.value;

        this.setState({user});
        console.log(fieldName, event.target.value)
    };
    setInputValueForAddress = (event, fieldName) => {
        const address = cloneDeep(this.state.user.address);
        address[fieldName] = event.target.value;
        const user = cloneDeep(this.state.user);
        user.address = address;
        this.setState({user});
        console.log(fieldName, event.target.value)
    };

    showModal = () => {
        this.setState({showModal: true});
    };

    deletePersonHandler = (id) => {
        const {autoClose, keepAfterRouteChange} = this.state;
        let url = "/customers/" + id + "/delete";
        fetch(url, {
            method: 'DELETE',
            dataType: 'json'
        }).then(data => {
            console.log(data);
            this.componentDidMount();
        });
            alertService.info('deleted successfully',{autoClose,keepAfterRouteChange})
    };

    addUser = () => {
        const user = cloneDeep(this.state.user);
        fetch('customers/saveCustomer', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user),


        }).then(response => {
            response.json()
        }).then(data =>
            console.log(data)).catch(err => {
            console.log("Error: " + err);
        });
        this.componentDidMount();

        this.setState({
            showModal: false
        });
        this.cleanUserInputFields();
    };

    cleanUserInputFields = () => {
        this.setState({
            user: {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                phoneNumber: '',
                accountNumber: ''
            }
        });
    };

    initializeEditing = (user, index) => {
        user.index = index;
        this.setState({user: user});
        // this.setState({user: {index: index}});
        this.setState({editUser: true});

    };

    changeUserData = (user) => {
        fetch("customers/update", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user),
        }).then(response => {
            response.json()
        }).then(data => console.log(data)).catch(err => {
            console.log(err)
        });
        this.setState({editUser: false});
        this.componentDidMount();
        this.cleanUserInputFields();
    };

    changeCurrentPage = (number) => {
        this.setState({currentPage: number});
    };

    openPrevPage = () => {
        let page = cloneDeep(this.state.currentPage);
        --page;
        this.setState({currentPage: page})

    };

    openNextPage = () => {
        let page = cloneDeep(this.state.currentPage);
        ++page;
        this.setState({currentPage: page})

    };

    filterUsers = (search) => {
        switch (this.state.filterBy) {
            case "Search by first name":
                console.log(this.state.users);
                this.setState({
                    filteredUsers: cloneDeep(this.state.users)
                        .filter((customer) => {
                            return customer.firstName.toLowerCase().includes(search.target.value.toLowerCase())
                        })
                });
                break;
            case "Search by last name":
                this.setState({
                    filteredUsers: cloneDeep(this.state.users)
                        .filter(customer => {
                            return customer.lastName.toLowerCase().includes(search.target.value.toLowerCase())
                        })
                });
                break;
            case "Search by email":
                this.setState({
                    filteredUsers: cloneDeep(this.state.users)
                        .filter(user => {
                            return user.email.toLowerCase().includes(search.target.value.toLowerCase())
                        })
                });
        }
    };

    componentDidUpdate() {
        setTimeout(() => this.setState({message: 'user deleted'}), 3000);
    }

    render() {
        if (this.state.editUser) {
            return (<Editor user={this.state.user}
                            closed={() => (this.setState({editUser: false}))}
                            changeUserData={(user) => this.changeUserData(user)}

            ></Editor>)
        }
        if (this.state.showModal) {
            return (<div className="NewUser">
                <form>
                    <FormGroup controlId="firstName">
                        <FormLabel>first name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.user.firstName}
                            onChange={(event) => this.setInputValueForUser(event, "firstName")}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName">
                        <FormLabel>last name</FormLabel>
                        <FormControl
                            value={this.state.user.lastName}
                            onChange={(event) => this.setInputValueForUser(event, "lastName")}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <FormLabel>email</FormLabel>
                        <FormControl
                            value={this.state.user.email}
                            onChange={(event) => this.setInputValueForUser(event, "email")}
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup controlId="address">
                        <FormLabel>address</FormLabel>
                        <FormControl
                            value={this.state.user.address.country}
                            onChange={(event) => this.setInputValueForAddress(event, "country")}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="phoneNumber">
                        <FormLabel>phone number</FormLabel>
                        <FormControl
                            value={this.state.user.phoneNumber}
                            onChange={(event) => this.setInputValueForUser(event, "phoneNumber")}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="accountNumber">
                        <FormLabel>account number</FormLabel>
                        <FormControl
                            value={this.state.accountNumber}
                            onChange={(event) => this.setInputValueForUser(event, "accountNumber")}
                            type="text"
                        />
                    </FormGroup>
                    <Button block bsSize="large"
                            onClick={() => this.addUser()}
                            type="submit"
                    >
                        Save a new user
                    </Button>
                </form>
            </div>);
        }

        return !this.state.credentialsValid ?
            <Router history={history}>

                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>

                                <Link to="/customers">Customers</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/customers">
                            <InputGroup>
                                <FormControl type="text" placeholder='search'
                                             onChange={(search) => this.filterUsers(search)}/>
                                <DropdownButton as={InputGroup.Append} variant="outline-secondary"
                                                title={this.state.filterBy}
                                                id="input-group-dropdown-2">
                                    <Dropdown.Item onClick={() => this.setState({filterBy: 'Search by first name'})}>First
                                        name</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setState({filterBy: 'Search by last name'})}>Last
                                        name</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => this.setState({filterBy: 'Search by email'})}>Email</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>


                            <Users
                                openPrevPage={() => this.openPrevPage()}
                                openNextPage={() => this.openNextPage()}
                                changeCurrentPage={(event) => this.changeCurrentPage(event)}
                                currentPage={this.state.currentPage}
                                users={this.state.filteredUsers}
                                editUser={(user, index) => this.initializeEditing(user, index)}
                                deleteUser={(id) => this.deletePersonHandler(id)}
                                showModal={this.showModal}/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router> :
            <LoginForm
                inputEmail={this.state.inputEmail}
                inputPassword={this.state.inputPassword}
                changeInput={this.setInputValueForUser}
                validator={this.credentialsValidator}
            />;
    }
}


function Home() {
    return <h2> Still in progress...</h2>;
}

export default App;

