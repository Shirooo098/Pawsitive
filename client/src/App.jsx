import AppRoute from "./router";
import { BrowserRouter} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { fetchBackendData } from "./services/api";

function App(){

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetchBackendData().then(setBackendData)
  }, [])

    return (
    <BrowserRouter>
      <AppRoute/>
    </BrowserRouter>
    )
}

export default App;