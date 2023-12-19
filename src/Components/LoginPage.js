import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import '../styles/LoginPage.css'

import {
	Button,
	TextField,
	Link,
	Grid,
	Box,
	Typography,
	Container,
} from '@mui/material'

function LoginPage() {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})
	const [errMsg, setErrMsg] = useState('')
	// eslint-disable-next-line no-unused-vars
	const [successMsg, setSuccessMsg] = useState('')
	
	const dispatch = useDispatch();

	const handleChange = (event) => {
		const { name, value } = event.target
		// console.log(formData)
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleLogin = () => {
		const storedUsername = localStorage.getItem('username')
		const storedPassword = localStorage.getItem('password')

		if (
			storedUsername === formData.username &&
			storedPassword === formData.password
		) {
			setSuccessMsg('Login successful. Redirecting...')
			setFormData({ username: '', password: '' })
			navigate('/login-successful')
			dispatch({type: 'setUsername', payload: formData.username})
		} else {
			navigate('/login-failed')
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!formData.username.trim() || !formData.password.trim()) {
			setErrMsg('Please fill in all fields')
		} else {
			setErrMsg('')
			handleLogin()
		}
	}

	return (
		<Container component='main' maxWidth='sm' className='signin-box'>
			<Box
				sx={{
					px: 4,
					py: 5,
					marginTop: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography component='h1' variant='h3' className='custom-heading'>
					Log In
				</Typography>

				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{errMsg && (
						<Typography variant='body2' color='error'>
							{errMsg}
						</Typography>
					)}

					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
						value={formData.username}
						onChange={handleChange}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						value={formData.password}
						onChange={handleChange}
					/>
					<Button
						id='myButton'
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>

					<Grid container justifyContent='center' alignItems='center'>
						<Grid item>
							<Link href='/signup' variant='body2' id='myLink'>
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}

export default LoginPage
