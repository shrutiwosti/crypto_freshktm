import './App.css';
import CryptoDetails from './pages/cryptoDetails';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from './pages/searchResults';



function App() {
return(
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cryptoDetails" element={<CryptoDetails/>} />
      <Route path="/searchResults" element={<SearchResults />} />

    </Routes>
  </Router>

)
}

export default App;
