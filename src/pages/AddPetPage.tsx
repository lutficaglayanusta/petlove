import { type JSX } from "react"
import logo from "../assets/img/dog1.png"
import AddPetForm from "../components/AddPetForm"

const AddPetPage = (): JSX.Element => {
  return (
    <div className="max-w-5xl mx-auto flex gap-6">
      <img src={logo} alt="Dog" />
      <AddPetForm />
    </div>
  )
}

export default AddPetPage
