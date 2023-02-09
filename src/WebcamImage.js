import React, { useCallback, useRef, useState } from "react";
import { saveAs } from "file-saver";
import Webcam from "react-webcam";
import './WebcamImage.css'

function WebcamImage() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  let imgWidth = 4000;
  let imgHeight = 3000;

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
            height={imgWidth/10}
            width={imgWidth/10}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <div className="hiddenDiv">
            <Webcam
              audio={false}
              mirrored={false}
              height={imgHeight}
              width={imgWidth}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>

          <button id="captureBtn" className="button" onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button id="retakeBtn" onClick={() => setImg(null)}>Retake</button>
        </>
      )}
      <button id="downloadBtn" className="button" onClick={downloadImage}>
        Download!
      </button>
    </div>
  );
}

export default WebcamImage;
