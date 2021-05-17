import { observable, ObservableSet } from "mobx";
import CoinInfoDO, { getCoinList } from "../Data/CoinInfoDO";
interface CoinStore {
  coinList : CoinInfoDO[];
  fetchCoinList:()=>Promise<void>;
}

const CoinStore = observable<CoinStore>({
  coinList: [],
  fetchCoinList(){
    return getCoinList((data:CoinInfoDO[])=>{
      this.coinList = data;
    });
  }
});
export default CoinStore;
