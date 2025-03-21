import AppRoute from "./router";
import { BrowserRouter} from "react-router-dom";


function App(){

    return (
    <BrowserRouter>
      <AppRoute/>
    </BrowserRouter>
    )
}

export default App;