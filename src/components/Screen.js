function Screen({ src, alt, scanner, text, handleClickAdvanced }) {
  return (
    <div
      className="h-[250px] bg-[#eee] w-full relative shadow-sm overflow-hidden"
      onClick={() => handleClickAdvanced()}
    >
      <div id="reader" className="w-full h-full z-[1] absolute"></div>
      <img
        src={src}
        alt={alt}
        className="w-full h-full z-0 absolute opacity-25 p-4 inset-0"
      />
      <p className=" absolute bottom-2 text-md w-full text-center text-[#b5b5b5] z-0">
        {text}
      </p>

      {scanner ? (
        <button className="w-full h-12 absolute z-[2] text-lg bottom-0 opacity-70 bg-gray-500 text-white">
          Taramayı Temizle
        </button>
      ) : null}
    </div>
  );
}

export default Screen;
