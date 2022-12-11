import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Routers from "./routes/Routes";

function App() {

  return (
    <Router>
      <Header/>
      <Routers />
    </Router>
  );
}

export default App;
