import logo from '../assets/img/cat.png';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = () => {
  return (
    <div className="flex max-w-5xl mx-auto my-4 gap-10 max-sm:flex-col max-lg:flex-col">
      <img className="rounded-5xl" src={logo} alt="Logo" />
      <div className="bg-white p-10 rounded-7xl w-[90%] max-sm:w-[100%] max-lg:w-[95%] max-lg:mx-auto">
          <h1 className="text-[54px] font-bold mb-[16px]">Registration</h1>
          <p className="mb-[32px] w-[80%] text-[18px]">
           Thank you for your interest in our platform. 
          </p>
          <RegistrationForm />
        </div>
    </div>
  )
}

export default RegistrationPage
