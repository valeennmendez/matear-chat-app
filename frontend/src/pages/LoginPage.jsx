import { Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";
import MateImage from "../components/MateImage";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLogining, login } = useAuthStore();

  function verificationForm() {
    if (formData.email === "") return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("El formato del E-Mail es inválido");
    if (formData.password === "") return toast.error("Password is required");

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const success = verificationForm();

    if (success === true) {
      login(formData);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, email: e.target.value });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6  sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MateImage />
              </div>
              <h1 className="text-2xl font-bold mt-2">Inicia Sesion</h1>
              <p className="text-base-content/60">
                ¡Comienza a charlar con tus amigos!
              </p>
            </div>
          </div>

          <form
            className="space-y-1 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-3">
              <label className="">Email</label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail className="size-5" />
                <input
                  type="text"
                  className="grow"
                  name="email"
                  placeholder=""
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <label className="">Contraseña</label>
              <label className="input input-bordered flex items-center gap-1">
                <Lock className="size-5" />
                <input
                  type="password"
                  className="grow"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </label>
            </div>

            <button
              className="btn btn-success w-full"
              type="submit"
              disabled={isLogining}
            >
              {isLogining ? (
                <Loader2 className="size-5 animate-spin"></Loader2>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
          <div className="text-center">
            <p>
              ¿Todavía no tienes una cuenta?{" "}
              <a href="/signup" className="link link-success">
                Registrate
              </a>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="¡Ingresa a la comunidad!"
        subtitle="¡Ya estas listo para MateAR! Inicia sesion para empezar a charlar con tus amigos!"
      />
    </div>
  );
}

export default LoginPage;
