import React, { useEffect, useState } from "react";
import { Card } from "../../core/Card.js";
import { API } from "../../backend.js";
import { getPortfolio, getPrices, getTotalData, getWatchlist, postPortfolio } from "../helper/profie.js";
import { PortfolioRow } from "./show_portfiolio.js";
import WatchlistTile from "../../core/watchlistTile.js";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [reload, setReload] = useState(false);
  const [value, setValue] = useState("");
  const [ticker, setTickers] = useState([]);
  const [company, setCompany] = useState("");
  const [newPortfolio, setNewPortfolio] = useState({
    units: "",
    price: "",
  });


  const [portfolioData,setPortfolioData] = useState({
    invested :"",
    current:""
  });
  
  const [watchlist, setWatchlist] = useState([]);
  const [current, setCurrent] = useState();

  const { units, price } = newPortfolio;
  const token = JSON.parse(sessionStorage.getItem("user")).token;

  var tempWatch = [];
  var tickers = [];

  //GET Total
  const getTotal = () => {
    getTotalData(token)
    .then((data) => setPortfolioData(data))
    .catch(() => setPortfolioData({
      invested: "",
      current: ""
    }))
  }
  //Get Portfolio
  const Portfolio = () => {
    getPortfolio(token).then((data) => {
      setPortfolio(data);

    }).catch(() => setPortfolio([]));
  };

  const onClick = (companyname) => {
    setCompany(companyname);
    setValue("");
  };


//GET SUM
const getSum = (data) => {
   var sum = 0;
    for(var i = 0; i< tickers.length; i++){
        sum = sum + data[tickers[i]];
    }
    setCurrent(sum);
}


  //GET Price 
  const Prices = () => {
    for(var i = 0 ;i < tempWatch.length ; i++){
        tickers.push(tempWatch[i].ticker_id);
    }
    console.log(tickers);
    getPrices(token, tickers)
    .then((data) => {
      getSum(data);
    })

  }
  //Get Watchlist
  const Watchlist = () => {
    getWatchlist(token).then((data) => {
      setWatchlist(data);
      tempWatch = data;
      Prices();

    }).catch(() => setWatchlist([]));
  };

  //get companyTIckers
  const getData = () => {
    fetch(`${API}/api/tickers/`, { method: "GET" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setTickers(json);
      }).catch(() => setTickers([]));
  };

  //setPortfolio Locally
  function handleChange(event) {
    const { name, value } = event.target;

    setNewPortfolio((prevPortfolio) => {
      return {
        ...prevPortfolio,
        [name]: value,
      };
    });
  }

  //Create Portfolio
  const submitPortfolio = (event) => {
    postPortfolio(company, units, price, token)
      .then((data) => {
        setReload(!reload);
      })
      .catch((err) => console.log(err));
    event.preventDefault();
    setNewPortfolio({
      units: "",
      price: "",
    });
    setCompany("");
  };

  function deleteCompany() {
    setCompany("");
  }

  useEffect(() => {
    getData();
    Portfolio();
    getTotal();
  }, [reload]);
  
  //For Reload Watchlist
  useEffect(() => {
    Watchlist();
    
  },[])

  return (
    <div>
      <div
        class="card"
        style={{
          padding: "10px",
          borderRadius: "10px",
          width: "80%",
          margin: "30px auto",
        }}
      >
        <div class="card-body" style={{ textAlign: "left" }}>
          <button
            type="button"
            className="btn"
            data-toggle="modal"
            data-target="#portfoliomodal"
            style={{
              color: "white",
              backgroundColor: "#4d52b5",
              position: "absolute",
              right: "30px",
            }}
          >
            + Add Portfolio
          </button>
          <div
            class="modal fade"
            id="portfoliomodal"
            tabindex="-1"
            role="dialog"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Add Portfolio
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {/* Add Portfolio */}
                <div class="modal-body">
                  <div style={{ position: "absolute", width: "93%" }}>
                    <Card class="card p-2" borderRadius="30px">
                      <input
                        autoComplete="off"
                        onChange={(event) => {
                          setValue(event.target.value);
                        }}
                        value={value}
                        className="search"
                        placeholder="Search Company"
                        style={{ border: "none", outline: "0" }}
                        type="text"
                        id="search"
                      ></input>
                      {ticker
                        .filter((val) => {
                          if (value === "") {
                            return value;
                          } else if (
                            val.ticker_id
                              .toLowerCase()
                              .includes(value.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .slice(0, 10)
                        .map((val, key) => {
                          return (
                            <div>
                              <ul className="list-group">
                                <div
                                  onClick={() => onClick(val.ticker_id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {val.ticker_id}
                                </div>
                              </ul>
                            </div>
                          );
                        })}
                    </Card>
                  </div>
                  <div style={{ marginTop: "55px" }}>
                    {company === "" ? null : (
                      <span
                        style={{
                          backgroundColor: "#4d52b5",
                          color: "white",
                          borderRadius: "15px",
                          padding: "3px 10px",
                        }}
                      >
                        {company}{" "}
                        <span onClick={() => deleteCompany()}>
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                      </span>
                    )}
                  </div>
                  <form>
                    <div class="form-group" style={{ marginTop: "10px" }}>
                      <input
                        name="units"
                        class="form-control"
                        onChange={handleChange}
                        autoComplete="off"
                        value={newPortfolio.units}
                        placeholder="Units"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        name="price"
                        class="form-control"
                        onChange={handleChange}
                        autoComplete="off"
                        value={newPortfolio.price}
                        placeholder="Purchase Price"
                      />
                    </div>
                    <center>
                      <button
                        type="button"
                        onClick={submitPortfolio}
                        data-dismiss="modal"
                        className="btn"
                        style={{ color: "white", backgroundColor: "#4d52b5" }}
                      >
                        Add
                      </button>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <h2 style={{ textAlign: "left", fontWeight: "bolder" }}>Portfolio</h2>
          <div class="row" style={{ marginTop: "30px" }}>
            <div class="col-md-4" style={{ marginBottom: "10px" }}>
              <h5 class="card-title" style={{ fontWeight: "bold" }}>
                Invested
              </h5>
              <p class="card-text" style={{}}>
                {portfolioData.invested | 0}
              </p>
            </div>
            <div class="col-md-4" style={{ marginBottom: "10px" }}>
              <h5 class="card-title" style={{ fontWeight: "bold" }}>
                Current
              </h5>
              <p class="card-text">{portfolioData.current | 0}</p>
            </div>
            <div class="col-md-4" style={{ marginBottom: "10px" }}>
              <h5 class="card-title" style={{ fontWeight: "bold" }}>
                P&L
              </h5>
              <p class="card-text" style={{}}>
                +1,00,000(
                <span style={{ color: "green", fontWeight: "bold" }}>+50%</span>
                )
              </p>
            </div>
          </div>
          {portfolio.map((port) => {
            var units = parseInt(port.units);
            var price = parseInt(port.purchase_price);
            return (
              <PortfolioRow
                price={price}
                units={units}
                name={port.ticker_id}
                token={token}
                reload={reload}
                setReload={setReload}
              />
            );
          })}
          {/* <h5 style={{ fontWeight: "bold", marginTop: "10px" }}>Watchlist</h5>
        <p style={{ marginBottom: "0px" }}>Reliance</p>
        <p style={{ marginBottom: "0px" }}>TATA Motors</p>
        <p style={{ marginBottom: "0px" }}>Vedanta</p> */}
        </div>
      </div>
      <div
        class="card"
        style={{
          padding: "10px",
          borderRadius: "10px",
          width: "80%",
          margin: "30px auto",
        }}
      >
        <h2 style={{textAlign:"left",padding:"10px"}}>Watchlist</h2>
        {watchlist.map((company) => {
          return <div style={{textAlign:"left"}}>
          <WatchlistTile ticker_id = {company.ticker_id}/>

          </div>
        })}
      
      </div>
    </div>
  );
}
