import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ApiTesting from "./pages/APITesting/ApiTesting";
import SignUp from "./pages/Login/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/Login/SignIn";
import { CollectionContextProvider } from "./contexts/CollectionContext";
import { APIContextProvider } from "./contexts/APIContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationContextProvider>
          <CollectionContextProvider>
            <APIContextProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/api-testing" element={<ApiTesting />} />
                </Routes>
              </BrowserRouter>
            </APIContextProvider>
          </CollectionContextProvider>
        </NotificationContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
