import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import api from "../../services/api" // backend API
import { FiLogIn } from "react-icons/fi" // login icon from feather
import "./styles.css"
import logoImg from "../../assets/logo.svg"
import heroesImg from "../../assets/heroes.png"

// Logon component
function Logon() {
	// create a state for each form input
	const [id, setId] = useState("")

	// get history instance
	const history = useHistory()

	// listener function to do the login
	async function handleLogon(event) {
		// Prevents the browser reload
		event.preventDefault()

		try {
			// try to create a session
			const response = await api.post("/sessions", { id })

			// Stores id and name from ngo into the browser's local storage
			localStorage.setItem("ngoId", id)
			localStorage.setItem("ngoName", response.data.name)

			// redirect user to profile page
			history.push("/profile")
		} catch (error) {
			alert(error.args)
		}
	}

	// HTML returned when the component is rendered
	return (
		<div className="logon-container">
			<section className="form">
				<img src={logoImg} alt="Be The Hero" />
				<form onSubmit={handleLogon}>
					<h1>Login</h1>
					<input
						placeholder="Your ID"
						value={id}
						onChange={e => setId(e.target.value)} // Updates component state when changed
					/>
					<button className="button" type="submit">Get in</button>
					{/**
					 * Link: redirects user to a link without page's reload.
					 * FiLogIn: it's an icon in a component format,
					 * this icon was imported from feather icons pack.
					*/}
					<Link className="back-link" to="/register">
						<FiLogIn size={16} color="#e02041" />
						I'm not enrolled
					</Link>
				</form>
			</section>
			<img src={heroesImg} alt="Heroes" />
		</div>
	)
}

// export component
export default Logon
