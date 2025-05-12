import "./App.css";
import CountryDetails from "./Pages/CountryDetails";
import CountryRankingPage from "./Pages/CountryRankingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<CountryRankingPage />} />
          <Route path="/countries/:countryCode" element={<CountryDetails />} />

          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
