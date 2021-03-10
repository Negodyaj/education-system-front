export interface User {
    name: string
    email: string
    phone: string
    company: {
        name: string
    },
    address: {
        city: string
        zipcode: number
        street: string
        suite: string
    }
}