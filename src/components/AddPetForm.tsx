import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import type { AppDispatch } from "../redux/store"
import { addPet } from "../redux/users/operation"
import toast from "react-hot-toast"

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  imgURL: Yup.string().matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, "Must be a valid image URL").required("Image URL is required"),
  species: Yup.string().required("Species is required"),
  birthday: Yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD").required("Birthday is required"),
  sex: Yup.string().required("Sex is required"),
})

type FormValues = {
  title: string
  name: string
  imgURL: string
  species: string
  birthday: string
  sex: string
}

const speciesList = ["Dog", "Cat", "Monkey", "Bird", "Snake", "Turtle", "Lizard"]

const AddPetForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const imgURL = watch("imgURL")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "petlove")

    const res = await fetch("https://api.cloudinary.com/v1_1/dcuc5ea9k/image/upload", {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    setValue("imgURL", data.secure_url)
  }

  const onSubmit = async (values: FormValues) => {
    await dispatch(addPet(values))
      .unwrap()
      .then(() => {
        toast.success("Added successfully",{duration:2000})
      }).catch(() => {
      toast.error("Something went wrong",{duration:2000})
    })
    navigate("/profile")
  }

  return (
    <div className="bg-white rounded-3xl p-8 max-w-lg mx-auto w-[100%]">
      <h2 className="text-2xl font-bold mb-6">
        Add my pet / <span className="text-gray-400 font-normal text-lg">Personal details</span>
      </h2>

      <div className="flex gap-3 mb-6">
        <label className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 cursor-pointer">
          <input type="radio" value="female" {...register("sex")} className="hidden" />
          <span className="text-pink-400">♀</span>
        </label>
        <label className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 cursor-pointer">
          <input type="radio" value="male" {...register("sex")} className="hidden" />
          <span className="text-blue-400">♂</span>
        </label>
        <label className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 cursor-pointer">
          <input type="radio" value="unknown" {...register("sex")} className="hidden" />
          <span className="text-gray-400">⚥</span>
        </label>
        {errors.sex && <p className="text-red-400 text-xs self-center">{errors.sex.message}</p>}
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#FAEEDA] flex items-center justify-center overflow-hidden">
          {imgURL && imgURL.match(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/) ? (
            <img src={imgURL} alt="pet" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl">🐾</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

        <div className="flex gap-2">
          <div className="flex-1">
            <input
              {...register("imgURL")}
              placeholder="Enter image URL (https://...jpg)"
              className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
            />
            {errors.imgURL && <p className="text-red-400 text-xs mt-1 ml-2">{errors.imgURL.message}</p>}
          </div>
          <label className="bg-[#FAEEDA] text-[#F6B83D] px-4 py-3 rounded-3xl text-sm font-medium whitespace-nowrap cursor-pointer flex items-center gap-1">
            Upload photo ↑
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        <div>
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
          />
          {errors.title && <p className="text-red-400 text-xs mt-1 ml-2">{errors.title.message}</p>}
        </div>

        <div>
          <input
            {...register("name")}
            placeholder="Pet's Name"
            className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1 ml-2">{errors.name.message}</p>}
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => field.onChange(date ? date.toISOString().split("T")[0] : "")}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="00.00.0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
                />
              )}
            />
            {errors.birthday && <p className="text-red-400 text-xs mt-1 ml-2">{errors.birthday.message}</p>}
          </div>
          <div className="flex-1">
            <select
              {...register("species")}
              className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D] bg-white"
            >
              <option value="">Type of pet</option>
              {speciesList.map(s => (
                <option key={s} value={s.toLowerCase()}>{s}</option>
              ))}
            </select>
            {errors.species && <p className="text-red-400 text-xs mt-1 ml-2">{errors.species.message}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex-1 py-3 rounded-3xl border border-gray-200 text-gray-500 font-medium"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-3xl bg-[#F6B83D] text-white font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPetForm
