import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box,
  Alert,
  Collapse,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UrlShortenerForm = ({ onSuccess }) => {
  const [urls, setUrls] = useState([{ originalUrl: '', validity: 30, shortCode: '' }]);
  const [errors, setErrors] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateShortCode = (code) => {
    if (!code) return true;
    return /^[a-zA-Z0-9_-]{3,20}$/.test(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    const validUrls = [];

    urls.forEach((url, index) => {
      if (!url.originalUrl) {
        newErrors[index] = { ...newErrors[index], originalUrl: 'URL is required' };
        return;
      }

      if (!validateUrl(url.originalUrl)) {
        newErrors[index] = { ...newErrors[index], originalUrl: 'Invalid URL format' };
        return;
      }

      if (!validateShortCode(url.shortCode)) {
        newErrors[index] = { ...newErrors[index], shortCode: 'Shortcode must be 3-20 alphanumeric characters' };
        return;
      }

      if (url.validity <= 0) {
        newErrors[index] = { ...newErrors[index], validity: 'Validity must be positive' };
        return;
      }

      validUrls.push(url);
    });

    setErrors(newErrors);

    if (validUrls.length === urls.length) {
      // Simulate API call
      validUrls.forEach(url => {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + url.validity);
        
        const shortCode = url.shortCode || generateRandomShortCode();
        
        onSuccess({
          originalUrl: url.originalUrl,
          shortCode,
          expiry,
          clicks: 0
        });
      });

      setAlertMessage('URLs shortened successfully!');
      setOpenAlert(true);
    } else {
      setAlertMessage('Please fix the errors in the form');
      setOpenAlert(true);
    }
  };

  const generateRandomShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', validity: 30, shortCode: '' }]);
    }
  };

  const handleRemoveUrl = (index) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Collapse in={openAlert}>
        <Alert
          severity={errors.length > 0 ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpenAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>

      {urls.map((url, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original URL"
              value={url.originalUrl}
              onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
              error={!!errors[index]?.originalUrl}
              helperText={errors[index]?.originalUrl}
              required
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              fullWidth
              label="Validity (minutes)"
              type="number"
              value={url.validity}
              onChange={(e) => handleChange(index, 'validity', parseInt(e.target.value) || 0)}
              error={!!errors[index]?.validity}
              helperText={errors[index]?.validity}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={5} sm={3}>
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              value={url.shortCode}
              onChange={(e) => handleChange(index, 'shortCode', e.target.value)}
              error={!!errors[index]?.shortCode}
              helperText={errors[index]?.shortCode}
            />
          </Grid>
          <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
            {urls.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveUrl(index)}
              >
                ×
              </Button>
            )}
          </Grid>
        </Grid>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handleAddUrl}
          disabled={urls.length >= 5}
        >
          Add Another URL (Max 5)
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Shorten URLs
        </Button>
      </Box>
    </form>
  );
};

export default UrlShortenerForm;
