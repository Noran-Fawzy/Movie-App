import Home from './components/Home';
import MovieDetails from './components/MovieDetails'; 
import AllMovies from './components/AllMovies'; 
import Features from './components/Features';
import Navbar from './Navbar';
import Search from './components/Search';
import Upcoming from './components/Upcoming';
import Footer from './Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

  function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        
        <Route path="/movie/:id" element={<MovieDetails />} /> 
        
        <Route path="/movies" element={<AllMovies />} /> 
        
        <Route path="/features" element={<Features />} /> 

        <Route path="/search" element={<Search />} /> 

        <Route path="/upcoming" element={<Upcoming />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;