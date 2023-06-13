import { screen, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import * as React from "react"
import Login from "../src/pages/auth/login"
import { AuthProvider } from "../src/logic/context/auth-context"
import Cookies from 'js-cookie'



/**
 * Checks if the Sign in header is rendered in the Login page
 */
test('Header renders with Sign in the document', () => {
    renderLoginComponent()
    const linkElement = screen.getByText('Sign in')
    expect(linkElement).toBeInTheDocument
})

describe('Test the Login component', () => {
    /**
     * Checks if the Login page renders with 1 button
     */
    test('render the login form with 1 button', async () => {
        renderLoginComponent()
        const buttonList = await screen.findAllByRole('button')
        expect(buttonList).toHaveLength(1)
    })

    /**
     * Checks if the Login page renders with 2 input fields.
     * To accommodate Material UI, {exact: false} is used to match the label text
     */
    test('render the login form with 2 input fields', async () => {
        const {findByLabelText} = renderLoginComponent()
        const email = await findByLabelText('Email Address', {exact: false})
        const password = await findByLabelText('Password', {exact: false})
        expect(email).toBeInTheDocument
        expect(password).toBeInTheDocument
    })

    /**
     * Checks if after sumbitting the login form, the user is redirected to the home page using mock data.
     */
    test('submit the login form', async () => {
        Cookies.get = jest.fn()
        const { findByLabelText, getByTestId } = renderLoginComponent()
        const submitBtn = getByTestId('submit')
    
        const email = await findByLabelText('Email Address', {exact: false})
        const password = await findByLabelText('Password', {exact: false})

        userEvent.type(email, 'roxihi2441@etondy.com')
        userEvent.type(password, 'KswODO')

        userEvent.click(submitBtn).then(() => {
            //TODO - check path
            const linkElement = screen.getByText('Dashboard')
            expect(linkElement).toBeInTheDocument
        })
    })
})

/**
 * Renders the Login component
 */
const renderLoginComponent = () => {
    return render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
    )
}