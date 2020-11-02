import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import api from "../../services/api" // backend API
import { FiArrowLeft } from "react-icons/fi" // login icon from feather
import "./styles.css"
import logoImg from "../../assets/logo.svg"

// NewIncident component
function NewIncident() {
    // get NGO id from browser's local storage
    const ngoId = localStorage.getItem("ngoId")

    // create a state for each form input
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState("")

    // get history instance
    const history = useHistory()

    // listener function to create a new incident
    async function handleNewIncident(event) {
        // Prevents the browser reload
        event.preventDefault()

        // get input data from form
        const data = {
            title,
            description,
            value
        }

        try {
            // try to create a new incident
            await api.post("/incidents", data, {
              headers: {
                Authorization: ngoId
              }
            })

            // redirect user to profile page
            history.push("/profile")
        } catch (error) {
            alert(error.args)
        }
    }

    // HTML returned when the component is rendered
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Register new case</h1>
                    <p>Describe the case with details to be solved by a hero.</p>
                    {/**
                     * Link: redirects user to a link without page's reload.
                     * FiLogIn: an icon in a component format, this icon was
                     * imported from feather icons pack
                    */}
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to homepage
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Name of the case"
                        value={title}
                        // Updates component state when changed
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        // Updates component state when changed
                        onChange={e => setDescription(e.target.value)} 
                    />
                    <input
                        placeholder="Value in dollar"
                        value={value}
                        // Updates component state when changed
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

// Exports component
export default NewIncident
