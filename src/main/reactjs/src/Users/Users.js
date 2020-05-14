import React from "react";
import User from '../User/User'
import './Users.css';
import Table from "react-bootstrap/Table";
import {Button, Pagination, Badge} from "react-bootstrap";
import {Alert} from "../components";


const users = ({openPrevPage, openNextPage, changeCurrentPage, currentPage, users, deleteUser, editUser, showModal, openDetails}) => {
    const usersPerPage = 50;


    const renderUsers = () => {
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
        return currentUsers.map(user => <User onClick={() => openDetails()}
                                              key={users.indexOf(user)}
                                              id={user.id}
                                              firstName={user.firstName}
                                              lastName={user.lastName}
                                              email={user.email}
                                              address={user.address}
                                              phoneNumber={user.phoneNumber}
                                              accountNumber={user.accountNumber}
                                              editClick={() => editUser(user, (users.indexOf(user)))}
                                              deleteClick={(id) => deleteUser(id)}/>);

    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => changeCurrentPage(number)}
            >
                {number}
            </Pagination.Item>

        );
    });
//TODO: fix diplaying negative numbers in pagination
    const isNotLessThanOne = (number) => {
        if (number > 0) {
            return <Pagination.Item onClick={() => changeCurrentPage(number)}>{number}</Pagination.Item>
        }
    };
    const isNotBiggerThatMax = (number) => {
        if (number <= pageNumbers.length) {
            return <Pagination.Item onClick={() => changeCurrentPage(number)}>{number}</Pagination.Item>
        }
    };

    return (
        <div>
            <Button type="submit" onClick={showModal}>Add a new customer</Button>
            <br></br>
            <br></br>
            <Pagination>
                <Pagination.First onClick={() => changeCurrentPage(1)}/>
                <Pagination.Prev onClick={openPrevPage}/>
                {/*<Pagination.Item>{currentPage-1}</Pagination.Item>*/}
                {isNotLessThanOne(currentPage - 2)}
                {isNotLessThanOne(currentPage - 1)}
                <Pagination.Item
                    active={currentPage}>{currentPage}</Pagination.Item>
                {isNotBiggerThatMax(currentPage + 1)}
                {isNotBiggerThatMax(currentPage + 2)}
                <Pagination.Next onClick={openNextPage}/>
                <Pagination.Last onClick={() => changeCurrentPage(pageNumbers.length)}/>
            </Pagination>
            <Button variant="primary">
                Profiles <Badge variant="light">{users.length}</Badge>
            </Button>
            <Table striped bordered hover>
                <tbody>
                <Alert/>
                <tr>
                    <th>id</th>
                    <th>first name</th>
                    <th>last name</th>
                    <th>email</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
                {renderUsers(currentPage)}

                </tbody>
            </Table>
        </div>
    )
};

export default users;