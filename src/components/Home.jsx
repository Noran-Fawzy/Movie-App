import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'; 
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom'; 

const MovieList = () => {
    const allMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=53d7709557618da9efa4cadb81d3584e";
    const featureMoviesUrl = "https://api.themoviedb.org/3/movie/popular?api_key=53d7709557618da9efa4cadb81d3584e";
    const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=53d7709557618da9efa4cadb81d3584e";
    
    const [movieList, setMovieList] = useState([]);
    const [featureMovies, setFeatureMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const getMovies = () => {
        fetch(allMoviesUrl).then(res => res.json()).then(json => setMovieList(json.results));
        fetch(featureMoviesUrl).then(res => res.json()).then(json => setFeatureMovies(json.results));
        fetch(upcomingMoviesUrl).then(res => res.json()).then(json => setUpcomingMovies(json.results));
    };

    useEffect(() => { getMovies(); }, []);

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
        desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
        tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
    };

    const renderMovieCards = (movies) => movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
            <Card style={{ margin: '1rem', borderRadius: '10px', cursor: 'pointer' }}> 
                <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                />
                <CardContent>
                    <Typography variant="h6" noWrap title={movie.title} color="textPrimary">
                        {movie.title}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    ));

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem', paddingBottom: '3rem' }}> 
            
            {/*  Featured Movies */}
            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                Featured Movies
            </Typography>
            <Carousel autoPlay responsive={responsive} infinite={true}> 
                {renderMovieCards(featureMovies)}
            </Carousel>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 4 }}>
    <Link to="/features" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
            Show All Features
        </Button>
    </Link>
</Box>

            {/*  Upcoming Movies */}
            <Typography variant="h4" gutterBottom style={{ marginTop: '3rem', fontWeight: 'bold', color: '#1976d2' }}>
                Upcoming Movies
            </Typography>
            <Carousel responsive={responsive} infinite={true}> 
                {renderMovieCards(upcomingMovies)}
            </Carousel>

            {/*  All Movies */}
            <Typography variant="h4" gutterBottom style={{ marginTop: '3rem', fontWeight: 'bold', color: '#1976d2' }}>
                All Movies
            </Typography> 
            <Carousel responsive={responsive} infinite={true}> 
                {renderMovieCards(movieList)}
            </Carousel>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link to="/movies" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Show All Movies</Button>
                </Link>
            </Box>

        </Container>
    );
};

export default MovieList;