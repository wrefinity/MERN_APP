import Header from "./components/Header/Header";
import MainBody from "./Screen/Main/MainBody";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout";
function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* unprotected route  */}
          <Route path="/" element={<MainBody />} />
          <Route path="login" />
          <Route path="register" />
          <Route path="about-us" />
          <Route path="contact-us" />
          <Route path="services" />

          {/* for protected routes */}
          <Route element={<RequireAuth allowedRoles={[]}/>} > 
          {/* <Route path="register" /> */}
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
