import React, { useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import { saveAs } from 'file-saver'
import "./OCR-camera.css";
// import "./style.scss";


const OCRCamera = () => {
  const [image, setImage] = useState(null);
  const [startScan, setStartScan] = useState(false);
  const [camPortrait, setCamPortrait] = useState(false);

  let videoConstraints = {
    width: { ideal: camPortrait ? 4032 : 2268 },
    height: { ideal: 3024 },
    aspectRatio: camPortrait ? 4 / 3 : 3 / 4,
    facingMode: "environment",
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(camPortrait);
    setImage(imageSrc);
    downloadImage(imageSrc);

  }, [webcamRef]);

  const downloadImage = (imgsrc) => {
    saveAs(imgsrc, `sample-data-${Date.now()}.jpg`) // Put your image url here.
  }

  return (
    <div className="ScanCamera">
      

        <button
          className="button-30 mb-3"
          onClick={() => {
            setStartScan(!startScan);
          }}
        >
          {startScan ? (
            <div className="startCameraButton">
              <span>
                Stop OCR Scan 
                {/* <NoPhotographyIcon style={{ color: "red" }} /> */}
              </span>
            </div>
          ) : (
            <span>Start OCR Scan 
                {/* <CameraAltIcon style={{ color: "green" }} /> */}
            </span>
          )}
        </button>
        {startScan && (<button class="button-30 mt-2 mb-2" onClick={() => {
          setCamPortrait((prev) => !prev)
          console.log(camPortrait);
        }}>
          {camPortrait ? "Portrait Mode" : "Landscape Mode"}
        </button>)}
      {startScan && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize={true}
            screenshotQuality={1}
            videoConstraints={videoConstraints}
            style={{
              width: camPortrait ? "70%" : "100%",
              height: ""
            }}
          />
          <button class="button-30 mt-2 mb-2" onClick={capture}>
            Capture photo
          </button>

          <div id="container">
            <div class="box">
              <img style={{ width: "", height: "25vh" }} src={image} alt="Captured" />
            </div>
            <div class="scanning"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default OCRCamera;
