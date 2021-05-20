import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CoinStore from "../Stores/CoinStore";
import {
  Button,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CoinInfoDO, { CoinPrice, getCoinPrice } from "../Data/CoinInfoDO";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));
// function cho_hangul(str:string) {
//   let cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
//   let result = "";
//   for(var i=0;i<str.length;i++) {
//     let code = str.charCodeAt(i)-44032;
//     if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
//   }
//   return result;
// }
function convertToPercent(num: string) {
  let tmp = num;
  if ((parseFloat(tmp) * 100).toString().length > 5 && !(parseFloat(tmp) * 100).toString().includes("-")) {
    return "+"+(parseFloat(tmp) * 100).toString().substr(0, 4) + "%";
  }else if ((parseFloat(tmp) * 100).toString().length > 6 && (parseFloat(tmp) * 100).toString().includes("-")) {
    return (parseFloat(tmp) * 100).toString().substr(0, 5) + "%";
  }
  return (parseFloat(tmp) * 100).toString() + "%";
}
export default function SearchBar() {
  const classes = useStyles();
  const [text, setText] = useState("비트코인");
  const [searchList, setSearchList] = useState<CoinInfoDO[]>([]);
  const [cursorPos, setCursorPos] = useState(false);
  const [nowPrice, setNowPrice] = useState<CoinPrice[]>([]);
  const textChange = (e: any) => {
    if (e.target.value.length > 1) {
      setText(e.target.value);
      setInterval(() => {
        findCode(e.target.value);
      }, 400);
    }
  };
  const findName = (market: string) => {
    for (var i = 0; i < CoinStore.coinList.length; i++) {
      if (CoinStore.coinList[i].market == market) {
        return CoinStore.coinList[i].korean_name;
      }
    }
    return "";
  };
  useEffect(() => {
    CoinStore.fetchCoinList().then(()=>CoinStore.setChoHangul());
  }, []);
  function findCode(text: string) {
    let result: CoinInfoDO[] = [];
    let stringList: string[] = [];
    for (var i = 0; i < CoinStore.coinList.length; i++) {
      if (
        CoinStore.coinList[i].korean_name.startsWith(text) ||
        CoinStore.coinList[i].english_name.startsWith(text) || CoinStore.coinList[i].cho_kor.startsWith(text)
      ) {
        if (
          !stringList.includes(CoinStore.coinList[i].korean_name) &&
          CoinStore.coinList[i].market.includes("KRW-") &&
          text.length > 0
        ) {
          stringList.push(CoinStore.coinList[i].korean_name);
          result.push(CoinStore.coinList[i]);
        }
      }
    }

    let coinList = "";
    for (var i = 0; i < result.length; i++) {
      coinList = coinList + result[i].market + ",";
    }
    coinList = coinList.substr(0, coinList.length - 1);
    if (coinList.length > 0) {
      getCoinPrice(coinList, (res: CoinPrice[]) => {
        setNowPrice(res);
      });
    }
    setSearchList(result);
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <SearchIcon
          style={{
            marginTop: "auto",
            marginRight: "0.5rem",
            marginLeft: "4rem",
          }}
        />
        <TextField
          label="코인명 검색"
          id="standard-size-small"
          size="small"
          onChange={textChange}
        />
      </div>
      {CoinStore.coinList.length > 0 && text.length > 1 ? (
        <>
          <div style={{ maxHeight: "250px", overflow: "auto" }}>
            <Table>
              {nowPrice.map((data: CoinPrice) => {
                return (
                  <>
                    {text.length > 1 && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="caption">
                            {findName(data.market)}
                            {"      " + data.market}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell>
                        {data.prev_closing_price == data.trade_price ?<>
                          <Typography
                            variant="caption"
                          >
                            {" "}
                            {data.trade_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "￦"}
                          </Typography>
                        </>:<>
                          <Typography
                            variant="caption"
                            color={
                              data.prev_closing_price > data.trade_price
                                ? "primary"
                                : "secondary"
                            }
                          >
                            {" "}
                            {data.trade_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "￦"}
                          </Typography>
                        </>}
                         
                        </TableCell>
                        <TableCell>
                          {data.prev_closing_price == data.trade_price ? (
                            <>
                              <Typography variant="caption">
                                {"0.00%"}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography
                                variant="caption"
                                color={
                                  data.prev_closing_price > data.trade_price
                                    ? "primary"
                                    : "secondary"
                                }
                              >
                                {convertToPercent(
                                  data.signed_change_rate.toString()
                                )}
                              </Typography>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </Table>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
