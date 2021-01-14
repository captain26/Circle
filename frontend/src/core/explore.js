import React from "react"
import Base from "./Base.js"
import {Line} from 'react-chartjs-2';

const yearState = {
  labels: ['', 'February', 'March',
           'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [367, 576, 235,157, 238, 102, 56, 367, 30, 279, 488, 49]
    }
  ]
}

const monthState = {
  labels: ['01 December', '02 December', '03 December',
           '04 December', '05 December', '06 December', '07 December', '08 December', '09 December', '10 December'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [235, 157, 238, 102, 56, 367, 30, 279, 488, 49]
    }
  ]
}

const dayState = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [367,  238, 102, 153, 30, 279, 488, 49]
    }
  ]
}

const hourState = {
  labels: ['15:00', '15:10', '15:20',
           '15:30', '15:40', '15:50', '16:00'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [367, 270, 279, 488, 49, 179, 390]
    }
  ]
}

export default function Explore() {
  return (
  <div>
  <Base>
    <h1>Empty Page</h1>
  </Base>
  </div>
  );
}