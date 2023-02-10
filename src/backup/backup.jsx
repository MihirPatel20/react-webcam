const checkDimentions = async () => {
    // suppose we require a full HD video
    let constraints = {
      video: {
        width: { ideal: 8000 },
        height: { ideal: 6000 },
      },
    };

    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    let stream_settings = stream.getVideoTracks()[0].getSettings();
    // actual width & height of the camera video
    let stream_width = stream_settings.width;
    let stream_height = stream_settings.height;

    setCameraRes({
      width: stream_width,
      height: stream_height,
    });

    console.log("Width: " + stream_width + "px");
    console.log("Height: " + stream_height + "px");
  };