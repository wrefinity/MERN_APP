import Header from "./components/Header/Header";
import MainBody from "./Screen/Main/MainBody";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header />
      <main className="mt-24 p-8 w-full">
        <Routes>
          <Route path="/*" element={<MainBody />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
