import React from "react";
import { Box, Typography, Link, List, ListItem, Chip } from "@mui/material";

const typeMap = {
  'security': 'Security',
  'rfe': 'Enhancement',
  'majorrfe': 'Major enhancement',
  'bug': 'Bug fix',
  'majorbug': 'Major bug fix'
};

const ChangelogChanges = ({ changes }) => {
  if (!changes || changes.length === 0) {
    return (
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        No notable changes in this release.
      </Typography>
    );
  }

  const groupedChanges = changes.reduce((acc, change) => {
    const type = typeMap[change.type] || change.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(change);
    return acc;
  }, {});

  return (
    <Box sx={{ marginTop: '1rem' }}>
      {Object.entries(groupedChanges).map(([type, typeChanges]) => (
        <Box key={type} sx={{ marginBottom: '1.5rem' }}>
          <Chip 
            label={type}
            size="small"
            sx={{
              borderRadius: '100px',
              fontSize: '0.6rem',
              padding: '5px 10px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              ...(type === 'Security' && {
                backgroundColor: 'rgba(233, 30, 99, 0.1)',
                border: '1px solid rgba(233, 30, 99, 0.12)',
                color: '#E91E63'
              }),
              ...(type === 'Major enhancement' && {
                backgroundColor: 'rgba(150, 119, 223, 0.15)',
                border: '1px solid rgba(150, 119, 223, 0.12)',
                color: '#9677df'
              }),
              ...(type === 'Enhancement' && {
                backgroundColor: 'rgba(26, 115, 232, 0.1)',
                border: '1px solid rgba(26, 115, 232, 0.12)',
                color: '#1a73e8'
              }),
              ...(type === 'Major bug fix' && {
                backgroundColor: 'rgba(225, 96, 112, 0.15)',
                border: '1px solid rgba(225, 96, 112, 0.12)',
                color: '#e16070'
              }),
              ...(type === 'Bug fix' && {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.12)',
                color: '#F44336'
              })
            }}
          />
          <List dense sx={{ paddingLeft: '25px', listStyleType: 'none' }}>
            {typeChanges.map((change, index) => (
              <ListItem key={index} sx={{ 
                position: 'relative',
                paddingLeft: '0',
                paddingBottom: '0.25rem',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '11px',
                  left: '-17px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '100px',
                  backgroundColor: type === 'Security' ? 'rgba(233, 30, 99, 0.2)' :
                                type === 'Major enhancement' ? 'rgba(150, 119, 223, 0.2)' :
                                type === 'Enhancement' ? 'rgba(26, 115, 232, 0.2)' :
                                type === 'Major bug fix' ? 'rgba(225, 96, 112, 0.2)' :
                                'rgba(244, 67, 54, 0.2)',
                  border: type === 'Security' ? '1px solid rgba(233, 30, 99, 0.2)' :
                          type === 'Major enhancement' ? '1px solid rgba(150, 119, 223, 0.2)' :
                          type === 'Enhancement' ? '1px solid rgba(26, 115, 232, 0.2)' :
                          type === 'Major bug fix' ? '1px solid rgba(225, 96, 112, 0.2)' :
                          '1px solid rgba(244, 67, 54, 0.2)'
                }
              }}>
                <Typography variant="body1" component="div">
                  {change.message}
                  {(change.issue || change.pull || change.references) && (
                    <Box component="span" sx={{ 
                      fontSize: '0.75rem',
                      color: '#6c757d',
                      marginLeft: '0.5rem'
                    }}>
                      {change.issue && (
                        <Link 
                          href={`https://issues.jenkins.io/browse/JENKINS-${change.issue}`}
                          target="_blank"
                          rel="noopener"
                          sx={{ color: 'inherit' }}
                        >
                          JENKINS-{change.issue}
                        </Link>
                      )}
                      {change.pull && (
                        <>
                          {change.issue && ', '}
                          <Link 
                            href={`https://github.com/jenkinsci/jenkins/pull/${change.pull}`}
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'inherit' }}
                          >
                            pull {change.pull}
                          </Link>
                        </>
                      )}
                      {change.references?.map((ref, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 || change.issue || change.pull ? ', ' : ''}
                          {ref.issue && (
                            <Link 
                              href={`https://issues.jenkins.io/browse/JENKINS-${ref.issue}`}
                              target="_blank"
                              rel="noopener"
                              sx={{ color: 'inherit' }}
                            >
                              JENKINS-{ref.issue}
                            </Link>
                          )}
                          {ref.pull && (
                            <Link 
                              href={`https://github.com/jenkinsci/jenkins/pull/${ref.pull}`}
                              target="_blank"
                              rel="noopener"
                              sx={{ color: 'inherit' }}
                            >
                              pull {ref.pull}
                            </Link>
                          )}
                          {ref.url && (
                            <Link 
                              href={ref.url}
                              target="_blank"
                              rel="noopener"
                              sx={{ color: 'inherit' }}
                            >
                              {ref.title || 'link'}
                            </Link>
                          )}
                        </React.Fragment>
                      ))}
                    </Box>
                  )}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default ChangelogChanges;