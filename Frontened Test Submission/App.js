import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" href="/">Shortener</Button>
          <Button color="inherit" href="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;