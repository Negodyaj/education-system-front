import React from "react";
import UserCard from "./components/user-card/UserCard";
import { User } from "./interfaces/User";

const users: User[] = [{
    name: 'Вася Васин',
    email: 'vasya@mail.ru',
    phone: '555-55-555',
    company: {
        name: 'Рога и копыта'
    },
    address: {
        city: 'СПб',
        zipcode: 193000,
        street: 'Ленина',
        suite: '26, 256'
    }
}, {
    name: 'Петя Васин',
    email: 'pp@mail.ru',
    phone: '555-55-555',
    company: {
        name: 'Рога и копыта'
    },
    address: {
        city: 'СПб',
        zipcode: 193000,
        street: 'Ленина',
        suite: '26, 256'
    }
}, {
    name: 'Арчибальд Васин',
    email: 'archi@mail.ru',
    phone: '555-55-555',
    company: {
        name: 'Рога и копыта'
    },
    address: {
        city: 'СПб',
        zipcode: 193000,
        street: 'Ленина',
        suite: '26, 256'
    }
}];

function Cards() {
    return (
        <div className="uber-container">
            {
                users.map(user => (
                    <UserCard userData={user} />
                ))
            }
        </div>
    )
}

export default Cards;