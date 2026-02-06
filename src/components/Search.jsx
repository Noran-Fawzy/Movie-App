import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";

const Search = () => {
    const [searchParams] = useSearchParams();
    const searchTerms = searchParams.get("q")
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const allMoviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=53d7709557618da9efa4cadb81d3584e";
            try {
                const response = await fetch(allMoviesUrl);
                const data = await response.json();
                const filteredResults = data.results.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerms.toLowerCase())
                )
                setSearchResults(filteredResults);
            }
            catch (error) {
                console.error("Error fetching search results: ", error);
                setSearchResults([]);
            }
        }
        fetchSearchResults();
    }, [searchTerms]);

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>Search Results for "{searchTerms}"</Typography>

<Grid container spacing={3}>
                {searchResults.map((movie) => (
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

        </Container>    
    )
}

export default Search;