import React from "react";
import { graphql } from "gatsby";
import {
  Box,
  Typography,
  Link,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme
} from "@mui/material";
import { Helmet } from "react-helmet";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { alpha } from '@mui/material/styles';

import DockerIcon from '../../images/download-icons/docker.svg';
import KubernetesIcon from '../../images/download-icons/kubernetes.svg';
import UbuntuIcon from '../../images/download-icons/ubuntu.svg';
import RedhatIcon from '../../images/download-icons/redhat.svg';
import FedoraIcon from '../../images/download-icons/fedora.svg';
import WindowsIcon from '../../images/download-icons/windows.svg';
import OpensuseIcon from '../../images/download-icons/opensuse.svg';
import FreebsdIcon from '../../images/download-icons/freebsd.svg';
import GentooIcon from '../../images/download-icons/gentoo.svg';
import AppleIcon from '../../images/download-icons/apple.svg';
import OpenbsdIcon from '../../images/download-icons/openbsd.svg';
import OpenindianaIcon from '../../images/download-icons/openindiana.svg';
import ArchlinuxIcon from '../../images/download-icons/archlinux.svg';
import AwsIcon from '../../images/download-icons/aws.svg';
import AzureIcon from '../../images/download-icons/azure.svg';
import GoogleCloudIcon from '../../images/download-icons/google-cloud.svg';
import CivoIcon from '../../images/download-icons/civo.svg';
import OracleIcon from '../../images/download-icons/oracle.svg';
import BitnamiIcon from '../../images/download-icons/bitnami.svg';

const DownloadPage = ({ data }) => {
  const theme = useTheme();
  const { latest, stable } = data.site.siteMetadata.jenkins;

  const ltsReleases = [
    {
      icon: <DockerIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://hub.docker.com/r/jenkins/jenkins",
      title: "Docker"
    },
    {
      icon: <KubernetesIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://artifacthub.io/packages/helm/jenkinsci/jenkins",
      title: "Kubernetes"
    },
    {
      icon: <UbuntuIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/doc/book/installing/linux/#debianubuntu",
      title: "Ubuntu/Debian"
    },
    {
      icon: <RedhatIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/doc/book/installing/linux/#red-hat-centos",
      title: "Red Hat Enterprise Linux and derivatives"
    },
    {
      icon: <FedoraIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/doc/book/installing/linux/#fedora",
      title: "Fedora"
    },
    {
      icon: <WindowsIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/download/thank-you-downloading-windows-installer-stable",
      title: "Windows"
    },
    {
      icon: <OpensuseIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://pkg.jenkins.io/opensuse-stable/",
      title: "openSUSE"
    },
    {
      icon: <FreebsdIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://www.freshports.org/devel/jenkins-lts",
      title: "FreeBSD",
      thirdParty: true
    },
    {
      icon: <GentooIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://packages.gentoo.org/packages/devel/jenkins-bin",
      title: "Gentoo",
      thirdParty: true
    },
    {
      icon: <AppleIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/download/lts/macos",
      title: "macOS",
      thirdParty: true
    },
    {
      icon: <OpenbsdIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/download/lts/openbsd",
      title: "OpenBSD",
      thirdParty: true
    },
    {
      icon: <OpenindianaIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://pkg.openindiana.org/hipster/en/search.shtml?token=jenkins-core-lts",
      title: "OpenIndiana Hipster",
      thirdParty: true
    }
  ];

  const weeklyReleases = [
    {
      icon: <DockerIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://hub.docker.com/r/jenkins/jenkins/",
      title: "Docker"
    },
    {
      icon: <UbuntuIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/doc/book/installing/linux/#debian-weekly",
      title: "Ubuntu/Debian"
    },
    {
      icon: <RedhatIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/doc/book/installing/linux/#red-hat-weekly",
      title: "Red Hat Enterprise Linux and derivatives"
    },
    {
      icon: <FedoraIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/doc/book/installing/linux/#fedora-weekly",
      title: "Fedora"
    },
    {
      icon: <WindowsIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/download/thank-you-downloading-windows-installer",
      title: "Windows"
    },
    {
      icon: <OpensuseIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://pkg.jenkins.io/opensuse/",
      title: "openSUSE"
    },
    {
      icon: <ArchlinuxIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://archlinux.org/packages/extra/any/jenkins/",
      title: "Arch Linux",
      thirdParty: true
    },
    {
      icon: <FreebsdIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://www.freshports.org/devel/jenkins",
      title: "FreeBSD",
      thirdParty: true
    },
    {
      icon: <GentooIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://packages.gentoo.org/packages/devel/jenkins-bin",
      title: "Gentoo",
      thirdParty: true
    },
    {
      icon: <AppleIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/download/weekly/macos",
      title: "macOS",
      thirdParty: true
    },
    {
      icon: <OpenbsdIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "/download/weekly/openbsd",
      title: "OpenBSD",
      thirdParty: true
    },
    {
      icon: <OpenindianaIcon style={{ width: 24, height: 24, marginRight: theme.spacing(1.5) }} />,
      href: "https://pkg.openindiana.org/hipster/en/search.shtml?token=jenkins-core-weekly",
      title: "OpenIndiana Hipster",
      thirdParty: true
    }
  ];

  const clouds = [
    {
      icon: <AwsIcon style={{ width: 100, height: 100, marginRight: theme.spacing(1.5) }} />,
      title: 'Jenkins with AWS CodeBuild and AWS CodeDeploy',
      href: 'https://aws.amazon.com/blogs/devops/setting-up-a-ci-cd-pipeline-by-integrating-jenkins-with-aws-codebuild-and-aws-codedeploy/',
      background: alpha(theme.palette.jenkins.awsOrange, 0.15),
    },
    {
      icon: <AzureIcon style={{ width: 100, height: 100, marginRight: theme.spacing(1.5) }} />,
      title: 'Jenkins quickstarts, tutorials, samples, and resources for Azure',
      href: 'https://docs.microsoft.com/en-us/azure/developer/jenkins/',
      background: alpha(theme.palette.jenkins.azureBlue, 0.15),
    },
    {
      icon: <GoogleCloudIcon style={{ width: 100, height: 100, marginRight: theme.spacing(1.5) }} />,
      title: "Using Jenkins for distributed builds on Compute Engine",
      href: "/doc/tutorials/tutorials-for-installing-jenkins-on-Google-Cloud/",
      background: alpha(theme.palette.jenkins.googleGreen, 0.15),
    },
    {
      icon: <CivoIcon style={{ width: 100, height: 100, marginRight: theme.spacing(1.5) }} />,
      title: "Jenkins one-click deployment on Civo Kubernetes",
      href: "https://github.com/civo/kubernetes-marketplace/tree/master/jenkins",
      background: alpha(theme.palette.jenkins.civoBlue, 0.15),
    },
    {
      icon: <OracleIcon style={{ width: 100, height: 100, marginRight: theme.spacing(1.5) }} />,
      title: "Set up Jenkins for cloud deployments in Oracle Cloud",
      href: "https://docs.oracle.com/en/solutions/cicd-pipeline/",
      background: alpha(theme.palette.jenkins.oracleRed, 0.15),
    },
    {
      icon: <BitnamiIcon style={{ width: 100, height: 100, marginRight: theme.spacing(1.5) }} />,
      title: "Images for Amazon Web Services, Azure, and Google Cloud",
      href: "https://bitnami.com/stack/jenkins/cloud",
      background: alpha(theme.palette.jenkins.bitnamiBlue, 0.15),
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box sx={{ 
      maxWidth: 'Min(85vw, 1600px)',
      width: '100%',
      marginInline: 'auto',
      padding: '3rem 1rem',
      minHeight: '80vh',
      '@media screen and (max-width: 768px)': {
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }
    }}>
      <Helmet>
        <title>Download Jenkins</title>
        <meta name="description" content="Download Jenkins - choose between Stable (LTS) and weekly releases" />
      </Helmet>

      <Typography variant="h1" component="h1" gutterBottom sx={{ 
        fontFamily: '"Georgia", serif',
        fontWeight: 'bold',
        fontSize: '3rem',
        marginBottom: '1.5rem'
      }}>
        Download and deploy
      </Typography>

      <Typography paragraph sx={{ 
        fontSize: '1.1rem',
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>
        The Jenkins project produces two release lines: Stable (LTS) and weekly.
        Depending on your organization's needs, one may be preferred over the other.
      </Typography>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0 4rem',
        margin: '60px 0',
        '@media screen and (max-width: 768px)': {
          display: 'flex',
          flexDirection: 'column',
          margin: 0
        }
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1.25rem', mb: 1 }}>
            Stable (LTS)
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            Long-Term Support (LTS) release baselines are chosen every 12 weeks from the stream of regular releases.
            Every 4 weeks we release stable releases which include bug and security fix backports.
            <Link href="/lts" sx={{ ml: 1 }}>Learn more…</Link>
          </Typography>
          <Box sx={{ 
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            '@media screen and (max-width: 768px)': {
              flexDirection: 'column'
            }
          }}>
            <Button 
              variant="contained" 
              href="/changelog-stable" 
              sx={{ 
                textTransform: 'none',
                background: 'linear-gradient(90deg, #1a73e8 0%, #1a73e8 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1557b0 0%, #1557b0 100%)'
                }
              }}
            >
              Changelog
            </Button>
            <Button 
              variant="outlined" 
              href="/doc/upgrade-guide" 
              sx={{ 
                textTransform: 'none',
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              Upgrade Guide
            </Button>
            <Button 
              variant="outlined" 
              href="https://get.jenkins.io/war-stable/" 
              sx={{ 
                textTransform: 'none',
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              Past Releases
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1.25rem', mb: 1 }}>
            Weekly releases
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            This release line delivers bug fixes and new features rapidly to users and plugin developers who need them.
            It is generally delivered on a weekly cadence.
            <Link href="/weekly" sx={{ ml: 1 }}>Learn more…</Link>
          </Typography>
          <Box sx={{ 
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            '@media screen and (max-width: 768px)': {
              flexDirection: 'column'
            }
          }}>
            <Button 
              variant="contained" 
              href="/changelog" 
              sx={{ 
                textTransform: 'none',
                background: 'linear-gradient(90deg, #1a73e8 0%, #1a73e8 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1557b0 0%, #1557b0 100%)'
                }
              }}
            >
              Changelog
            </Button>
            <Button 
              variant="outlined" 
              href="https://get.jenkins.io/war/" 
              sx={{ 
                textTransform: 'none',
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              Past Releases
            </Button>
          </Box>
        </Box>
      </Box>

      <Typography variant="h2" component="h2" gutterBottom sx={{
        fontFamily: '"Georgia", serif',
        fontSize: '2rem',
        fontWeight: 600,
        marginBottom: '1rem'
      }}>
        Downloading Jenkins
      </Typography>

      <Typography paragraph sx={{ mb: 2 }}>
        Jenkins is distributed as WAR files, native packages, installers, and Docker images.
        Follow these installation steps:
      </Typography>

      <List dense sx={{ mb: 3, pl: 2 }}>
        <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
          <ListItemText>
            Before downloading, please take a moment to review the{' '}
            <Link href="/doc/book/installing/#prerequisites">
              Hardware and Software requirements
            </Link>{' '}
            section of the User Handbook.
          </ListItemText>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
          <ListItemText>
            Select one of the packages below and follow the download instructions.
          </ListItemText>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
          <ListItemText>
            Once a Jenkins package has been downloaded, proceed to the{' '}
            <Link href="/doc/book/getting-started/installing/">
              Installing Jenkins
            </Link>{' '}
            section of the User Handbook.
          </ListItemText>
        </ListItem>
        <ListItem sx={{ display: 'list-item', p: 0 }}>
          <ListItemText>
            You may also want to verify the package you downloaded.{' '}
            <Link href="/download/verify">
              Learn more about verifying Jenkins downloads.
            </Link>
          </ListItemText>
        </ListItem>
      </List>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        margin: '10px 0 20px 0'
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 500, mb: 1 }}>
            Download Jenkins {stable} LTS for:
          </Typography>
          <Paper elevation={0} sx={{ 
            p: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.025)',
            borderRadius: '4px'
          }}>
            <Button 
              fullWidth 
              variant="outlined" 
              href={`https://get.jenkins.io/war-stable/${stable}/jenkins.war`}
              sx={{ 
                mb: 2,
                justifyContent: 'flex-start',
                textTransform: 'none',
                textAlign: 'left',
                p: 2,
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography sx={{ fontWeight: 500 }}>Generic Java package (.war)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ mr: 1 }}>
                    SHA-256: {data.stableSha256.childDataJson.sha256}
                  </Typography>
                  <Tooltip title="Copy to clipboard">
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(data.stableSha256.childDataJson.sha256);
                      }}
                      sx={{
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)'
                        }
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Button>
            
            {ltsReleases.map((release, index) => (
              <Button
                key={index}
                fullWidth
                variant="outlined"
                href={release.href}
                sx={{ 
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  textAlign: 'left',
                  p: 2,
                  mb: index === ltsReleases.length - 1 ? 0 : 1,
                  borderColor: theme.palette.divider,
                  '&:hover': {
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {release.icon}
                  {release.title}
                  {release.thirdParty && (
                    <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem' }}>
                      (Third party)
                    </Typography>
                  )}
                </Box>
              </Button>
            ))}
          </Paper>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 500, mb: 1 }}>
            Download Jenkins {latest} for:
          </Typography>
          <Paper elevation={0} sx={{ 
            p: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.025)',
            borderRadius: '4px'
          }}>
            <Button 
              fullWidth 
              variant="outlined" 
              href={`https://get.jenkins.io/war/${latest}/jenkins.war`}
              sx={{ 
                mb: 2,
                justifyContent: 'flex-start',
                textTransform: 'none',
                textAlign: 'left',
                p: 2,
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Typography sx={{ fontWeight: 500 }}>Generic Java package (.war)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ mr: 1 }}>
                    SHA-256: {data.weeklySha256.childDataJson.sha256}
                  </Typography>
                  <Tooltip title="Copy to clipboard">
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(data.weeklySha256.childDataJson.sha256);
                      }}
                      sx={{
                        padding: '4px',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)'
                        }
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Button>
            
            {weeklyReleases.map((release, index) => (
              <Button
                key={index}
                fullWidth
                variant="outlined"
                href={release.href}
                sx={{ 
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  textAlign: 'left',
                  p: 2,
                  mb: index === weeklyReleases.length - 1 ? 0 : 1,
                  borderColor: theme.palette.divider,
                  '&:hover': {
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {release.icon}
                  {release.title}
                  {release.thirdParty && (
                    <Typography component="span" sx={{ ml: 1, fontSize: '0.75rem' }}>
                      (Third party)
                    </Typography>
                  )}
                </Box>
              </Button>
            ))}
          </Paper>
        </Box>
      </Box>

      <Typography paragraph sx={{ mb: 3 }}>
        Packages marked third party may not be updated as frequently as packages supported by the Jenkins project directly.
      </Typography>

      <Typography variant="h2" component="h2" gutterBottom sx={{
        fontFamily: '"Georgia", serif',
        fontSize: '2rem',
        fontWeight: 600,
        marginTop: '3rem',
        marginBottom: '1rem'
      }}>
        Deploying Jenkins in public cloud
      </Typography>

      <Typography paragraph sx={{ mb: 3 }}>
        Many public cloud vendors provide their own Jenkins installation guides and packages.
        The guides provide instructions to deploy, maintain, and upgrade on the specific public cloud.
        Such guides may be used to quickly deploy Jenkins and, in many cases,
        to get a controller preconfigured to be used within the public cloud
        (e.g. bundled plugins, integrations with public cloud services, etc.).
      </Typography>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '2rem'
      }}>
        {clouds.map((cloud, index) => (
          <Paper 
            key={index}
            component={Link} 
            href={cloud.href} 
            target="_blank" 
            rel="noopener"
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              backgroundColor: cloud.background,
              color: 'inherit',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {cloud.icon}
              <Typography variant="h3" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
                {cloud.title}
              </Typography>
            </Box>
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 1 }}>Learn more</Typography>
              <Box sx={{ transform: 'translateY(2px)' }}>→</Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        jenkins {
          latest
          stable
        }
      }
    }
    stableSha256: file(
      relativePath: {eq: "stable-sha256.json"},
      sourceInstanceName: {eq: "downloadData"}
    ) {
      childDataJson {
        sha256
      }
    }
    weeklySha256: file(
      relativePath: {eq: "weekly-sha256.json"}, 
      sourceInstanceName: {eq: "downloadData"}
    ) {
      childDataJson {
        sha256
      }
    }
  }
`;

export default DownloadPage;