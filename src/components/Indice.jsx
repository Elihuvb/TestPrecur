import {useState} from 'react'
import "../styles/style.css"
import { CiClock1, CiEdit } from "react-icons/ci";
import LogoIntro from "./LogoIntro";
import Entrar from "./Loggin";
import Registrarse from "./Registrarse";
import Notes from './Notes';
import Horas from "./Horas";

function renderingSignUp() {
    const [view, setView] = useState("loggin")
    const [log, setLog] = useState(false)
    const [reg, setReg] = useState(false)
    const [activo, setActivo] = useState(false)

    const rend = () => {
        switch (view) {
            case "loggin":
                return <Entrar setView={setView} />
            case "signUp":
                return <Registrarse setView={setView} />
            default:
                return <Entrar setView={setView} />
        }
    }

    return (
        <div>
            <div>
                <LogoIntro />
            </div>
            <div className='navForms'>
                <button type="button" onClick={() => {setView("loggin"); setLog(true); setReg(false)}} className='btnIndice' style={{backgroundColor: log ? "#1E1E1E" : "#242424"}}>Entrar</button>
                <button type="button" onClick={() => {setView("signUp"); setReg(true); setLog(false)}} className='btnIndice' style={{backgroundColor: reg ? "#1E1E1E" : "#242424"}}>Registrarse</button>
            </div>
            <div>
                {rend()}
            </div>
        </div>
    )
    
}

function renderingLogged() {
    const [view, setView] = useState("notes")
     const rendLog = () => {
        switch (view) {
            case "notes":
                return <Notes setView={setView} />
            case "hours":
                return <Horas setView={setView} />
        }
     }

     return (
        <div>
            <div className='btnMenuNH'>
                <button type="button" onClick={() => setView("notes")} className='btnNH' > <CiEdit className='btnIcon' /> Notas</button>
                <button type="button" onClick={() => setView("hours")} className='btnNH' > <CiClock1 className='btnIcon' /> Horas</button>
            </div>
            <div className='divContNotes'>
                {rendLog()}
            </div>
        </div>
     )
}

function Indice() {

  return (
    <div>
        <div>
            {localStorage.getItem("recordar") === "si" ? renderingLogged() : renderingSignUp()}
        </div>
    </div>
  )
}

export default Indice