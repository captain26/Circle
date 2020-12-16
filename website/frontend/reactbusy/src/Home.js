import React from "react"
import {API } from "./backend.js";



const getAllCategories = () =>{
    let headers = new Headers();

    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
  
    headers.append('GET', 'POST', 'OPTIONS');
  
    return fetch(`http://127.0.0.1:8000/busybeaver/home/`,{
      method:"GET",
      headers: headers
    }).then(response => {
     console.log(response.json());
     
    }).catch(err => console.log(err));
  }

export default function Home() {
     
    getAllCategories();
    return (
      <div>
        heloo
      </div>  
    );
}