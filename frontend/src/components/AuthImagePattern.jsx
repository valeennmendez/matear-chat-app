function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p12">
      <div className="max-w-md text-center rounded-lg ">
        <img
          src="/public/image.png"
          alt=""
          className="transition duration-700 ease-in-out hover:opacity-70"
        />
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;
