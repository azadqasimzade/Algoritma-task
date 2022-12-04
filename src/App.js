import { BrowserRouter as Router } from "react-router-dom";
import HeaderSection from "./components/HeaderSection";
import Routers from "./routes/Routes";

function App() {

  return (
    <Router>
      <HeaderSection/>
      <Routers />
    </Router>
  );
}

export default App;
