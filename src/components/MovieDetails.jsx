import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CardMedia, Typography, Box, Rating } from '@mui/material';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=53d7709557618da9efa4cadb81d3584e`;

    useEffect(() => {
        fetch(movieDetailsUrl)
            .then(res => res.json())
            .then(json => setMovie(json))
            .catch(err => console.error("Error fetching movie details: ", err));
    }, [id]);

    if (!movie) {
        return (
            <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
                <Typography variant="h5">Loading movie details...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <CardMedia
                component="img"
                height="600"
                style={{ width: '400px', borderRadius: '10px', objectFit: 'cover' }}
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
            />
            <Box>
                <Typography variant='h4' gutterBottom style={{ fontWeight: 'bold' }}>
                    {movie.title}
                </Typography>

                <Typography variant='body1' paragraph style={{ fontSize: '1.1rem', color: '#555', lineHeight:1.8 }}>
                    {movie.overview}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: '600', marginBottom: '1rem' }}>
                    Release Date: <span style={{ fontWeight: 'normal' }}>{movie?.release_date}</span>
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: '600' }}>
                    Type: <span style={{ fontWeight: 'normal' }}>
                        {movie?.genres?.map(genre => genre.name).join(", ")}
                    </span>
                </Typography>

                <Box style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                    <Typography variant="h6" style={{ fontWeight: '600', marginRight:'1rem' }}> Rating:</Typography>
                    <Rating
                        name="movie-rating"
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                    />
                    <Typography variant="body2" style={{ marginRight: '1rem' }}>
                        {movie.vote_count} 
                    </Typography>
                </Box>

            </Box>
        </Container>
    );
};

export default MovieDetails;