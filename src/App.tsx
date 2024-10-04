import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import Pick from "./Routes/Pick";
import Login from "./Routes/Login";
import { LikedMoviesProvider } from "./context/LikedMoviesContext";

function App() {
  return (
    <LikedMoviesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="tv" element={<Tv />} />
          <Route path="pick" element={<Pick />} />
          <Route path="search" element={<Search />} />
          <Route path="home" element={<Home />} />
          <Route path="movies/:id" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LikedMoviesProvider>
  );
}

export default App;
