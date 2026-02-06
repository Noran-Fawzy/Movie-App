import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{
            backgroundColor: 'primary.main', 
            color: '#fff',
            py: 3,
            textAlign: 'center',
            marginTop: 'auto' 
        }}>
            <Container maxWidth="lg">
                <Typography variant='body2' sx={{ mt: 1 }}>
                &copy; {new Date().getFullYear()} Movie App. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;