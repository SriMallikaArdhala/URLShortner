import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const UrlShortenerForm = () => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortCode, setShortCode] = useState('');

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        URL Shortener
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
        VRL Shortener
      </Typography>

      <Box component="form" sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Original URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Validity (minutes)"
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            InputProps={{ inputProps: { min: 1 } }}
          />
          <TextField
            fullWidth
            label="Custom Shortcode (optional)"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            InputProps={{
              endAdornment: shortCode && (
                <InputAdornment position="end">
                  <IconButton>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Add Another URL (Max 5)
          </Button>
          <Button 
            variant="contained" 
            size="large"
            sx={{ px: 4 }}
          >
            Shorten URLs
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
