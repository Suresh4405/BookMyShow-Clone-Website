// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Loginpage/Login";
import Register from "./Pages/Registerpage/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ProtectedRouter from "./Proteccomp/ProtectedRouter";
import Admin from "./Admin/Admin";
import User from "./Userpage/User";
import LandingPage from "./Pages/Landing/Landingpage";
import Homecomp from "./Home/Homecomp";
import Description from "./Cardpagedescription/Description"


function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>

            <Route path="/home" element={
                <ProtectedRouter>
                  <Homecomp />
                </ProtectedRouter>
              }
            />

            <Route path="/user" element={
                <ProtectedRouter>
                  <User />
                </ProtectedRouter>
              }
            />

            <Route path="/admin" element={
                <ProtectedRouter>
                  <Admin />
                </ProtectedRouter>
              }
            />
             <Route
            path="/movie/:id"
            element={
              <ProtectedRouter>
                <Description />
              </ProtectedRouter>
            }
          />
        

            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
           
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
