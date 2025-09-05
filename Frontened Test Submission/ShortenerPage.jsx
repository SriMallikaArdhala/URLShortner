import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import CustomLogger from '../components/CustomLogger';

const ShortenerPage = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const logger = new CustomLogger();

  const handleShortenSuccess = (newUrl) => {
    setShortenedUrls(prev => [...prev, newUrl]);
    logger.log('URL shortened successfully', { url: newUrl.originalUrl });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <UrlShortenerForm onSuccess={handleShortenSuccess} />
      </Paper>
      
      {shortenedUrls.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>Shortened URLs</Typography>
          {shortenedUrls.map((url, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
              <Typography><strong>Original:</strong> {url.originalUrl}</Typography>
              <Typography><strong>Shortened:</strong> http://localhost:3000/{url.shortCode}</Typography>
              <Typography><strong>Expires:</strong> {new Date(url.expiry).toLocaleString()}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default ShortenerPage;
