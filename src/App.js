import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import React from "react";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

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
    const handleSubmitChange = (frequence, noise) => {
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
      <div className="col-class">
        <h3>第一部分</h3>
        <div className="row-class" style={{ marginBottom: "30px" }}>
          <div style={{ marginRight: "10px" }}>頻率</div>
          <RangeSlider
            value={frequence}
            onChange={(changeEvent) => {
              handleSubmitChange(changeEvent.target.value, noise);
              setFrequence(changeEvent.target.value);
            }}
          />
        </div>
        <div className="row-class">
          <div style={{ marginRight: "10px" }}>聲音</div>
          <RangeSlider
            value={noise}
            onChange={(changeEvent) => {
              handleSubmitChange(frequence, changeEvent.target.value);
              setNoise(changeEvent.target.value);
            }}
          />
        </div>
        <img
          className="pageImg1"
          src="../Img/page.png"
          onClick={handleChangePage}
        />
        <button onClick={handleSubmitChange}>Submit</button>
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
            <div className="blobs" onClick={() => handleSubmitChange("part1")}>
              <h5>video1</h5>
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
            <div className="blobs" onClick={() => handleSubmitChange("part2")}>
              <h5>video2</h5>
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
            <div className="blobs" onClick={() => handleSubmitChange("part3")}>
              <h5>video3</h5>
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
            <div className="blobs" onClick={() => handleSubmitChange("part4")}>
              <h5>video4</h5>
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
            <div className="blobs" onClick={() => handleSubmitChange("part5")}>
              <h5>video5</h5>
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
            <div className="blobs" onClick={() => handleSubmitChange("part6")}>
              <h5>video6</h5>
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
  return (
    <div className="App">
      <h1>User</h1>
      {page === 1 ? <Part1 /> : <Part2 />}
    </div>
  );
}

export default App;
