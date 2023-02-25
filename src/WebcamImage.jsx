import React, { useCallback, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Webcam from "react-webcam";
import "./WebcamImage.css";

function WebcamImage() {
  const [img, setImg] = useState(null);
  const [portrait, setPortrait] = useState(true);
  const [camera, setCamera] = useState({ width: null, height: null });
  const webcamRef = useRef(null);

  // const imgWidth = 4032
  // const imgHeight =3024
  console.log(camera.width, camera.height);

  window.onload = () => {
    const loadOrientation = window.matchMedia(
      "(orientation: portrait)"
    ).matches;
    if (portrait) {
      setCamera({
        width: portrait ? 4032 : 3024,
        height: portrait ? 3024 : 4032,
      });
    }
    console.log(loadOrientation);
    setPortrait(loadOrientation);
  };
  window
    .matchMedia("(orientation: portrait)")
    .addEventListener("change", (e) => {
      setPortrait(e.matches);
      setCamera({
        width: portrait ? 4032 : 3024,
        height: portrait ? 3024 : 4032,
      });

      // if (portrait) {
      //   setCamera({
      //     width: 4032,
      //     height: 3024,
      //   });
      // } else {
      //   setCamera({
      //     width: 3024,
      //     height: 4032,
      //   });
      // }

      console.log(camera.width, camera.height);
    });

  const videoConstraints = {
    // width: imgWidth,
    // height: imgHeight,
    width: camera.width,
    height: camera.height,
    facingMode: "environment",
    brightness: false,
    contrast: true,
  };

  const capture = useCallback(
    (portrait) => {
      if (portrait) {
        const imageSrc = webcamRef.current.getScreenshot({
          height: 4032,
          width: 3024,
        });
        console.log(imageSrc);
        setImg(imageSrc);
      } else {
        const imageSrc = webcamRef.current.getScreenshot({
          height: 3024,
          width: 4032,
        });
        console.log(imageSrc);
        setImg(imageSrc);
      }
    },
    [webcamRef]
  );

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
            width={"60%"}
            height={""}
            minScreenshotHeight={camera.height}
            minScreenshotWidth={camera.width}
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
          <img
            src={img}
            style={{
              width: "60%",
              height: "",
              aspectRatio: portrait ? 3 / 4 : 4 / 3,
            }}
            alt="screenshot"
          />
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
        {portrait ? "port" : "land"}
      </button>
    </div>
  );
}

export default WebcamImage;
