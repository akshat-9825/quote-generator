import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/bookmarks" element={<LandingPage />} />
        <Route path="*" element={<> No page </>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
