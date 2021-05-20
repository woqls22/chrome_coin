import logo from "./logo.svg";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import SearchBar from "./Components/SearchBar";
import Slider from '@material-ui/core/Slider';
import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState(100);
  const handleSliderChange = (event, newValue) => {
    if(newValue>10){
      setValue(newValue);
    }
  };
  return (
    <div className="App">
      <div style={{ flex: 1 , opacity:value*0.01}}>
        <div style={{marginTop:10, marginBottom:5}}>
          <Typography variant="body2">상사몰래 코인하기 </Typography>
          <Typography variant="caption">From Upbit 변동률 : 09:00 기준</Typography>
        </div>
        <div style={{minHeight:"300px"}}>
        <SearchBar />
        </div>
        <div style={{width:"50%", marginLeft:"auto", marginRight:"1rem", display:"flex"}}>
        <Typography variant="caption" style={{width:"30%", marginTop:"3pt", marginRight:"3pt"}}>투명도</Typography>
        <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
