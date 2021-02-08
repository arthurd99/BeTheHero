import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi" // arrow left icon from feather
import api from "../../services/api" // backend API
import "./styles.css"
import logoImg from "../../assets/logo.svg"

// register a new component
function Register() {
	// create a state to store each form input
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [whatsapp, setWhatsapp] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")

	// get history instance
	const history = useHistory()

	// function listener of submit button
	async function handleRegister(event) {
		// prevents browser's reload
		event.preventDefault()

		// get input data from form
		const data = { name, email, whatsapp, city, state }

		try { // try to create a new NGO
			const response = await api.post('/ngos', data)

			if (response.status !== 201) {
				return alert(`ERROR ${response.status}: ${response.statusText}`)
			} else {
				console.log(`Your login code is: ${response.data}`)
				alert(`Your access ID: ${response.data}`)
				return history.push('/') // redirect user to login page
			}
		} catch (error) {
			return alert(error.args)
		}
	}

	// HTML returned when the component is rendered
	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />
					<h1>Register</h1>
					<p>Enroll and help people to find and help your NGO</p>
					{/**
					 * Link: redirects user to a link without page's reload.
					 * FiArrowLeft: it's an icon in a component format, this icon was
					 * imported from feather icons pack
					*/}
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#e02041" />
						Back to login
					</Link>
				</section>
				<form onSubmit={handleRegister}>
					<input
						placeholder="NGO name"
						value={name}
						// Updates component state when changed
						onChange={e => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						// Updates component state when changed
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						placeholder="WhatsApp"
						value={whatsapp}
						// Updates component state when changed
						onChange={e => setWhatsapp(e.target.value)}
					/>
					<div className="input-group">
						<input
							placeholder="City"
							value={city}
							// Updates component state when changed
							onChange={e => setCity(e.target.value)}
						/>
						<input
							placeholder="ST"
							style={{ width: 80 }}
							value={ state }
							// Updates component state when changed
							onChange={e => setState(e.target.value)}
						/>
					</div>
					<button className="button" type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	)
}

// Exports component
export default Register
