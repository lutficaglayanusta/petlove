import type { JSX } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/users/selector";
import PetsItem from "./PetsItem";


const PetsList = (): JSX.Element => {
    
    const user = useSelector(selectUser)


  return (
    <div>
          {
              user.pets.map((pet) => (
          <PetsItem key={pet._id} pet={pet} />
        ))
      }
    </div>
  )
}

export default PetsList
