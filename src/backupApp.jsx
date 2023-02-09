import "./App.css";
import Webcam from "react-webcam";
import { useCallback, useRef } from "react";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  return (
    <div className="App">
      <div className="cameraStream">
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
}

export default App;
