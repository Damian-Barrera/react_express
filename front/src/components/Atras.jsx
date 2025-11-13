import { useNavigate } from "react-router-dom"
import btn from "../styles/btnAtras.module.css"

const Atras = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className={btn.atras} >
      <button onClick={handleBack} >Atras</button>
    </div>
  )
}

export default Atras
