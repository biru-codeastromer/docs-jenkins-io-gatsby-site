import React from "react";
import { Typography, Link, Box, Chip, Stack } from "@mui/material";
import { Link as GatsbyLink } from "gatsby";

const ReleaseHeader = ({ release, url, entry = false, showRatings = false }) => {
  const HeaderComponent = entry ? 'h1' : 'h2';
  
  return (
    <Box sx={{ marginBottom: '2rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <HeaderComponent 
          id={`v${release.version}`}
          sx={{
            fontFamily: '"Georgia", serif',
            fontWeight: entry ? 'bold' : 600,
            fontSize: entry ? '2rem' : '1.5rem',
            color: 'inherit',
            margin: 0,
          }}
        >
          {entry ? (
            `Changelog for ${release.version}`
          ) : (
            <Link 
              component={GatsbyLink} 
              to={`/${url}/${release.version}/`}
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {release.version}
            </Link>
          )}
        </HeaderComponent>
        
        {showRatings && (
          <Stack direction="row" spacing={1}>
            <Chip 
              label={`${release.upvotes || 0} 👍`} 
              size="small" 
              sx={{ 
                backgroundColor: '#4CAF50',
                color: '#ffffff'
              }} 
            />
            <Chip 
              label={`${release.downvotes || 0} 👎`} 
              size="small" 
              sx={{ 
                backgroundColor: '#F44336',
                color: '#ffffff'
              }} 
            />
          </Stack>
        )}
      </Box>
      
      {release.date && (
        <Typography variant="body2" sx={{ 
          color: '#6c757d',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}>
          {new Date(release.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
      )}
      
      {release.banner && (
        <Box sx={{ 
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          margin: '1rem 0',
          borderLeft: '4px solid #6c757d'
        }}>
          <Typography>{release.banner}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReleaseHeader;