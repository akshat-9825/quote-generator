import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import LandingPage from "./components/Landing";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LandingPage type="home" />} />
          <Route path="/home" element={<LandingPage type="home" />} />
          <Route path="/bookmarks" element={<LandingPage type="bookmarks" />} />
          <Route path="*" element={<> No page </>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
