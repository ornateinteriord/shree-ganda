import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
} from '@mui/material';
import {
  CheckCircle,
} from '@mui/icons-material';
import Navbar from '../navbar/Navbar';

import { membershipOptions } from "../../assets/memberShipOptions/MemberShipPlans";
import { useNavigate } from 'react-router-dom';



const MembershipPlans = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();


  const handlePlanSelection = (planName) => {
    const planRoles = {
      'PREMIUM': 'PremiumUser',
      'STANDARD': 'SilverUser',
      'ELITE': 'PremiumUser'
    };

    const planType = planRoles[planName] || 'FreeUser';
    navigate(`/register?type=${planType}`);

    console.log(`Navigating with plan type: ${planType}`);
  };

  return (
    <>
      <Navbar />
      <Box sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/hero-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        py: isMobile ? 10 : 12,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 0
        }
      }}>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: isMobile ? 1 : 2 }}>
            {/* Logo */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                width: isMobile ? 60 : 80,
                height: isMobile ? 60 : 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '3px solid #d97706'
              }}>
                <Typography sx={{
                  color: '#fbbf24',
                  fontWeight: 700,
                  fontSize: isMobile ? '24px' : '32px',
                  fontFamily: 'Georgia, serif'
                }}>
                  SG
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h2"
              sx={{
                color: '#7c2d12',
                fontWeight: 700,
                fontSize: isMobile ? '32px' : isTablet ? '42px' : '52px',
                mb: 1,
                textShadow: '2px 2px 4px rgba(255,255,255,0.3)',
                fontFamily: 'Georgia, serif'
              }}
            >
              Shreeganda
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#7c2d12',
                fontWeight: 500,
                fontSize: isMobile ? '12px' : '16px',
                letterSpacing: 3,
                textShadow: '1px 1px 2px rgba(255,255,255,0.3)',
                fontFamily: 'Georgia, serif',
                mb: 1,
                textTransform: 'uppercase'
              }}
            >
              — MATRIMONY —
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: '#fef3c7',
                fontWeight: 600,
                fontSize: isMobile ? '24px' : isTablet ? '28px' : '36px',
                mb: 6,
                textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic'
              }}
            >
              Choose Your Membership Package
            </Typography>
          </Box>

          {/* Pricing Cards */}
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 3 : 4,
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'stretch',
            flexWrap: 'wrap',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {membershipOptions.map((plan, index) => (
              <Card
                key={index}
                sx={{
                  width: isMobile ? '100%' : isTablet ? '45%' : '30%',
                  maxWidth: isMobile ? '400px' : 'none',
                  minHeight: '500px',
                  background: plan.gradient,
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'visible',
                  border: '3px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    backgroundImage: 'url(/hero-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    top: -60,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 120,
                    height: 120,
                    backgroundColor: plan.color,
                    borderRadius: '50% 50% 0 0',
                    border: `4px solid ${plan.color}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }
                }}
              >
                <CardContent sx={{
                  p: 4,
                  pt: 8,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Plan Name */}
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      textAlign: 'center',
                      mb: 2,
                      fontSize: isMobile ? '24px' : '28px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    {plan.name}
                  </Typography>

                  {/* Features List */}
                  <List sx={{ mb: 3, flexGrow: 1 }}>
                    {plan.features.map((feature, i) => (
                      <ListItem
                        key={i}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          px: 0,
                          py: 0.75
                        }}
                      >
                        <CheckCircle
                          sx={{
                            fontSize: 20,
                            mr: 1.5,
                            mt: '2px',
                            color: 'rgba(255,255,255,0.9)'
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'white',
                            fontSize: isMobile ? '13px' : '15px',
                            lineHeight: 1.6
                          }}
                        >
                          {feature}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>

                  {/* Price */}
                  <Box sx={{
                    textAlign: 'center',
                    mb: 3,
                    py: 2,
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    borderBottom: '2px solid rgba(255,255,255,0.3)'
                  }}>
                    <Typography
                      variant="h2"
                      sx={{
                        color: 'white',
                        fontWeight: 800,
                        fontSize: isMobile ? '36px' : '48px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {plan.discountedPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        mt: 1,
                        fontSize: isMobile ? '12px' : '14px'
                      }}
                    >
                      Validity: {plan.duration}
                    </Typography>
                  </Box>

                  {/* Get Started Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => handlePlanSelection(plan.name)}
                    sx={{
                      bgcolor: 'white',
                      color: plan.color,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                        transform: 'scale(1.02)'
                      },
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: isMobile ? '16px' : '18px',
                      borderRadius: 2,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MembershipPlans;