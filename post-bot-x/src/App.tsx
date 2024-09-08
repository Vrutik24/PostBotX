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
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotificationContextProvider>
          <CollectionContextProvider>
            <APIContextProvider>
              <SnackbarProvider maxSnack={3}>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/api-testing" element={<ApiTesting />} />
                  </Routes>
                </BrowserRouter>
              </SnackbarProvider>
            </APIContextProvider>
          </CollectionContextProvider>
        </NotificationContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
