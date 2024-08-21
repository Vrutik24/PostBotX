import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SelectAPITestingMode from "./pages/SelectAPITestingMode/SelectAPITestingMode";
import ApiTesting from "./pages/APITesting/ApiTesting";
import AutomatedTesting from "./pages/AutomatedTesting/AutomatedTesting";
import ManualTesting from "./pages/ManualTesting/ManualTesting";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/select-testing-mode"
            element={<SelectAPITestingMode />}
          />
          <Route path="/api-testing" element={<ApiTesting />}>
            <Route path="automated-testing" element={<AutomatedTesting />} />
            <Route path="manual-testing" element={<ManualTesting />} />
          </Route>
          {/* <Route /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
