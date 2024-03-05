import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Login } from "../../services/LoginService";


export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    Login(data).then((res) => {
      navigate('/')
      setIsSubmit(true);
    })

  };
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-xl  shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">
              Connectez-vous à votre compte
            </h1>
            <p className="text-slate-400">
              Veuillez renseigner toutes les informations
            </p>
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
                className={`${!isSubmit
                  ? "text-white bg-indigo-900"
                  : "text-slate-800 bg-slate-200 "
                  } w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                {!isSubmit ? "Se connecter" : "Veuillez patientez..."}{" "}
                {isSubmit ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : null}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous n'avez pas encore de compte ?
                <a
                  href="/"
                  className="font-semibold text-indigo-900 hover:underline dark:text-primary-500"
                >
                  S'inscrire
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
