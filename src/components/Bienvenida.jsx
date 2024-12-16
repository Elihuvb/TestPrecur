import "../styles/style.css"
import Indice from "./Indice";

function Bienvenida() {

  if (!localStorage.getItem("aceptar")) {
    return (
      <div>
        <div className="cardWelcome">
        <h1>Hola!</h1>
        <p>
          Te damos la bienvenida a Precur. Un proyecto en su versión web que te
          permite administrar tus revisitas, estudios y horas de precursorado de
          una forma más facil y accesible teniendo todo en un solo lugar. <br />
          <br />
          Actualmente, el proyecto se encuentra en modo de prueba, por lo que
          probablemente existan detalles que mejorar o problemas que solucionar.
          Si surge algún inconvenente en tu experiencia de usuario, no dudes en
          comunicarte con el desarrollador que a la brevedad buscará una
          solución conveniente. <br />
          <br />
          Al ser una de las ocho personas elegidas para los periodos de prueba,
          por favor no compartas el link a este sitio ni comentes al respecto
          con alguien más. Ya que al ser utilizado por un grupo reducido ayuda
          al desarrollador a responder de una forma más eficiente y rápida en caso de que surjan inconvenientes
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem("aceptar", "si")
            window.location.reload()
          }}
        >
          Ok, acepto
        </button>
      </div>
      </div>
    )
  } else {
    return <Indice />
  }
}

export default Bienvenida;
