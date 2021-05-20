import { observable, ObservableSet } from "mobx";
import CoinInfoDO, { getCoinList } from "../Data/CoinInfoDO";
function cho_hangul(str:string) {
  let cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  let result = "";
  for(var i=0;i<str.length;i++) {
    let code = str.charCodeAt(i)-44032;
    if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
  }
  return result;
}
interface CoinStore {
  coinList : CoinInfoDO[];
  fetchCoinList:()=>Promise<void>;
  setChoHangul:()=>void;
}

const CoinStore = observable<CoinStore>({
  coinList: [],
  fetchCoinList(){
    return getCoinList((data:CoinInfoDO[])=>{
      this.coinList = data;
    });
  },
  setChoHangul(){
    for(var i = 0; i< this.coinList.length;i++){
      this.coinList[i].cho_kor=cho_hangul(this.coinList[i].korean_name);
    }
  }
});
export default CoinStore;
