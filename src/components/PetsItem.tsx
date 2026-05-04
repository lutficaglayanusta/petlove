import type { JSX } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { deletePet } from "../redux/users/operation";
type PetsItemProp = {
  pet: {
    _id: string;
    name: string;
    title: string;
    imgURL: string;
    species: string;
    birthday: string;
    sex: string;
    createdAt: string;
    updatedAt: string;
  };
};

const PetsItem = ({ pet }: PetsItemProp): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const birthDate = new Date(pet.birthday).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const handleDeletePet = (petId: string) => {
    dispatch(deletePet(petId));
  };

  return (
    <div className="flex gap-3 items-center  border-[1px] border-gray-300 border-solid p-[20px] mt-3 rounded-[20px] relative">
      <img className="w-[90px] rounded-full" src={pet.imgURL} alt="" />
      <div className="">
        <h2 className="mb-[12px]">{pet.name}</h2>
        <div className="flex items-center gap-6 mb-3 ">
          <div>
            <p className="text-[#262626] text-[10px]">Name</p>
            <p className="text-[12px] truncate">{pet.name}</p>
          </div>
          <div>
            <p className="text-[#262626] text-[10px]">Birthday</p>
            <p className="text-[12px]">{birthDate}</p>
          </div>
          <div>
            <p className="text-[#262626] text-[10px]">Species</p>
            <p className="text-[12px] truncate">{pet.species}</p>
          </div>
          <div>
            <p className="text-[#262626] text-[10px]">Sex</p>
            <p className="text-[12px]">{pet.sex}</p>
          </div>
          
        </div>
          </div>
          <img
            onClick={() => handleDeletePet(pet._id)}
            className="absolute right-2 top-2 bg-[#FFF4DF] p-3 rounded-full cursor-pointer"
            src="../../public/trash-2.svg"
            alt=""
          />
    </div>
  );
};

export default PetsItem;
