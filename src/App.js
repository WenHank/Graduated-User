import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css"; // or include from a CDN
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
      <div className="col-class">
        <h3>第一部分</h3>
        <div className="row-class" style={{ marginBottom: "30px" }}>
          <div style={{ marginRight: "10px" }}>頻率</div>
          <RangeSlider
            value={frequence}
            onChange={(changeEvent) => setFrequence(changeEvent.target.value)}
          />
        </div>
        <div className="row-class">
          <div style={{ marginRight: "10px" }}>聲音</div>
          <RangeSlider
            value={noise}
            onChange={(changeEvent) => setNoise(changeEvent.target.value)}
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
    //Update
    let theVideo = video;
    const handleSubmitChange = () => {
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
        <input value={video} disabled />
        <div className="row-class">
          <button className="vedio" onClick={() => setVideo("part1")}>
            Pasrt1
          </button>
          <button className="vedio" onClick={() => setVideo("part2")}>
            Pasrt2
          </button>
        </div>

        <img
          className="pageImg2"
          src="../Img/page.png"
          onClick={handleChangePage}
        />
        <button onClick={handleSubmitChange}>Submit</button>
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
