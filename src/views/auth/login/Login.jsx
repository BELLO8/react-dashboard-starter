import { useNavigate } from "react-router-dom";
import { getUserProfil } from "../../../Utils/Utils";
import logo from "../../../assets/images/logo/logo.png";
import { LoginForm } from "../../../components/Auth/LoginForm";

export const Login = () => {
  const navigate = useNavigate();
  const user = getUserProfil();
  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     navigate('/')
  //   } else {
  //     navigate('/login')
  //   }
  // }, [user, navigate])

  return (

    <div
      class="container relative  min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 "
    >
      <div style={{ backgroundImage: `url("https://cdn.pixabay.com/photo/2022/11/24/15/18/car-7614510_640.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white lg:flex dark:border-r">
      </div>
      <div
        class="p-8 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]"
      >
        <div className="flex gap-x-2 ">
          <img
            className="rounded-md"
            src={logo}
            height={35}
            width={35}
            alt=""
          />
          <p className="my-auto font-bold text-xl">Treiize Taxi</p>
        </div>
        <div class="flex flex-col space-y-2">
          <h1 class="text-2xl font-semibold tracking-tight">Connexion au BackOffice</h1>
          <p class="text-sm text-muted-foreground">
            Saisissez vos identifiants pour vous connecter.
          </p>
        </div>
        <div class="grid gap-6">
          <LoginForm />
        </div>

      </div>
    </div>

  );
};