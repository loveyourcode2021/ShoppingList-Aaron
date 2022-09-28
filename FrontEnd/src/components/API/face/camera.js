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
    const displaySize = { width: imgSize.width, height: imgSize.height };
    if (displaySize.height === 0) {
      return;
    }

    const faces = await faceapi
      .detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
      )
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    return faceapi.resizeResults(faces, displaySize);
  };

  const drawResults = async (image, canvas, results, type) => {
    if (image && canvas && results) {
      const imgSize = image.getBoundingClientRect();
      const displaySize = { width: imgSize.width, height: imgSize.height };
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
    if (canvas?.current) {
      canvas.current
        .getContext("2d")
        .clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    loadModels().then(loaded => {
      if (camera !== null) {
        const ticking = setInterval(async () => {
          await getFaces();
        }, 80);
        return () => {
          clearOverlay(cameraCanvas);
          clearInterval(ticking);
        };
      } else { // camera equals null
        return clearOverlay(cameraCanvas);
      }
    })
  }, []);

  // let status = "";

  // if (!camera.current?.video) {
  //   status = "Connecting to camera..."
  // }
  // if (camera.current?.video) {
  //   status = "Generating facial recognition profile..."
  // }
  // if (results.length > 0) {
  //   status = "Results:"
  // }


  return (
    <div className="camera">
      <h3 className="home__label">Welcome to Friendly Amazon Product Aanlyzer</h3>
      <div className="camera__wrapper">

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
            {/* <p>{status}</p> */}
            {results.length > 0 && results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div>
                  <p>
                    Your gender is {" "}<span className="emphasize_result">{result.gender}</span> and Your face expression  is
                    {" "}<span className="emphasize_result">{result.expressions.asSortedArray()[0].expression}</span> and looks
                    around <span className="emphasize_result">{Math.round(result.age)}</span>.
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