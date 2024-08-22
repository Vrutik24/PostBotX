import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SelectAPITestingMode from "./pages/SelectAPITestingMode/SelectAPITestingMode";
import ApiTesting from "./pages/APITesting/ApiTesting";
import AutomatedTesting from "./pages/AutomatedTesting/AutomatedTesting";
import ManualTesting from "./pages/ManualTesting/ManualTesting";
import SignUp from "./pages/Login/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/Login/SignIn";
import { CollectionContextProvider } from "./contexts/CollectionContext";
import { APIContextProvider } from "./contexts/APIContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CollectionContextProvider>
          <APIContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/select-testing-mode"
                  element={<SelectAPITestingMode />}
                />
                <Route path="/api-testing" element={<ApiTesting />}>
                  <Route
                    path="automated-testing"
                    element={<AutomatedTesting />}
                  />
                  <Route path="manual-testing" element={<ManualTesting />} />
                </Route>
                {/* <Route /> */}
              </Routes>
            </BrowserRouter>
          </APIContextProvider>
        </CollectionContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
