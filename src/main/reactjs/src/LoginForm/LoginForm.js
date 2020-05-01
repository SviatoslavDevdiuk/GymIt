import React from 'react';
import './LoginForm.css';
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";


const loginForm = ({email, password, changeInput, validator}) => {
    return (
        <div className="Login">
            <form>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(event) => changeInput(event, "inputEmail")}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={(event) => changeInput(event, "inputPassword")}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" onClick={validator} type="submit">
                    Log In
                </Button>
            </form>
        </div>
    )
};
export default loginForm;