import React, {useEffect, useState} from "react"

export default function App() {



  const [data, setData] = useState([]);


  const getData=()=>{
    fetch('http://127.0.0.1:8000/busybeaver/home/'
    ,{method:"GET"})
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson);
      });
    }

    useEffect(() => {
      getData();
    }, []);

  return (
    <div>
      <h1>Hello</h1>
      <p>{data.company_name}</p>
      <p>{data.user1}</p>
    </div>
  );
}