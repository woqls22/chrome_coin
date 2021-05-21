import logo from "./logo.svg";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import SearchBar from "./Components/SearchBar";
import Slider from "@material-ui/core/Slider";
import { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

function App() {
  const [value, setValue] = useState(100);
  const [invisibleTitle, setInvisibleTitle] = useState("visible");
  const handleSliderChange = (event, newValue) => {
    if (newValue > 10) {
      setValue(newValue);
    }
  };
  const handleTextVisibilityChange = (event) => {
    if (event.target.checked == true) {
      setInvisibleTitle("hidden");
    } else {
      setInvisibleTitle("visible");
    }
  };

  return (
    <div className="App">
      <div style={{ flex: 1, opacity: value * 0.01 }}>
        <div style={{ marginTop: 10, marginBottom: 5 }}>
          <Typography variant="body2" style={{ visibility: invisibleTitle }}>
            상사몰래 코인하기{" "}
          </Typography>
          <Typography variant="caption">
            From Upbit 변동률 : 09:00 기준
          </Typography>
        </div>
        <div style={{ minHeight: "300px" }}>
          <SearchBar />
        </div>
        <div
          style={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "1rem",
            display: "flex",
          }}
        >
          <Typography
            variant="caption"
            style={{ width: "30%", marginTop: "3pt", marginRight: "3pt" }}
          >
            투명도
          </Typography>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </div>
        <div style={{ display: "flex", marginLeft: "auto", float: "right" }}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            onChange={handleTextVisibilityChange}
          />
          <div style={{marginTop:"6pt", marginRight:"5pt"}}>제목가리기</div>
        </div>
      </div>
    </div>
  );
}

export default App;
