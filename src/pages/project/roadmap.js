import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Link,
  Chip,
  Tooltip,
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert
} from "@mui/material";
import { Helmet } from "react-helmet";

const statusColors = {
  released: "#2dbda8",
  preview: "#7b817c",
  current: "#efc663",
  "near-term": "#9677df",
  future: "#2c97de",
  withdrawn: "#e16070",
};

const RoadmapPage = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filters, setFilters] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [visibleStatuses, setVisibleStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!data || !data.roadmapYaml) {
      setIsLoading(false)
      setHasError(true)
      return
    }

    const roadmapData = data.roadmapYaml

    if (!roadmapData.labels || !roadmapData.statuses || !roadmapData.categories) {
      setIsLoading(false)
      setHasError(true)
      return
    }

    const statuses = roadmapData.statuses.filter(status => !status.hide)
    setVisibleStatuses(statuses)
    setFilteredCategories(roadmapData.categories)
    setIsLoading(false)
  }, [data])

  const handleFilterChange = (labelName) => {
    setFilters(prev => 
      prev.includes(labelName) 
        ? prev.filter(l => l !== labelName) 
        : [...prev, labelName]
    )
  }

  useEffect(() => {
    if (!data?.roadmapYaml?.categories) return

    if (filters.length === 0) {
      setFilteredCategories(data.roadmapYaml.categories)
      return
    }

    const filtered = data.roadmapYaml.categories.map(category => {
      const initiatives = category.initiatives || []
      const filteredInitiatives = initiatives.filter(initiative => {
        const labels = initiative.labels || []
        return labels.some(label => filters.includes(label))
      })
      
      return {
        ...category,
        initiatives: filteredInitiatives
      }
    }).filter(category => category.initiatives.length > 0)

    setFilteredCategories(filtered)
  }, [filters, data])

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Helmet>
          <title>Jenkins Roadmap - Loading</title>
        </Helmet>
        <CircularProgress sx={{ mt: 4 }} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading roadmap data...
        </Typography>
      </Box>
    );
  }

  if (hasError || !data?.roadmapYaml) {
    return (
      <Box sx={{ p: 3 }}>
        <Helmet>
          <title>Jenkins Roadmap - Error</title>
        </Helmet>
        <Alert severity="error" sx={{ mb: 2 }}>
          Roadmap data is incomplete or malformed
        </Alert>
        <Typography>
          Please check the roadmap.yml file for proper structure.
        </Typography>
      </Box>
    );
  }

  const roadmapData = data.roadmapYaml;

  if (isMobile) {
    return (
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Helmet>
          <title>Jenkins Roadmap</title>
          <meta name="description" content="Jenkins community-driven roadmap showing current and future initiatives" />
        </Helmet>

        <Typography variant="h1" component="h1" gutterBottom sx={{ 
          fontFamily: '"Georgia", serif',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          marginBottom: '1.5rem'
        }}>
          Jenkins Roadmap
        </Typography>

        <Typography paragraph sx={{ 
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          Jenkins project offers a public community-driven roadmap. It aggregates key initiatives in all areas: features, infrastructure, documentation, community, etc. See JEP-14 for more information about the public roadmap process. We do NOT commit on delivery dates, all initiatives depend on contributions. Anyone is welcome to participate and help us to deliver the initiatives below!
        </Typography>

        {roadmapData.labels && (
          <Paper elevation={0} sx={{ 
            p: 2, 
            mb: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.025)',
            borderRadius: '4px'
          }}>
            <Typography variant="h4" component="h2" sx={{ 
              fontSize: '1.25rem',
              fontWeight: 600,
              mb: 1
            }}>
              Filters:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {roadmapData.labels.map((label) => (
                <FormControlLabel
                  key={label.name}
                  control={
                    <Checkbox
                      onChange={() => handleFilterChange(label.name)}
                      size="small"
                      color="primary"
                    />
                  }
                  label={label.displayName}
                  sx={{ 
                    mr: 0,
                    '& .MuiTypography-root': {
                      fontSize: '0.875rem'
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>
        )}

        <Box sx={{ 
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "3px",
          mb: 4,
          overflow: 'hidden'
        }}>
          {filteredCategories.map((category) => (
            <Box key={category.name}>
              <Box sx={{ 
                backgroundColor: "rgba(0, 0, 0, 0.025)",
                fontWeight: 600,
                p: 2,
                borderBottom: `1px solid ${theme.palette.divider}`
              }}>
                {category.name}
              </Box>
              
              {(category.initiatives || []).map((initiative) => {
                const status = roadmapData.statuses.find(s => s.id === initiative.status);
                return (
                  <Box 
                    key={initiative.name} 
                    sx={{ 
                      p: 2, 
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    }}
                  >
                    <Tooltip 
                      title={initiative.description || (status?.description || '')} 
                      arrow
                      placement="right"
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        {status && (
                          <Box sx={{ 
                            background: statusColors[status.id] || theme.palette.grey[500],
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            mr: 1,
                            fontSize: '0.75rem'
                          }}>
                            {status.displayName}
                          </Box>
                        )}
                        <Link
                          href={initiative.link || category.link || '#'}
                          target="_blank"
                          rel="noopener"
                          sx={{ 
                            fontWeight: 600,
                            color: theme.palette.primary.main,
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {initiative.name}
                        </Link>
                      </Box>
                    </Tooltip>
                    {initiative.labels && (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                        {initiative.labels.map((label) => {
                          const labelData = roadmapData.labels?.find(l => l.name === label);
                          return (
                            <Chip
                              key={label}
                              label={labelData?.displayName || label}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                color: theme.palette.text.primary,
                                fontSize: '0.75rem',
                                height: '24px'
                              }}
                            />
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>

        <Typography variant="h2" component="h2" gutterBottom sx={{
          fontFamily: '"Georgia", serif',
          fontSize: '1.75rem',
          fontWeight: 600,
          marginTop: '2rem',
          marginBottom: '1rem'
        }}>
          References
        </Typography>
        <List dense sx={{ 
          '& .MuiListItem-root': {
            px: 0,
            py: '4px'
          }
        }}>
          {[
            {
              text: "Roadmap process documentation (JEP-14)",
              href: "https://github.com/jenkinsci/jep/tree/master/jep/14"
            },
            {
              text: "HOWTO: Suggest a new roadmap item",
              href: "https://github.com/jenkinsci/jep/tree/master/jep/14#submitting-roadmap-suggestions"
            },
            {
              text: "Open data (roadmap.yml)",
              href: "https://github.com/jenkins-infra/jenkins.io/blob/master/content/_data/roadmap/roadmap.yml"
            },
            {
              text: "Archive (completed and withdrawn roadmap items)",
              href: "https://github.com/jenkins-infra/jenkins.io/blob/master/content/_data/roadmap/archive.yml"
            }
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemText>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item.text}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: "auto", 
      p: 3,
      fontFamily: theme.typography.fontFamily
    }}>
      <Helmet>
        <title>Jenkins Roadmap</title>
        <meta name="description" content="Jenkins community-driven roadmap showing current and future initiatives" />
      </Helmet>

      <Typography variant="h1" component="h1" gutterBottom sx={{ 
        fontFamily: '"Georgia", serif',
        fontWeight: 'bold',
        fontSize: '3rem',
        marginBottom: '1.5rem'
      }}>
        Jenkins Roadmap
      </Typography>

      <Typography paragraph sx={{ 
        fontSize: '1.1rem',
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>
        Jenkins project offers a public community-driven roadmap. It aggregates key initiatives in all areas: features, infrastructure, documentation, community, etc. See JEP-14 for more information about the public roadmap process. We do NOT commit on delivery dates, all initiatives depend on contributions. Anyone is welcome to participate and help us to deliver the initiatives below!
      </Typography>

      {roadmapData.labels && (
        <Paper elevation={0} sx={{ 
          p: 2, 
          mb: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.025)',
          borderRadius: '4px'
        }}>
          <Typography variant="h4" component="h2" sx={{ 
            fontSize: '1.25rem',
            fontWeight: 600,
            mb: 1
          }}>
            Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {roadmapData.labels.map((label) => (
              <FormControlLabel
                key={label.name}
                control={
                  <Checkbox
                    onChange={() => handleFilterChange(label.name)}
                    size="small"
                    color="primary"
                  />
                }
                label={label.displayName}
                sx={{ 
                  mr: 0,
                  '& .MuiTypography-root': {
                    fontSize: '0.875rem'
                  }
                }}
              />
            ))}
          </Box>
        </Paper>
      )}

      <Table sx={{ 
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "3px",
        mb: 4
      }}>
        <TableHead>
          <TableRow>
            {visibleStatuses.map((status) => (
              <TableCell
                key={status.id}
                sx={{
                  textAlign: "center",
                  py: "12px",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: theme.palette.text.secondary,
                  textTransform: "uppercase",
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  "&:first-of-type": {
                    pl: "24px",
                    textAlign: "left",
                    borderLeft: "none"
                  },
                  "&:last-of-type": {
                    pr: "24px",
                  },
                }}
              >
                {status.displayName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCategories.map((category) => (
            <React.Fragment key={category.name}>
              <TableRow sx={{ 
                backgroundColor: "rgba(0, 0, 0, 0.025)",
                fontWeight: 600,
              }}>
                <TableCell 
                  colSpan={visibleStatuses.length}
                  sx={{
                    pl: "24px",
                    borderLeft: "none",
                    height: "40px",
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    {category.name}
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {visibleStatuses.map((status) => (
                  <TableCell
                    key={status.id}
                    sx={{
                      p: "8px",
                      fontSize: "14px",
                      color: theme.palette.text.secondary,
                      lineHeight: "16px",
                      minHeight: "48px",
                      verticalAlign: "top",
                      borderLeft: `1px dashed ${theme.palette.divider}`,
                      "&:first-of-type": {
                        pl: "16px",
                      },
                      "&:last-of-type": {
                        pr: "16px",
                      },
                    }}
                  >
                    {(category.initiatives || [])
                      .filter((initiative) => initiative.status === status.id)
                      .map((initiative) => (
                        <Tooltip
                          key={initiative.name}
                          title={initiative.description || status.description || ''}
                          placement="top"
                          arrow
                        >
                          <Box
                            sx={{
                              minHeight: "32px",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              margin: "8px 4px",
                              borderRadius: "10px",
                              fontWeight: "bold",
                              padding: "4px 8px",
                              color: "white",
                              background: statusColors[status.id] || theme.palette.grey[500],
                              "&:hover": {
                                cursor: "help",
                              },
                            }}
                          >
                            <Link
                              href={initiative.link || category.link || '#'}
                              target="_blank"
                              rel="noopener"
                              sx={{
                                color: "white",
                                textDecoration: "none",
                                "&:hover": {
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {initiative.name}
                            </Link>
                          </Box>
                        </Tooltip>
                      ))}
                  </TableCell>
                ))}
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h2" component="h2" gutterBottom sx={{
        fontFamily: '"Georgia", serif',
        fontSize: '2rem',
        fontWeight: 600,
        marginTop: '2rem',
        marginBottom: '1rem'
      }}>
        References
      </Typography>
      <List dense sx={{ 
        '& .MuiListItem-root': {
          px: 0,
          py: '4px'
        }
      }}>
        {[
          {
            text: "Roadmap process documentation (JEP-14)",
            href: "https://github.com/jenkinsci/jep/tree/master/jep/14"
          },
          {
            text: "HOWTO: Suggest a new roadmap item",
            href: "https://github.com/jenkinsci/jep/tree/master/jep/14#submitting-roadmap-suggestions"
          },
          {
            text: "Open data (roadmap.yml)",
            href: "https://github.com/jenkins-infra/jenkins.io/blob/master/content/_data/roadmap/roadmap.yml"
          },
          {
            text: "Archive (completed and withdrawn roadmap items)",
            href: "https://github.com/jenkins-infra/jenkins.io/blob/master/content/_data/roadmap/archive.yml"
          }
        ].map((item, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener"
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {item.text}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const query = graphql`
  query {
    roadmapYaml {
      statuses {
        id
        displayName
        description
        hide
      }
      labels {
        name
        displayName
        description
        link
      }
      categories {
        name
        description
        link
        initiatives {
          name
          description
          status
          link
          labels
        }
      }
    }
  }
`;

export default RoadmapPage;