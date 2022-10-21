import MusteriForm from "components/MusteriForm";
import { useAppContext } from "context/AppContext";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
let height = "";
function Home() {
  const { company, setCompany, click } = useAppContext();
  !click ? (height = "h-0") : (height = "h-[250px]");
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const handleClear = (e) => {
    e.preventDefault();
    setImage("");
    const ImageSrc = webcamRef.current.getScreenshot();
    setCompany((cmp) => cmp.filter((sr) => sr.imageSrc !== ImageSrc));
  };
  const handleCapture = (e) => {
    e.preventDefault();
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setCompany({ ...company, imageSrc });
  };
  return (
    <>
      <div
        className={`${height}  overflow-hidden relative shadow-sm bg-black transition-all ease-linear`}
      >
        {image === "" ? (
          <>
            <button
              className="absolute z-10 inset-0 m-auto text-white w-full h-full flex items-end justify-center"
              onClick={handleCapture}
            >
              <span className="h-[60px] w-full flex items-center justify-center bg-gradient-to-b to-gray-900 from-transparent">
                Görüntü yakalamak için ekrana dokunun!
              </span>
            </button>
            <img
              src="/screen_images.png"
              alt="Barkode"
              className="w-full h-auto z-0 absolute inset-0 m-auto p-28 opacity-25"
            />
            {click && (
              <Webcam
                screenshotFormat="image/jpeg"
                audio={false}
                ref={webcamRef}
                className="videoKart absolute inset-0 z-0"
                videoConstraints={{
                  aspectRatio: 1.0,
                  facingMode: "environment",
                }}
              />
            )}
          </>
        ) : (
          <>
            <button
              className="absolute z-10 inset-0 m-auto text-white w-full h-full flex items-end justify-center"
              onClick={handleClear}
            >
              <span className="h-[60px] w-full flex items-center justify-center bg-gradient-to-b to-gray-900 from-transparent">
                Yeni görüntü yakalamak için ekrana tıklayın!
              </span>
            </button>
            <img
              src={image}
              alt="Firma Görseli"
              className="absolute inset-0 z-0"
            />
          </>
        )}
      </div>
      <MusteriForm />
    </>
  );
}

export default Home;
