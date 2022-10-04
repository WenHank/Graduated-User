import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from "react";

function App() {
  const [red, setRed] = useState(244);
  const [green, setGreen] = useState(244);
  const [blue, setBlue] = useState(244);
  const [song, setSong] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [rgbUuid, setRgbUuid] = useState("06f2462716c");
  const [songUuid, setSongUuid] = useState("39822c4b746");

  const handleRedcahnge = (e) => {
    setRed(e.target.value);
  };
  const handleGreencahnge = (e) => {
    setGreen(e.target.value);
  };
  const handleBluecahnge = (e) => {
    setBlue(e.target.value);
  };

  //write
  // const writeToDataBase = () => {
  //   const uuid = uid();
  //   set(ref(db, `/${uuid}`), {
  //     song,
  //     uuid,
  //   });
  // };

  //Update
  const handleSubmitChange = () => {
    update(ref(db, `/${rgbUuid}`), {
      red,
      green,
      blue,
    });
    update(ref(db, `/${songUuid}`), {
      song,
    });
    setIsEdit(false);
    setSong("");
    setBlue(244);
    setGreen(244);
    setRed(244);
  };

  //Delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };
  return (
    <div
      className="App"
      style={{ background: `rgb(${red}, ${green}, ${blue})` }}
    >
      <h1>User</h1>

      <div className="InputCon">
        <p>Red</p>
        <input type="text" value={red} onChange={handleRedcahnge}></input>
      </div>
      <div className="InputCon">
        <p>Green</p>
        <input type="text" value={green} onChange={handleGreencahnge}></input>
      </div>
      <div className="InputCon">
        <p>Blue</p>
        <input type="text" value={blue} onChange={handleBluecahnge}></input>
      </div>
      <div className="InputCon">
        <p>Vedio</p>
        <input type="text" disabled value={song}></input>
      </div>
      <div className="row-class">
        <button
          onClick={() => {
            setSong("part1");
          }}
        >
          part1
        </button>
        <button
          onClick={() => {
            setSong("part2");
          }}
        >
          part2
        </button>
      </div>
      {/* <div className="col-class">
        <div className="row-class">
          <div>
            <img
              className="albumImg"
              src="../Img/500.jpeg"
              onClick={() => {
                setSong("500");
              }}
            />
            <h3>被動</h3>
          </div>
          <div>
            <img
              className="albumImg"
              src="../Img/JayChou.jpeg"
              onClick={() => {
                setSong("JayChou");
              }}
            />
            <h3>雙截棍</h3>
          </div>
          <div>
            <img
              className="albumImg"
              src="../Img/JayPark.jpeg"
              onClick={() => {
                setSong("JayPark");
              }}
            />
            <h3>All I Wanna Do</h3>
          </div>
        </div>
        <div className="row-class">
          <div>
            <img
              className="albumImg"
              src="../Img/kanaria.jpeg"
              onClick={() => {
                setSong("kanaria");
              }}
            />
            <h3>酔いどれ知らず</h3>
          </div>
          <div>
            <img
              className="albumImg"
              src="../Img/ShawnMendes.jpeg"
              onClick={() => {
                setSong("ShawnMendes");
              }}
            />
            <h3>When You're Gone</h3>
          </div>
          <div>
            <img
              className="albumImg"
              src="../Img/Maroon5.jpeg"
              onClick={() => {
                setSong("Maroon5");
              }}
            />
            <h3>Payphone</h3>
          </div>
        </div>
      </div> */}

      <button onClick={handleSubmitChange}>Submit</button>
    </div>
  );
}

export default App;
