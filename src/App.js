import logo from "./logo.svg";
import "./App.css";
import Typography from "@material-ui/core/Typography";
import SearchBar from "./Components/SearchBar";
function App() {
  return (
    <div className="App">
      <div style={{ flex: 1 }}>
        <div style={{marginTop:10, marginBottom:5}}>
          <Typography variant="body2">상사몰래 코인하기 </Typography>
          <Typography variant="caption">From Upbit 변동률 : 09:00 기준</Typography>
        </div>
        <SearchBar />
      </div>
    </div>
  );
}

export default App;
