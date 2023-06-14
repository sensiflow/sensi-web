import { UserRole } from "./roles"

export interface User{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role : UserRole,
}

const EmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*.!@$%^&(#){}\[\]:;<>,.?/~_+\-=|]).{5,20}/

export const EmailConstraints = 
{ 
  required: 'Email is required',
  pattern: {
    value: EmailRegex,
    message: 'Invalid email address'
  }
}

export const NameConstraints =
{
  required: 'Name is required',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters long'
  },
  maxLength: {
    value: 20,
    message: 'Name must be at most 20 characters long'
  }
}

export const PasswordConstraints =
{
  required: 'Password is required',
  minLength: {
    value: 5,
    message: 'Password must be at least 5 characters long'
  },
  maxLength: {
    value: 20,
    message: 'Password must be at most 20 characters long'
  },
  pattern : {
    value: PasswordRegex,
    message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
  }
}

