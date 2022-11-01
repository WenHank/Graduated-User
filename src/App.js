import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import React from "react";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import useInterval from "@use-it/interval";
import { easeQuadInOut } from "d3-ease";

// Constants
const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
const STREAM_MUTATION_ODDS = 0.02;

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 50;

const MIN_INTERVAL_DELAY = 50;
const MAX_INTERVAL_DELAY = 100;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 8000;

const getRandInRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
  VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = () =>
  new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
    .fill()
    .map((_) => getRandChar());

const getMutatedStream = (stream) => {
  const newStream = [];
  for (let i = 1; i < stream.length; i++) {
    if (Math.random() < STREAM_MUTATION_ODDS) {
      newStream.push(getRandChar());
    } else {
      newStream.push(stream[i]);
    }
  }
  newStream.push(getRandChar());
  return newStream;
};

const RainStream = (props) => {
  const [stream, setStream] = useState(getRandStream());
  const [topPadding, setTopPadding] = useState(stream.length * -50);
  const [intervalDelay, setIntervalDelay] = useState(null);

  // Initialize intervalDelay
  useEffect(() => {
    setTimeout(() => {
      setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
    }, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
  }, []);

  useInterval(() => {
    if (!props.height) return;

    if (!intervalDelay) return;

    // If stream is off the screen, reset it after timeout
    if (topPadding > props.height) {
      setStream([]);
      const newStream = getRandStream();
      setStream(newStream);
      setTopPadding(newStream.length * -44);
      setIntervalDelay(null);
      setTimeout(
        () =>
          setIntervalDelay(
            getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY)
          ),
        getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS)
      );
    } else {
      setTopPadding(topPadding + 44);
    }
    // setStream(stream => [...stream.slice(1, stream.length), getRandChar()]);
    setStream(getMutatedStream);
  }, intervalDelay);

  return (
    <div
      style={{
        fontFamily: "matrixFont",
        color: "#43e5f7",
        writingMode: "vertical-rl",
        textOrientation: "upright",
        userSelect: "none",
        whiteSpace: "nowrap",
        marginTop: topPadding,
        marginLeft: -15,
        marginRight: -15,
        textShadow: "0px 0px 8px #43e5f7",
        fontSize: 30,
      }}
    >
      {stream.map((char, index) => (
        <a
          style={{
            marginTop: -12,
            // Reduce opacity for last chars
            opacity: index < 6 ? 0.1 + index * 0.15 : 1,
            color: index === stream.length - 1 ? "#fff" : undefined,
            textShadow:
              index === stream.length - 1
                ? "0px 0px 20px rgba(255, 255, 255, 1)"
                : undefined,
          }}
        >
          {char}
        </a>
      ))}
    </div>
  );
};

const MatrixRain = (props) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(null); // ?{width, height}

  useEffect(() => {
    const boundingClientRect = containerRef.current.getBoundingClientRect();
    setContainerSize({
      width: boundingClientRect.width,
      height: boundingClientRect.height,
    });
  }, []);

  const streamCount = containerSize ? Math.floor(containerSize.width / 26) : 0;

  return (
    <div
      style={{
        width: "460px",
        height: "200px",
        background: "#fff",
        overflow: "ignore",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        overflow: "hidden",
        borderRadius: "20px",
        margin: "10px",
        boxShadow: "5px 2px 12px 1px #a5a4a4",
      }}
      ref={containerRef}
    >
      {new Array(streamCount).fill().map((_) => (
        <RainStream height={containerSize?.height} />
      ))}
    </div>
  );
};

const roundedValue1 = 78;
const roundedValue2 = 56;
const roundedValue3 = 52;

function App() {
  const [video, setVideo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [frequenceUuid, setFrequenceUuid] = useState("06f2462716c");
  const [vedioUuid, setVedioUuid] = useState("39822c4b746");
  const [pageUuid, setPageUuid] = useState("f23c20b0339");
  const [page, setPage] = useState();
  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      Object.values(data).map((obj) => {
        if (obj.uuid === "f23c20b0339") {
          setPage(obj.thePage);
        }
      });
    });
  }, []);
  //write
  // const writeToDataBase = () => {
  //   const uuid = uid();
  //   set(ref(db, `/${uuid}`), {
  //     page,
  //     uuid,
  //   });
  // };

  //range slider
  const Part1 = () => {
    const [noise, setNoise] = useState(0);
    const [frequence, setFrequence] = useState(0);

    //Update
    const handleSubmitChange = () => {
      update(ref(db, `/${frequenceUuid}`), {
        frequence,
        noise,
      });
      setIsEdit(false);
      setVideo("");
    };
    const handleChangePage = () => {
      let thePage = 2;
      update(ref(db, `/${pageUuid}`), {
        thePage,
      });
    };

    return (
      <div className="ipadView">
        <div className="row-class">
          <div className="compass">
            <div className="compass-inner">
              <div className="north">N</div>
              <div className="east">E</div>
              <div className="west">W</div>
              <div className="south">S</div>
              <div className="main-arrow">
                <div className="arrow-up"></div>
                <div className="arrow-down"></div>
              </div>
            </div>
          </div>
          <MatrixRain />
          <div className="ButtonGroups">
            <div className="sosBtn"></div>
            <div className="btntext">SOS</div>
          </div>
        </div>
        <div className="row-class">
          <div className="col-class">
            <div className="circleContainer">
              <div className="row-class">
                <div className="firstCircle">
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={66}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      return (
                        <CircularProgressbar
                          value={value}
                          text={`${roundedValue1}%`}
                          styles={buildStyles({
                            pathTransition: "none",
                            textSize: "18px",
                            pathColor: `rgba(67, 229, 247, ${
                              roundedValue1 / 100
                            })`,
                            textColor: "#43e5f7",
                            trailColor: "#6f6f6f",
                            backgroundColor: "#6f6f6f",
                          })}
                        />
                      );
                    }}
                  </AnimatedProgressProvider>
                </div>
                <div className="secondCircle">
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={66}
                    duration={1.4}
                    easingFunction={easeQuadInOut}
                  >
                    {(value) => {
                      return (
                        <CircularProgressbar
                          value={value}
                          text={`${roundedValue2}%`}
                          styles={buildStyles({
                            pathTransition: "none",
                            textSize: "16px",
                            pathTransitionDuration: 0.5,
                            pathColor: `rgba(67, 229, 247, ${
                              roundedValue2 / 100
                            })`,
                            textColor: "#43e5f7",
                            trailColor: "#6f6f6f",
                            backgroundColor: "#6f6f6f",
                          })}
                        />
                      );
                    }}
                  </AnimatedProgressProvider>
                </div>
              </div>
              <div className="thirdCircle">
                <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={66}
                  duration={1.4}
                  easingFunction={easeQuadInOut}
                >
                  {(value) => {
                    return (
                      <CircularProgressbar
                        value={value}
                        text={`${roundedValue3}%`}
                        styles={buildStyles({
                          pathTransition: "none",
                          textSize: "16px",
                          pathTransitionDuration: 0.5,
                          pathColor: `rgba(67, 229, 247, ${
                            roundedValue3 / 100
                          })`,
                          textColor: "#43e5f7",
                          trailColor: "#6f6f6f",
                          backgroundColor: "#6f6f6f",
                        })}
                      />
                    );
                  }}
                </AnimatedProgressProvider>
              </div>
            </div>

            <div className="radar-box-area">
              <div className="radar-box">
                <div className="radar"></div>
                <span className="gps_signal"></span>
                <span className="gps_signal"></span>
                <span className="gps_signal"></span>
                <span className="gps_signal"></span>
              </div>
            </div>
          </div>
          <div className="controller">
            <input type="range" className="slider slider1" />
            <input type="range" className="slider slider2" />
            <input type="range" className="slider slider3" />
            <input type="range" className="slider slider4" />
            <input type="range" className="slider slider5" />
            <input type="range" className="slider slider6" />
          </div>
        </div>
      </div>
    );
  };
  const Part2 = () => {
    const [dur, setDur] = useState("10000ms");
    //Update
    let theVideo = video;
    const handleSubmitChange = (part) => {
      console.log(part);
      theVideo = part;
      update(ref(db, `/${vedioUuid}`), {
        theVideo,
      });
    };
    const handleChangePage = () => {
      let thePage = 1;
      update(ref(db, `/${pageUuid}`), {
        thePage,
      });
    };
    return (
      <div className="col-class">
        <h3>第二部分</h3>
        <div className="col-class">
          <div className="row-class">
            <div className="blobs">
              <div
                className="blob-title"
                onClick={() => handleSubmitChange("part1")}
              >
                video1
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(255, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(76, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="blobs">
              <div
                className="blob-title"
                onClick={() => handleSubmitChange("part2")}
              >
                video2
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(255, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(76, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="row-class">
            <div className="blobs">
              <div
                className="blob-title"
                onClick={() => handleSubmitChange("part3")}
              >
                video3
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(255, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(76, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="blobs">
              <div
                className="blob-title"
                onClick={() => handleSubmitChange("part4")}
              >
                video4
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(255, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(76, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="row-class">
            <div className="blobs">
              <div
                className="blob-title"
                onClick={() => handleSubmitChange("part5")}
              >
                video5
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(255, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(76, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="blobs">
              <div
                className="blob-title"
                onClick={() => handleSubmitChange("part6")}
              >
                video6
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(255, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
              <div className="blob">
                <svg
                  viewBox="0 0 800 500"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100%"
                  id="blobSvg"
                >
                  <g transform="translate(145.2598876953125, 12.940910339355469)">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "rgb(76, 161, 175)" }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: "rgb(196, 224, 229)" }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradient)">
                      <animate
                        attributeName="d"
                        dur={dur}
                        repeatCount="indefinite"
                        values="M415.5,300.5Q389,351,350.5,395Q312,439,254,428.5Q196,418,132.5,399.5Q69,381,55,315.5Q41,250,79,202Q117,154,156,117.5Q195,81,250,81Q305,81,355.5,108.5Q406,136,424,193Q442,250,415.5,300.5Z;
                M450,317Q435,384,379,429Q323,474,262.5,436Q202,398,137.5,388.5Q73,379,73,314.5Q73,250,90.5,198.5Q108,147,146.5,98Q185,49,242,73.5Q299,98,354,116Q409,134,437,192Q465,250,450,317Z;
                M434.5,297.5Q380,345,341,378Q302,411,247,420.5Q192,430,142,397.5Q92,365,52,307.5Q12,250,32,178Q52,106,122,88Q192,70,258.5,45.5Q325,21,374,73Q423,125,456,187.5Q489,250,434.5,297.5Z;
                M438.5,318Q437,386,382,437Q327,488,258.5,461Q190,434,125.5,410.5Q61,387,55.5,318.5Q50,250,61.5,185.5Q73,121,133,98Q193,75,258.5,48.5Q324,22,369,76.5Q414,131,427,190.5Q440,250,438.5,318Z;
                
                M436.5,302Q392,354,355.5,408Q319,462,252,456.5Q185,451,152,398Q119,345,88.5,297.5Q58,250,84,199Q110,148,151,109.5Q192,71,245,87Q298,103,355,118Q412,133,446.5,191.5Q481,250,436.5,302Z"
                      ></animate>
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <img
          className="pageImg2"
          src="../Img/page.png"
          onClick={handleChangePage}
        />
      </div>
    );
  };
  return <div className="App">{page === 1 ? <Part1 /> : <Part2 />}</div>;
}

export default App;

// <div className="col-class">
//   <h3>第一部分</h3>
//   <div className="row-class" style={{ marginBottom: "30px" }}>
//     <div style={{ marginRight: "10px" }}>頻率</div>
//     <RangeSlider
//       value={frequence}
//       onChange={(changeEvent) => {
//         setFrequence(changeEvent.target.value);
//       }}
//     />
//   </div>
//   <div className="row-class">
//     <div style={{ marginRight: "10px" }}>聲音</div>
//     <RangeSlider
//       value={noise}
//       onChange={(changeEvent) => {
//         setNoise(changeEvent.target.value);
//       }}
//     />
//   </div>
//   <img
//     className="pageImg1"
//     src="../Img/page.png"
//     onClick={handleChangePage}
//   />
//   <button onClick={handleSubmitChange}>Submit</button>
//   <audio controls autoplay>
//     <source src="../Music/500.mp3" type="audio/mpeg" />
//   </audio>
//   <audio controls autoplay>
//     <source src="../Music/JayChou.mp3" type="audio/mpeg" />
//   </audio>
// </div>
