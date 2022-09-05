import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import "./camera.css"
import * as faceapi from "face-api.js";

const Camera = () => {
  const camera = useRef();
  const cameraCanvas = useRef();
  const [results, setResults] = useState([]);

  const loadModels = () => {
    const MODEL_URL = `${process.env.PUBLIC_URL}/models`;
  
    return Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
    ]);
  };
  const detectFaces = async image => {
    if (!image) {
      return;
    }
  
    const imgSize = image.getBoundingClientRect();
    const displaySize = {width: imgSize.width, height: imgSize.height};
    if (displaySize.height === 0) {
      return;
    }
    console.log("where am i",process.env.PUBLIC_URL)
    const faces = await faceapi
      .detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions({inputSize: 320})
      )
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();
  
    return faceapi.resizeResults(faces, displaySize);
  };
  
   const drawResults = async (image, canvas, results, type) => {
    if (image && canvas && results) {
      const imgSize = image.getBoundingClientRect();
      const displaySize = {width: imgSize.width, height: imgSize.height};
      faceapi.matchDimensions(canvas, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      const resizedDetections = faceapi.resizeResults(results, displaySize);
      switch (type) {
        case "landmarks":
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          break;
        case "expressions":
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          break;
        case "box":
          faceapi.draw.drawDetections(canvas, resizedDetections);
          break;
        case "boxLandmarks":
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          break;
        default:
          break;
      }
    }
  };
  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      await drawResults(
        camera.current.video,
        cameraCanvas.current,
        faces,
        "boxLandmarks"
      );
      setResults(faces);
    }
  };

  const clearOverlay = canvas => {
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    loadModels()
    if (camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, []);

 

  return (
    <div className="camera">
      <div className="camera__wrapper">
      <div>This is HOME Page</div>
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas
          className=
            "webcam-overlay"
          ref={cameraCanvas}
        />
      </div>
        <>
          <div className="results__container">
          <div>
            <p>I think...</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div>
                  <p>
                    Your gerder is {result.gender} and Your face express  is 
                    {result.expressions.asSortedArray()[0].expression} and looks
                    around {Math.round(result.age)}. Your gender is {result.gender}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
    </div>
  );
};

export default Camera;