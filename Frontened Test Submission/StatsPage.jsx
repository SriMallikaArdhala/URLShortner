import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomLogger from '../components/CustomLogger';

const StatsPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const logger = new CustomLogger();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const generateClickData = useMemo(() => {
    return Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => ({
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      source: ['Direct', 'Social', 'Email', 'Search'][Math.floor(Math.random() * 4)],
      location: ['USA', 'Canada', 'UK', 'India', 'Australia'][Math.floor(Math.random() * 5)]
    }));
  }, []);

  useEffect(() => {
    const loadStats = () => {
      try {
        const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
        const statsWithClicks = savedUrls.map(url => ({
          ...url,
          createdAt: url.createdAt || Date.now(),
          clicks: Math.floor(Math.random() * 100),
          clickData: generateClickData
        }));
        setStats(statsWithClicks);
        logger.log('Statistics loaded', { count: statsWithClicks.length });
      } catch (err) {
        setError('Failed to load statistics');
        logger.error('Error loading stats', { error: err.message });
      } finally {
        setLoading(false);
      }
    };

    loadStats();

    return () => {
      // Cleanup if needed
    };
  }, [generateClickData, logger]);

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading statistics...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        URL Statistics
      </Typography>
      
      {stats.length === 0 ? (
        <Typography variant="body1">No shortened URLs available</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                {!isMobile && <TableCell>Original URL</TableCell>}
                <TableCell>Created</TableCell>
                <TableCell>Expires</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <a 
                      href={`${window.location.origin}/${stat.shortCode}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: theme.palette.primary.main }}
                    >
                      /{stat.shortCode}
                    </a>
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {stat.originalUrl}
                    </TableCell>
                  )}
                  <TableCell>
                    {new Date(stat.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(stat.expiry).toLocaleString()}
                  </TableCell>
                  <TableCell>{stat.clicks}</TableCell>
                  <TableCell>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle2">Click Analytics</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {stat.clickData.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Source</TableCell>
                                <TableCell>Location</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {stat.clickData.map((click, i) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    {new Date(click.timestamp).toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <Chip label={click.source} size="small" color="primary" />
                                  </TableCell>
                                  <TableCell>{click.location}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Typography variant="body2">No click data available</Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

StatsPage.propTypes = {
  // Add any props if needed
};

export default StatsPage;
