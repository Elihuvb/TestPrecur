import logo from "../media/LogoPrecurApp.png";

function LogoIntro() {
  return (
    <div>
        <div className="logoCont">
          <img src={logo} alt="Logo Precur App" className="logo" />
          <h1>Precur</h1>
        </div>
    </div>
  )
}
export default LogoIntro