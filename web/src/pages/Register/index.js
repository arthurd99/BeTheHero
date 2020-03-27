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
    const [uf, setUf] = useState("")

    // get history instance
    const history = useHistory()

    // function listener of submit button
    async function handleRegister(event) {
        // prevents browser's reload
        event.preventDefault()

        // get input data from form
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            // try to create a new NGO
            const response = await api.post("/ngos", data)
            alert(`Seu ID de acesso: ${response.data.id}`)

            // redirect user to login page
            history.push('/')
        } catch (error) {
            alert(error)
        }
    }

    // HTML returned when the component is rendered
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    {/**
                     * Link: redirects user to a link without page's reload.
                     * FiArrowLeft: it's an icon in a component format, this icon was
                     * imported from feather icons pack
                    */}
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} // Updates component state when changed
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} // Updates component state when changed
                    />
                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} // Updates component state when changed
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} // Updates component state when changed
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} // Updates component state when changed
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

// Exports component
export default Register
