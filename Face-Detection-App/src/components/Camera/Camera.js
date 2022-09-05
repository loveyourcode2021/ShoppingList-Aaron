import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";

import { detectFaces, drawResults } from "../../helpers/faceApi";
import Webcam from "react-webcam";

import "./Camera.css";


const Camera = ({ photoMode }) => {
  const camera = useRef();
  const cameraCanvas = useRef();
  const [results, setResults] = useState([]);

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
    if ( camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 100);
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
        <Webcam audio={false} ref={camera} width="100%" height="auto" />
        <canvas
          className={classnames(
            "webcam-overlay"
          )}
          ref={cameraCanvas}
        />
      </div>
        <>
        <div className="results__container">
            <p>I think...</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div>
                  <p>
                    One of you is probably {result.gender}, is looking{" "}
                    {result.expressions.asSortedArray()[0].expression} and looks
                    around {Math.round(result.age)}
                  </p>
                  <p> Your sex is result.gender</p>
                </div>

              </div>
            ))}
          </div>
     
       
        </>
    </div>
  );
};

export default Camera;