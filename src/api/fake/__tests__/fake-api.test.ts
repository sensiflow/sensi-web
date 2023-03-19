import { login, register } from '../fake-api'
import { test, expect } from '@jest/globals'
import { users } from '../mock-data'

test('Succesfully login', () => {
    const success = login('roxihi2441@etondy.com', 'KswODO')
    expect(success).toBe(true)
})

test('Unsuccesfully login', () => {
    const success = login('roxihi2441@etondy.com', 'wrong-pass')
    expect(success).toBe(false)
})

test('Succesfully register', () => {
    const email = 'new-email@email.com'
    register('John', 'Doe', email, 'pass')


    const user = users.find(user => user.email === email)
    expect(user).not.toBeUndefined()
})

test('Unsuccesfully register with an already existing email', () => {
    const email = 'roxihi2441@etondy.com'
    const firstName = 'John'
    const numUsers = users.length
    
    register(firstName, 'Doe', email, 'pass')
    expect(numUsers).toBe(users.length)
})


