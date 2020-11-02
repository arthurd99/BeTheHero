import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { FiPower, FiTrash2 } from "react-icons/fi" // logout and trash icon
import api from "../../services/api" // backend API
import "./styles.css"
import logoImg from "../../assets/logo.svg"

// Profile component
function Profile() {
	// get NGO id and name from browser"s local storage
	const ngoId = localStorage.getItem("ngoId")
	const ngoName = localStorage.getItem("ngoName")

	// create a state to store each incident from that NGO
	const [incidents, setIncidents] = useState([])

	// get history instance
	const history = useHistory()

	/**
	 * useEffect is a function that is called when something changes,
	 * in this case, when ngoId change. So it's just called once in the app
	 */

	useEffect(() => {
		// gets all incidents from the specific ngo
		api.get("/profile", {
			headers: {
			  Authorization: ngoId
			}
		}).then(response => {
			// stores the incidents into incidents state
			setIncidents(response.data)
		})
	}, [ngoId])

	// listener function to delete an incident
	async function handleDeleteIncident(id) {
		try {
			// try to delete the specific incident
			await api.delete(`/incidents/${id}`, {
				headers: {
				  Authorization: ngoId
				}
			})
			// update incidents state
			setIncidents(incidents.filter(incident => incident.id !== id))
		} catch (error) {
			alert(error.args)
		}
	}

	// Function called when you click the logout button
	function handleLogout() {
		// clean the local storage
		localStorage.clear()

		// redirects the user to login page
		history.push('/')
	}

	// HTML returned when the component is rendered
	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be The Hero" />
				<span>Welcome, {ngoName}</span>
				{/**
				 * Link: redirects user to a link without page's reload.
				 * FiPower: it's an icon in a component format,
				 * this icon was imported from feather icons pack
				 */}
				<Link className="button" to="/incidents/new">Register a new case</Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#e02041" />
				</button>
			</header>
			<h1>Registered cases</h1>
			{incidents.length === 0 && <h2>You have any registered case :(</h2>}
			<ul>
				{incidents.map(incident => {
					return (
						<li key={incident.id}>
							<strong>CASE:</strong>
							<p>{incident.title}</p>
							<strong>DESCRIPTION:</strong>
							<p>{incident.description}</p>
							<strong>VALUE:</strong>
							<p>
								{/*
								  * Intl is a global function from javascript which formats
								  * numbers, in this case, into brazilian currency.
								  */
								  Intl.NumberFormat("en-BR", {
									style: "currency",
									currency: "USD"
								  }).format(incident.value)
								}
							</p>
							{/**
							 * FiTrash2: it's an icon in a component format, this icon was
							 * imported from feather icons pack
							 */}
							<button onClick={() => handleDeleteIncident(incident.id)} type="button">
								<FiTrash2 size={20} color="#a8a8b3" />
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

// Exports component
export default Profile
