import LoginForm from "../components/LoginForm";
import logo from "../assets/img/dog.png";

const LoginPage = () => {
  return (
    <>
      <div className="flex max-w-5xl mx-auto my-4 gap-10 max-sm:flex-col max-lg:flex-col">
        <img className="rounded-5xl" src={logo} alt="Logo" />
        <div className="bg-white p-10 rounded-xl">
          <h1 className="text-[54px] font-bold mb-[16px]">Login</h1>
          <p className="mb-[32px] w-[80%] text-[18px]">
            Welcome! Please enter your credentials to login to the platform:
          </p>
          <LoginForm />
        </div>
        
      </div>
    </>
  );
};

export default LoginPage;
