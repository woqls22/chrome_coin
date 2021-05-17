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
  TableRow,
  Typography,
} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CoinInfoDO, { CoinPrice, getCoinPrice } from "../Data/CoinInfoDO";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));
// const CoinRow=(data:CoinInfoDO)=>{
//   const [nowPrice,setNowPrice]=useState("1");
//   useEffect(()=>{
//     getCoinPrice(data.market,(res:CoinPrice)=>{
//       setNowPrice(res.trade_price);
//     })
//   })
// return (
//   <TableRow>
//     <TableCell><Button style={{fontSize:"9pt"}}>{data.korean_name} / {data.market}</Button></TableCell>
//     <TableCell style={{fontSize:"9pt"}}>{nowPrice}</TableCell>
//     <TableCell><Button><BookmarkBorderIcon/></Button></TableCell>
//   </TableRow>
// );
// }
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
    CoinStore.fetchCoinList();
  }, []);
  function findCode(text: string) {
    let result: CoinInfoDO[] = [];
    let stringList: string[] = [];
    for (var i = 0; i < CoinStore.coinList.length; i++) {
      if (
        CoinStore.coinList[i].korean_name.startsWith(text) ||
        CoinStore.coinList[i].english_name.startsWith(text)
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
    console.log(nowPrice);
    setSearchList(result);
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <SearchIcon style={{ marginTop: "auto", marginRight: "0.5rem" }} />
        <TextField
          label="코인명 검색"
          id="standard-size-small"
          size="small"
          onChange={textChange}
        />
      </div>
      {CoinStore.coinList.length > 0 && text.length > 1 ? (
        <>
          <div style={{ maxHeight: "200px", overflow: "auto" }}>
            <Table>
              {nowPrice.map((data: CoinPrice) => {
                return (
                  <>
                    {text.length > 1 && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="caption">{findName(data.market)} /</Typography>
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
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'￦'}
                          </Typography>
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
