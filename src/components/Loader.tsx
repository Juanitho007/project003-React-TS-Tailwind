import Footer from "./Footer";

const Loader = () => {
  return (
    <div className="min-h-screen min-w-full flex flex-col justify-between items-center text-center mx-auto bg-gradient-to-r from-indigo-400 from-10% via-sky-500 via-60% to-emerald-300 to-90% p-5">
      <h2 className="text-3xl font-fre">Cargando Dimensión </h2>
      <i className="bx bx-planet bx-burst bx-rotate-90 text-[10rem]"></i>
      <span className="loader"></span>
      <Footer />
    </div>
  );
};

export default Loader;
