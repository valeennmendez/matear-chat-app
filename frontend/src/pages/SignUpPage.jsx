import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import MateImage from "../components/MateImage";
import { User, Mail, Loader2, Lock } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { toast } from "react-hot-toast";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    console.log("En validateForm");
    if (!formData.fullName.trim())
      return toast.error("El nombre es requerido.");
    if (!formData.email.trim()) return toast.error("El E-Mail es requerido.");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("El formato del E-Mail es inválido");
    if (formData.password.length < 6)
      return toast.error("La contraseña debe ser mayor a 6 caracteres.");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  function handleChange(e) {
    setFormData({ ...formData, fullName: e.target.value });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/*LOGO*/}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MateImage />
              </div>
              <h1 className="text-2xl font-bold mt-2">Crea tu cuenta</h1>
              <p className="text-base-content/60">
                Empieza con tu cuenta gratis
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="">Full Name</label>
              <label className="input input-bordered flex items-center gap-2">
                <User className="size-5" />
                <input
                  type="text"
                  name="fullname"
                  className="grow"
                  placeholder=""
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <label className="">Email</label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail className="size-5" />
                <input
                  type="text"
                  name="email"
                  className="grow"
                  placeholder=""
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <label className="">Password</label>
              <label className="input input-bordered flex items-center gap-1">
                <Lock className="size-5" />
                <input
                  type="password"
                  className="grow"
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          <div className="text-center">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="link link-success">
                Inicia Sesion
              </a>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="¡Unite a la comunidad!"
        subtitle="Comprate con tus amigos momentos y conversaciones con el mate como simbolo de union y charla."
      />
    </div>
  );
}

export default SignUpPage;
