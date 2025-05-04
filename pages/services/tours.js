import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ServiceFeature from '../../components/ServiceFeature';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const features = [
  {
    icon: LocationOnIcon,
    title: 'وجهات متنوعة',
    description: 'برامج سياحية لأفضل الوجهات العالمية',
  },
  {
    icon: EventAvailableIcon,
    title: 'برامج مرنة',
    description: 'خطط سفر تناسب جميع الأوقات والميزانيات',
  },
  {
    icon: AttachMoneyIcon,
    title: 'أسعار تنافسية',
    description: 'عروض وباقات بأسعار مناسبة للجميع',
  },
];

export default function ToursService() {
  const router = useRouter();  // Add this at the top

  const handleExplore = () => {
    router.push('/services/application?type=tourplan');  // Add proper navigation
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            البرامج السياحية
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 4 }}
          >
            اكتشف العالم مع برامجنا السياحية المميزة
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<ExploreIcon />}
              onClick={handleExplore}  // Add onClick handler
              sx={{ borderRadius: 2, px: 4, py: 1.5 }}
            >
              استكشف البرامج
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServiceFeature {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
