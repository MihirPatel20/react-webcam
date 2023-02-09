import React, { useCallback, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Webcam from "react-webcam";
import "./WebcamImage.css";

function WebcamImage() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  let imgWidth = 1920*1.7;  //3264
  let imgHeight = 1440*1.7;  //2448

  const videoConstraints = {
    width: imgWidth,
    height: imgHeight,
    facingMode: "environment",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const downloadImage = () => {
    saveAs(img, "OCR.jpg"); // Put your image url here.
  };

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={false}
            width={1000}
            height={750}
            // ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <div className="hiddenDiv">
            <Webcam
              audio={false}
              mirrored={false}
              width={imgWidth}
              height={imgHeight}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>

          <button id="captureBtn" className="button" onClick={capture}>
            SNAP
          </button>
        </>
      ) : (
        <>
          <img src={img}  alt="screenshot" />
          <button id="retakeBtn" onClick={() => setImg(null)}>
            Retake
          </button>
        </>
      )}
      <button id="downloadBtn" className="button" onClick={downloadImage}>
        SAVE
      </button>
    </div>
  );
}

export default WebcamImage;
