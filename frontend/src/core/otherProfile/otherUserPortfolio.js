import React, { useEffect, useState } from "react"
import { getOtherPortfolio } from "./helper/otherProfileApis";



export const OtherPortfolio = (props) => {

  const [portfolio, setPortfolio] = useState([]);

  const token = JSON.parse(sessionStorage.getItem('user')).token;

  const OtherPortfolio = () => {
    getOtherPortfolio(token, props.slug)
      .then((data) => {
        setPortfolio(data);
      }).catch(() => setPortfolio([]))
  }


  useEffect(() => {
    OtherPortfolio();
  }, []);

  return (
    <div class="card" style={{ padding: "10px", borderRadius: "10px", width: "80%", margin: "30px auto" }}>
      <div class="card-body" style={{ textAlign: "left" }}>
        <h2 style={{ textAlign: "left", fontWeight: "bolder" }}>Portfolio</h2>
       {portfolio.length == 0 ? <div>No Portfolio Added</div> : <div style={{ backgroundColor: "#e1e1e1", borderRadius: "10px", padding: "10px" }}>
          {portfolio.map((port) => {
            return (
              <div class="row">
                <div class="col-md-6" style={{ marginBottom: "" }}>
                  <h5 style={{ fontWeight: "bolder" }} >{port.ticker_id}</h5>
                </div>
              </div>
            );
          })}
          
        </div>}
        

        <h5 style={{ fontWeight: "bold", marginTop: "10px" }}>Watchlist</h5>
        <p style={{ marginBottom: "0px" }}>Reliance</p>
        <p style={{ marginBottom: "0px" }}>TATA Motors</p>
        <p style={{ marginBottom: "0px" }}>Vedanta</p>
      </div>
    </div>
  );
}