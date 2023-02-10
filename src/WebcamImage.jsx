import React, { useCallback, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Webcam from "react-webcam";
import "./WebcamImage.css";

function WebcamImage() {
  const [img, setImg] = useState(null);
  const [portrait, setPortrait] = useState(null);
  const [screen, setScreen] = useState({ width: null, height: null });
  const webcamRef = useRef(null);

  window.onload = (e) => {
    setScreen({ width: window.innerWidth, height: window.screen.availHeight });
  };

  // let orientation = window.screen.orientation.type;
  let orientation = window.matchMedia("(orientation: portrait)");
  orientation.onchange = (e) => {
    setScreen({ width: window.innerWidth, height: window.screen.availHeight });
    if (e.matches) {
      setPortrait(true);
      console.log("port");
    } else {
      setPortrait(false);
      console.log("land");
    }
  };

  // checkDimentions();

  // let imgWidth = 1920 * 1.7; //3264
  // let imgHeight = 1440 * 1.7; //2448
  let imgWidth = 4032;
  let imgHeight = 3024;

  const videoConstraints = {
    // width: imgWidth,
    // height: imgHeight,
    width: { min: 1920, ideal: imgWidth },
    height: { min: 1440, ideal: imgHeight },
    // screenshotQuality: 0.92,
    facingMode: "environment",
    brightness: false,
    contrast: true,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      height: 4032,
      width: 3024,
    });
    console.log(imageSrc);
    setImg(imageSrc);
  }, [webcamRef]);

  const downloadImage = () => {
    saveAs(img, "OCR.jpg"); // Put your image url here.
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([img], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={false}
            width={imgWidth / 5}
            height={imgHeight / 5}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />

          <button id="captureBtn" className="button" onClick={capture}>
            SNAP
          </button>
        </>
      ) : (
        <>
          <img src={img} style={{ height: imgHeight / 5 }} alt="screenshot" />
          <button id="retakeBtn" onClick={() => setImg(null)}>
            RETAKE
          </button>
        </>
      )}
      <button id="downloadBtn" className="button" onClick={downloadImage}>
        SAVE
      </button>
      <button
        id="copyBtn"
        className="button"
        onClick={() => {
          navigator.clipboard.writeText(img);
        }}
      >
        COPY BASE64
      </button>
      <button id="downloadText" className="button" onClick={downloadTxtFile}>
        SAVE BASE64
      </button>
      <button id="checkRes" className="button">
        {/* CHECK {cameraRes.width + "x" + cameraRes.height}{" "} */}
        {portrait ? "port" : "land"} {screen.width} {screen.height}
      </button>
    </div>
  );
}

export default WebcamImage;
