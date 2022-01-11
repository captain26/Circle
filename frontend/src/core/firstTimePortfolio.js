import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import {API} from "../backend";
import { Card } from "../core/Card";
import {postWatchlist} from "./companyPage/helper/company";

export default function FirstTimePortfolio() {
  const [value, setValue] = useState("");
  const [ticker, setTickers] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState("");
  const [portfolioTicker, setPortfolioTicker] = useState([]);
  const [company, setCompany] = useState("");
  const [portfolio, setPortfolio] = useState([]);
  const [newPortfolio, setNewPortfolio] = useState({
    units: "",
    purchase_price: ""
  });
    
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  const [finalCompaniesWatchlist, setFinalCompaniesWatchlist] = useState([]);

  function deleteCompanyWatchlists(id) {
    setFinalCompaniesWatchlist(company => {
      return company.filter((companyname, index) => {
        return index !== id;
      });
    });
  }
  
  const onClickWatchlist = (companyname) => {
    let obj = {ticker_id: companyname}
    let arr = finalCompaniesWatchlist.concat(obj);
    setFinalCompaniesWatchlist(arr);
    setValue("");
  }

    //add watchlist
    const addWatchlist = () =>{
      postWatchlist(token, finalCompaniesWatchlist)
      .then((data) => {
      console.log('watchlist Added Successfully');
      })
    }  

  const onClick = (companyname) => {
    setCompany(companyname);
    setPortfolioValue("");
    setNewPortfolio(prev => {
      return {
        ...prev,
        ticker_id: companyname
      };
    });
  }

  function deleteCompany() {
    setCompany("");
  }

  const submitSinglePortfolio = () => {
    setPortfolio(oldArray => [...oldArray, newPortfolio]);
    setNewPortfolio({
      units: "",
      purchase_price: ""
    })
    setCompany("");
  }

  const onSubmit = () => {
    addWatchlist();
    postPortfolio();
  }

  const postPortfolio = () => {
    fetch(
      `${API}/api/portfolio/`,
      {
          method:"POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Token ${token}`
            },
            body: JSON.stringify(portfolio)
      }
  )
     .then(function (response) {
       return response.json();
     })
     .then(function (json) {
         console.log(json);
     });
 }

  const getData = () => {
    fetch(`${API}/api/tickers/`
      , { method: "GET" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setPortfolioTicker(json);
        setTickers(json);
      }).catch(() => setTickers([]));
  }

  function handleChangeForPortfolio(event) {
    const { name, value } = event.target;
    setNewPortfolio(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  useEffect(() => {
      getData();
  }, []);

  return (
  <div>
    <div className="row" style={{margin:"0px"}}>
        <div className="col-md-4" style={{backgroundColor:"#4d52b5", display:"flex",  justifyContent:"center",  alignItems:"center", minHeight:"100vh"}}>
            <h2 style={{color:"white"}}>BusyBeaver</h2>
        </div>
        <div className="col-md-8" style={{backgroundColor:"white",  display:"flex", justifyContent:"center",  alignItems:"center", minHeight:"100vh"}}>
            <form style={{width:"50%"}}>
      <div className="row">
        <div className="col-sm-8">
          <p style={{marginTop:"15px"}}>ADD COMPANIES TO WATCHLIST</p>
        </div>
        <div className="col-sm-4">

          <div style={{position:"absolute", zIndex:"1"}}>
                <Card class="card p-2" borderRadius="30px" >
                <input autoComplete="off" onChange={(event) => {
                  setValue(event.target.value);
                }} value={value} className= "search" placeholder="Search Company" style={{border: "none", outline:"0"}} type="text" id="search"></input>
                {ticker.filter((val) =>{
                  if(value === ""){
                    return value;
                  }else if(val.ticker_id.toLowerCase().includes(value.toLowerCase())){
                    return val;
                  }
                }).slice(0, 10).map((val,key) => {
                    return <div>
                      <ul className="list-group">
                        <div onClick={() => onClickWatchlist(val.ticker_id)} style={{cursor:"pointer"}}>
                          {val.ticker_id}
                        </div>
                      </ul>
                    </div>
                })
                }
                </Card>
            </div>

        </div>

     </div>
     <div className="row" style={{padding:"0px 5px"}}>
      {finalCompaniesWatchlist.map((company,index) => { 
        return (
          <div style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company.ticker_id}  <span onClick={() => deleteCompanyWatchlists(index)}><i class="fa fa-times" aria-hidden="true"></i></span></div>
        )})}
        </div>
     <hr style={{padding:"0px"}}></hr>

            <p style={{marginBottom:"0px"}}>ADD PORTFOLIO
            <button type="button" className="btn" data-toggle="modal" data-target="#portfoliomodal" style={{ color: "white", backgroundColor: "#4d52b5", marginLeft:"20px"}}>+ Add Portfolio</button>
            </p>
            <hr style={{padding:"0px"}}></hr>
            {portfolio.length !== 0 ? 
            <div>
              <div className="row">
                        <div className="col-sm-4">
                        <h5>Company</h5>
                        </div>
                        <div className="col-sm-4">
                        <h5>Price</h5>
                        </div>
                        <div className="col-sm-4">
                        <h5>Units</h5>
                        </div>
              </div>
           { portfolio.map((val, key) => {
                      return <div className="row">
                        <div className="col-sm-4">
                        {val.ticker_id}
                        </div>
                        <div className="col-sm-4">
                        {val.purchase_price}
                        </div>
                        <div className="col-sm-4">
                        {val.units}
                        </div>
                        </div>
                    }) }
                 </div>   
                    : null }
        <div class="modal fade" id="portfoliomodal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Portfolio</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* Add Portfolio */}
              <div class="modal-body">
                <div style={{ position: "absolute", width: "93%" }}>
                  <Card class="card p-2" borderRadius="30px" >
                    <input autoComplete="off" onChange={(event) => {
                      setPortfolioValue(event.target.value);
                    }} value={portfolioValue} className="search" placeholder="Search Company" style={{ border: "none", outline: "0" }} type="text" id="search"></input>
                    {portfolioTicker.filter((val) => {
                      if (portfolioValue === "") {
                        return portfolioValue;
                      } else if (val.ticker_id.toLowerCase().includes(portfolioValue.toLowerCase())) {
                        return val;
                      }
                    }).slice(0, 10).map((val, key) => {
                      return <div>
                        <ul className="list-group">
                          <div onClick={() => onClick(val.ticker_id)} style={{ cursor: "pointer" }}>
                            {val.ticker_id}
                          </div>
                        </ul>
                      </div>
                    })
                    }
                  </Card>
                </div>
                <div style={{ marginTop: "55px" }}>
                  {company === "" ? null : <span style={{ backgroundColor: "#4d52b5", color: "white", borderRadius: "15px", padding: "3px 10px" }}>{company} <span onClick={() => deleteCompany()}><i class="fa fa-times" aria-hidden="true"></i></span></span>}
                </div>
                <form>
                  <div class="form-group" style={{ marginTop: "10px" }}>
                    <input
                      name="units"
                      class="form-control"
                      onChange={handleChangeForPortfolio}
                      autoComplete="off"
                      value={newPortfolio.units}
                      placeholder="Units"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      name="purchase_price"
                      class="form-control"
                      onChange={handleChangeForPortfolio}
                      autoComplete="off"
                      value={newPortfolio.purchase_price}
                      placeholder="Purchase Price"
                    />
                  </div>
                  <center>
                    <button type="button" onClick={() => submitSinglePortfolio()} data-dismiss="modal" className="btn" style={{ color: "white", backgroundColor: "#4d52b5" }}>Add</button>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>



            <center>
              <Link to="/"><button type="button" onClick={() => onSubmit()} className="btn" style={{ color: "white", backgroundColor: "#4d52b5", marginTop:"30px" }}>Submit</button></Link>
            </center>       
        </form>
        </div>
    </div>
  </div>
  );
}