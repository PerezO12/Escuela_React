const Alerta = ({ alerta }) => {
  return (
    <div className={`${
      alerta.error
        ? 'bg-gradient-to-br from-red-500 via-red-600 to-red-700'
        : 'bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600'
    } text-center p-4 rounded-xl uppercase text-white font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 my-6`}>
      {alerta.msg}
    </div>
  );
}

export default Alerta;
