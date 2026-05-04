import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { updateUserInfo } from "../redux/users/operation"
import { selectUser } from "../redux/users/selector"


const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email").required("Email is required"),
  avatar: Yup.string().matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, "Invalid image URL").required("Avatar URL is required"),
  phone: Yup.string().matches(/^\+38\d{10}$/, "Format: +38XXXXXXXXXX").required("Phone is required"),
})

type FormValues = {
  name: string
  email: string
  avatar: string
  phone: string
}

type Props = {
  onClose: () => void
}

const ModalEditUser = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
  name: user.name ?? "",
  email: user.email ?? "",
  avatar: user.avatar ?? "",
  phone: user.phone ?? "",
}
  })

  const avatar = watch("avatar")

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
    setValue("avatar", data.secure_url)
  }

  const onSubmit = async (values: FormValues) => {
    await dispatch(updateUserInfo(values))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl">✕</button>
        
        <h2 className="text-xl font-bold mb-6">Edit information</h2>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#FAEEDA] overflow-hidden">
            {avatar && avatar.match(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/) ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl">🐾</div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

          <div className="flex gap-2">
            <div className="flex-1">
              <input
                {...register("avatar")}
                placeholder="Enter image URL"
                className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
              />
              {errors.avatar && <p className="text-red-400 text-xs mt-1 ml-2">{errors.avatar.message}</p>}
            </div>
            <label className="bg-[#FAEEDA] text-[#F6B83D] px-4 py-3 rounded-3xl text-sm font-medium whitespace-nowrap cursor-pointer flex items-center gap-1">
              Upload photo ↑
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1 ml-2">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1 ml-2">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="+38XXXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-200 rounded-3xl text-sm outline-none focus:border-[#F6B83D]"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1 ml-2">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-3xl bg-[#F6B83D] text-white font-medium mt-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalEditUser