export default class Customer {
    id ?: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    countryCode: string;
    phone: string;
    orders ?: string[];
}