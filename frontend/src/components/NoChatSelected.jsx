function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <img src="/matee.png" alt="" className="rounded-lg" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Bienvenido a MateAR</h2>
        <p className="text-base-content/60">
          ¡Elige una conversacion para comenzar a matear!
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
