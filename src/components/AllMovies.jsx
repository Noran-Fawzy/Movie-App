import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import 'react-multi-carousel/lib/styles.css';

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=53d7709557618da9efa4cadb81d3584e";

    const getMovie = () => {
        fetch(url)
            .then(res => res.json())
            .then(json => setMovieList(json.results))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>All Movies</Typography>
            
            <Grid container spacing={3}>
                {movieList.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
    
                        <Link 
                            to={`/movie/${movie.id}`} 
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Card style={{ margin: '1rem', height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {movie.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button variant="contained" color="primary">
                    Show All
                </Button>
            </div>
        </Container>
    );
};

export default MovieList;