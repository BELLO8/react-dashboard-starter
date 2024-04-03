import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../redux/auth";
import { loginUser } from "../../services/LoginService";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsSubmit(true)
    loginUser(data).then((res) => {
      const Token = res.data.accessToken
      if (res.data) {
        const data = {
          ...res.data,
          accessToken: Token,
        }
        dispatch(handleLogin(data))
        navigate('/')
      }
    }).catch((err) => {
      console.log(err);
      setIsSubmit(false)
      if (err.code === "ERR_BAD_REQUEST") {
        toast.error('Verifier vos identifiants')
      } else if (err.code === "ERR_NETWORK") {
        toast.error('Problème de connexion')
      } else {
        toast.error("Une erreur s'est produite")
      }
    })

  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="grid gap-2">
          <div class="grid gap-1">
            <input
              class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="name@exampl"
              {...register("username", {
                required: "Please enter your username.",
              })}
            />
            <input
              class="mt-4 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              placeholder="Mot de passe"
              type="password"
              {...register("password", {
                required: "Please enter your Email.",
              })}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmit ? true : false}
            className={`${!isSubmit
              ? "text-white bg-indigo-900"
              : "text-slate-800 bg-slate-200 "
              } inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-primary/90 h-9 px-4 py-2`}

          >
            {isSubmit ? "Veuillez patientez... " : "Se connecter au mon espace"}{" "}
            {isSubmit ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : null}
          </button>
        </div>
      </form>
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white rounded-xl  shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
           
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Renseigner votre username"
                  {...register("username", {
                    required: "Please enter your username.",
                  })}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", {
                    required: "Please enter your Email.",
                  })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmit ? true : false}
                className={`${!isSubmit
                  ? "text-white bg-indigo-900"
                  : "text-slate-800 bg-slate-200 "
                  } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                {isSubmit ? "Veuillez patientez... " : "Se connecter"}{" "}
                {isSubmit ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : null}
              </button>

            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};
