import "../styles/style.css"
import { useState } from "react";

function Entrar() {

    const [isHidden, setIsHidden] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cont, setCont] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();

        const emailValue = localStorage.getItem("email")
        const passwordValue = localStorage.getItem("password")

        if (!email || !password) {
            alert("Campo vacio")
            return
        } else {
            if (email != emailValue) {
                console.log("El email no coincide")
            } else {
                if (password != passwordValue) {
                    if (cont === 3) {
                        setEmail("")
                        setPassword("")
                        setDisabled(true)
                        window.location.reload()
                    } else {
                        setCont(cont + 1)
                        console.log(cont)
                        alert("La contraseña no coincide")
                    }
                } else {
                    setIsHidden(true)
                }
            }
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} hidden={isHidden} className="form">
            <div className="section">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" value={email} onChange={((e) => {setEmail(e.target.value)})}  disabled={disabled} className="input" />
            </div>
            <div className="section">
                <label htmlFor="password">Clave</label>
                <input type="password" name="passowrd" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} disabled={disabled} className="input" />
            </div>
            <div className="section">
                <label htmlFor="check"></label>
                <input:checked></input:checked>
            </div>
            <div className="section last">
                <label htmlFor="check">Recordar cuenta <input type="checkbox" name="check" id="check" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} /></label>
            </div>
            <button type="submit" disabled={disabled} className="btn">Entrar</button>
        </form>
        </>
    )
}

export default Entrar