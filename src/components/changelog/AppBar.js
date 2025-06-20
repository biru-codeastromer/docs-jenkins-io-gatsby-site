import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link as GatsbyLink } from "gatsby";

const AppBar = ({ title, actions, hasRss }) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: '2rem',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="h1" sx={{ 
          fontFamily: '"Georgia", serif',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          marginBottom: 0,
        }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        {actions}
        {hasRss && (
          <Button 
            component={GatsbyLink} 
            to="rss.xml"
            variant="outlined"
            sx={{
              padding: '0.5rem 1.1rem',
              borderRadius: '0.66rem',
              fontSize: '0.85rem',
              fontWeight: 450,
              gap: '0.5rem',
              '& svg, & ion-icon': {
                width: '1.25rem',
                height: '1.25rem'
              }
            }}
          >
            RSS Feed
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AppBar;