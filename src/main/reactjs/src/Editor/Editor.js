import React, {Component} from 'react';
import {Modal, Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {cloneDeep} from "lodash";
import './Editor.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: props.user.id,
                index: props.user.index,
                firstName: props.user.firstName,
                lastName: props.user.lastName,
                email: props.user.email,
                address: props.user.address,
                phoneNumber: props.user.phoneNumber,
                accountNumber: props.user.accountNumber
            },
            editUser: false
        };
    }

    setInputValue = (event, fieldName) => {
        console.log(this.state.user);
        const user = cloneDeep(this.state.user);
        user[fieldName] = event.target.value;
        this.setState({user});
    };

    initializeEditing = (index, firstName, lastName, email, address, phoneNumber, accountNumber) => {
        this.setState({
            firstName: this.props.user.firstName, lastName: lastName, email: email, index: index,
            address: address, phoneNumber: phoneNumber, accountNumber: accountNumber, editUser: true
        });
    };

    updateUser = () => {
        const user = cloneDeep(this.state.user);
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
        })
    };

    render() {
        return (
            <div className={"modal-content"}>
                <Modal.Header closeButton onClick={this.props.closed}>
                    <Modal.Title>Edit {this.state.user.firstName}'s {this.state.user.lastName} data</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row" >
                        <div className="column" >
                        <form>
                            <FormGroup controlId="firstName">
                                <FormLabel>first name</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.user.firstName}
                                    onChange={(event) => this.setInputValue(event, "firstName")}
                                />
                            </FormGroup>
                            <FormGroup controlId="lastName">
                                <FormLabel>last name</FormLabel>
                                <FormControl
                                    value={this.state.user.lastName}
                                    onChange={(event) => this.setInputValue(event, "lastName")}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="email">
                                <FormLabel>email</FormLabel>
                                <FormControl
                                    value={this.state.user.email}
                                    onChange={(event) => this.setInputValue(event, "email")}
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup controlId="phoneNumber">
                                <FormLabel>phone number</FormLabel>
                                <FormControl
                                    value={this.state.user.phoneNumber}
                                    onChange={(event) => this.setInputValue(event, "phoneNumber")}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="accountNumber">
                                <FormLabel>account number</FormLabel>
                                <FormControl
                                    value={this.state.user.accountNumber}
                                    onChange={(event) => this.setInputValue(event, "accountNumber")}
                                    type="text"
                                />
                            </FormGroup>
                                <FormGroup controlId="accountNumber">
                                    <FormLabel>account number</FormLabel>
                                    <FormControl
                                        value={this.state.user.accountNumber}
                                        onChange={(event) => this.setInputValue(event, "accountNumber")}
                                        type="text"
                                    />
                                </FormGroup>
                        </form>
                        </div>
                        <div class="column">
                        <form>
                            <FormGroup controlId="address">
                            <FormLabel> country</FormLabel>
                            <FormControl
                                value={this.state.user.address.country}
                                onChange={(event) => this.setInputValue(event, "address")}
                                type="text"
                            />
                        </FormGroup>
                            <FormGroup controlId="address">
                                <FormLabel>city</FormLabel>
                                <FormControl
                                    value={this.state.user.address.city}
                                    onChange={(event) => this.setInputValue(event, "address")}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="address">
                                <FormLabel>street</FormLabel>
                                <FormControl
                                    value={this.state.user.address.street}
                                    onChange={(event) => this.setInputValue(event, "address")}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="address">
                                <FormLabel>street number</FormLabel>
                                <FormControl
                                    value={this.state.user.address.streetNumber}
                                    onChange={(event) => this.setInputValue(event, "address")}
                                    type="text"
                                />
                            </FormGroup>

                        </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closed}>Close</Button>
                    <Button bsSize="large" variant="primary" onClick={() => this.props.changeUserData(this.state.user)}
                            type="submit">Save changes</Button>
                </Modal.Footer>
            </div>
        );
    }

}

export default Editor;