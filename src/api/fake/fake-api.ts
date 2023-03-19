import { users } from "./mock-data";

/**
 * Checks if the user matches one and logs him in
 * 
 * @param {string} email 
 * @param {string} password 
 */
export function login(email: string, password: string): boolean {
    const user = users.find(
        user => user.email === email && user.password === password
    );
    if(user) {
        console.log(`User with email ${email} logged in`);
        return true
    }else{
        console.log(`Credentials do no match for the email ${email}`);
        return false
    }
}

/**
 * Registers a new user if the email is not already in use
 * 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} password 
 */
export function register(firstName: string, lastName: string, email: string, password: string): boolean {
    const user = users.find(user => user.email === email);
    
    if (user) {
        console.log(`User with email ${email} already exists`);
        return false;
    }

    users.push({
        firstName,
        lastName,
        email,
        password
    });

    return true
}