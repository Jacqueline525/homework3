import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginPage from './LoginPage';

describe('LoginPage', () => {

  // Page loads and shows Log In screen
  test('loads and displays log in heading', () => {
    // ARRANGE
    render(<LoginPage />)

    // ACT
    const loginPageHeading = screen.getByRole('h1')

    // ASSERT
    expect(loginPageHeading).toHaveTextContent('Log In')
  })

  // On click 'Sign In', if fields are empty, show 'Please fill in all fields'
  test('checks if error message shows on empty field', async () => {
    // ARRANGE
    render(<LoginPage />)
    const signInButton = screen.getByRole('button', { name: /^SIGN IN$/i });
    const usernameInput = screen.getByRole('input', { name: /^Username$/i });
    const pwdInput = screen.getByRole('input', { name: /^Password$/i });

    // ACT
    if (usernameInput === '' && pwdInput === '') {
      await userEvent.click(signInButton)
      await screen.findByRole('p')
    }

    // ASSERT
    expect(screen.getByRole('p')).toHaveTextContent('Please fill in all fields')
  })

  // Check if Sign in button is clicked
  test("should be able to submit form", () => {
    // ARRANGE
    render(<LoginPage />);

    // ACT
    const buttonNode = screen.getByRole("button");
    fireEvent.submit(buttonNode); 

    // ASSERT
    expect(buttonNode).toHaveBeenClicked(1);
  }); 

  // if form submission happens
  test('submits username and password', async () => {
    // ARRANGE
    const username = "myusername";
    const password = "pass1234";
    const mockLogin = jest.fn();

    render(<LoginPage onSubmit={mockLogin(username, password)} />);

    const usernameInput = screen.getByRole('textbox', { name: /Username/i });
    userEvent.type(usernameInput, 'myusername');
    const passwordInput = screen.getByLabelText('Password');
    userEvent.type(passwordInput, 'pass1234');
    const loginButton = screen.getByRole('button', { name: /^Log in$/i });
    expect(loginButton).not.toBeDisabled();

    // ACT
    userEvent.click(loginButton);

    // ASSERT
    await expect(mockLogin).toHaveBeenCalled();
    await expect(mockLogin).toHaveBeenCalledTimes(1);
    await expect(mockLogin).toHaveBeenCalledWith("myusername", "pass1234");
  });

});
