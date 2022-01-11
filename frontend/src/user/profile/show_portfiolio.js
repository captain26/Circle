import React, { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "react-bootstrap/Modal";
import Fab from "@material-ui/core/Fab";
import { editPortfolio, deletePortfolio, getPrices } from "../helper/profie.js";

export const PortfolioRow = (props) => {
  var { price, units, name } = props;

  const [portfolio, setPortfolio] = useState({
    ticker_id: "",
    units: "",
    price: "",
  });

  const [reload, setReload] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => {
    setReload(!reload);
    setShowEdit(true);
  };
  const [prices, setPrice] = useState();

  function handleChange(event) {
    const { name, value } = event.target;

    setPortfolio((prevPortfolio) => {
      return {
        ...prevPortfolio,
        [name]: value,
      };
    });
  }

  //Get Prices
  const Prices = () => {
    getPrices(props.token, [props.name]).then((data) => {
      setPrice(data[props.name]);
    });
  };
  //DeletePortfolio
  const Delete = () => {
    deletePortfolio(portfolio.ticker_id, props.token).then((data) => {
      props.setReload(!props.reload);
    });
  };

  // edit Portfolio
  const changePortfolio = () => {
    handleEditClose();

    editPortfolio(
      portfolio.ticker_id,
      portfolio.units,
      portfolio.price,
      props.token
    )
      .then((data) => {
        console.log(`this is data ${data}`);
        props.setReload(!props.reload);
      })
      .catch((err) => console.log(err));
  };

  const editPort = () => {
    return (
      <Modal show={showEdit} onHide={handleEditClose}>
        <Modal.Header>
          <Modal.Title>{portfolio.ticker_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="edit-note" style={{ margin: "30px" }}>
            <label>Units</label>
            <input
              name="units"
              onChange={handleChange}
              value={portfolio.units}
            />
            <hr></hr>
            <label>Price</label>
            <input
              name="price"
              onChange={handleChange}
              value={portfolio.price}
              rows="3"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Fab onClick={changePortfolio}>Edit</Fab>
        </Modal.Footer>
      </Modal>
    );
  };
  useEffect(() => {
    setPortfolio({
      ticker_id: name,
      price: price,
      units: units,
    });
    Prices();
  }, [reload]);

  return (
    <div
      style={{
        backgroundColor: "#e1e1e1",
        padding: "5px 10px",
        borderRadius: "10px",
        marginBottom: "15px",
      }}
    >
      <Fab
        className="edit"
        onClick={handleEditShow}
        style={{ position: "absolute", right: "30px" }}
      >
        <EditIcon />
      </Fab>
      <button className="btn btn-dark" onClick={Delete}>
        Delete
      </button>
      <h6 style={{ fontWeight: "bold", marginTop: "10px" }}>
        Qty : {units} Avg. : &#8377; {price}
      </h6>

      <div class="row">
        <div class="col-md-6" style={{ marginBottom: "" }}>
          <h5 style={{ fontWeight: "bolder" }}>{name}</h5>
        </div>
        <div class="col-md-6" style={{ marginBottom: "" }}>
       
        </div>
      </div>
      {editPort()}
      <div class="row">
        <div class="col-md-6" style={{ marginBottom: "" }}>
          <h6 style={{}}>Invested &#8377; {price * units}</h6>
        </div>
        <div class="col-md-6" style={{ marginBottom: "" }}>
          <h6 style={{}}>
            LTP {prices}    
          </h6>
        </div>
      </div>
    </div>
  );
};
