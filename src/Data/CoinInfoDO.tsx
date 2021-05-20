import { AxiosResponse } from "axios";
import axios from "axios";
export default class CoinInfoDO {
  constructor(
    public market: string,
    public korean_name: string,
    public english_name: string,
    public cho_kor:string="",
  ) {}
}
const headers = {
  "Content-Type": "application/json",
};
export class CoinPrice {
  constructor(
    public market:string,
    public trade_date:string,
    public trade_time:string,
    public trade_date_kst:string,
    public trade_time_kst:string,
    public trade_timestamp:string,
    public opening_price:string,
    public high_price:string,
    public low_price:string,
    public trade_price:string,
    public prev_closing_price:string,
    public change:string,
    public change_price:string,
    public change_rate:string,
    public signed_change_price:string,
    public signed_change_rate:string,
    public trade_volume:string,
    public acc_trade_price:string,
    public acc_trade_price_24h:string,
    public acc_trade_volume:string,
    public acc_trade_volume_24h:string,
    public highest_52_week_price:string,
    public highest_52_week_date:string,
    public lowest_52_week_price:string,
    public lowest_52_week_date:string,
    public timestamp:string
  ) {}
}
export function getCoinList(
  handleSuccessData?: (data: CoinInfoDO[]) => void
): Promise<any> {
  return GetAxios(
    `https://api.upbit.com/v1/market/all`,
    (response) => {
      handleSuccessData && handleSuccessData(response.data as CoinInfoDO[]);
    },
    (reason) => {
      console.log(reason);
    }
  );
}

export function getCoinPrice(
  market: string,
  handleSuccessData?: (data: CoinPrice[]) => void
): Promise<any> {
  return GetAxios(
    `https://api.upbit.com/v1/ticker?markets=`+market,
    (response) => {
      handleSuccessData && handleSuccessData(response.data as CoinPrice[]);
    },
    (reason) => {
      console.log(reason);
    }
  );
}
export function GetAxios(
  url: string,
  handleSuccess?: (response: AxiosResponse) => void,
  handleError?: (reason: any) => void,
  handleFinally?: () => void
): Promise<any> {
  const example = axios
    .get(url, { headers: headers })
    .then((response: AxiosResponse) => {
      handleSuccess && handleSuccess(response);
    })
    .catch((reason) => {
      handleError && handleError(reason);
    })
    .finally(() => {
      handleFinally && handleFinally();
    });

  return example;
}
