import { useState } from "react";

function Registrarse () {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [isChecked, setIsChecked] = useState(false)

    const handleSubmit = e => {
        e.preventDefault();

        if (isChecked) {
            localStorage.setItem("recordar", "si")
        } else {
            localStorage.setItem("recordar", "no")
        }

        if (!email || !password || !confirm) {
            alert("campo vacio")
            return;
        } else {
            if (password == confirm) {
                localStorage.setItem("email", email)
                localStorage.setItem("password", password)

                setEmail("")
                setPassword("")
                setConfirm("")

                window.location.reload()
            } else {
                alert("Las contraseñas no coinciden")
            }
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="form">
            <div className="section">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="input" />
            </div>
            <div className="section">
                <label htmlFor="password">Clave</label>
                <input type="password" name="passowrd" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} minLength={8} className="input" />
            </div>
            <div className="section">
                <label htmlFor="confirm">Confirmar clave</label>
                <input type="password" name="confirm" id="confirm" value={confirm} onChange={(e) => {setConfirm(e.target.value)}} minLength={8} className="input" />
            </div>
            <div className="section last">
                <label htmlFor="check">Recordar cuenta <input type="checkbox" name="check" id="check" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} /></label>
            </div>
            <button type="submit" className="btn">Registrarse</button>
        </form>
        </>
    )
}

export default Registrarse