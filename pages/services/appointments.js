import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ServiceFeature from '../../components/ServiceFeature';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const features = [
  {
    icon: AccessTimeFilledIcon,
    title: 'حجز فوري',
    description: 'حجز مواعيد فورية لجميع السفارات والقنصليات',
  },
  {
    icon: AssignmentTurnedInIcon,
    title: 'متابعة المستندات',
    description: 'مراجعة وتجهيز جميع المستندات المطلوبة',
  },
  {
    icon: NotificationsActiveIcon,
    title: 'تذكيرات فعالة',
    description: 'تذكيرات بالمواعيد والمستندات المطلوبة',
  },
];

export default function AppointmentsService() {
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
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/appointment-hero.jpg"
            alt="Embassy appointment scheduling"
            layout="fill"
            objectFit="cover"
            priority
          />
        </Box>
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
            خدمة حجز المواعيد
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            حجز مواعيد السفارات والقنصليات بكل سهولة
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<EventIcon />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              احجز موعدك الآن
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold', color: '#1976d2' }}
        >
          مميزات خدمة حجز المواعيد
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <ServiceFeature {...feature} />
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="primary">
            خدماتنا الشاملة
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            نقدم خدمات متكاملة لحجز المواعيد تشمل:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {[
              'حجز مواعيد السفارات والقنصليات',
              'متابعة حالة الحجز',
              'تجهيز المستندات المطلوبة',
              'تذكيرات بالمواعيد',
              'خدمة الترجمة الفورية',
              'خدمة العملاء على مدار الساعة',
            ].map((item, index) => (
              <Typography
                key={index}
                component="li"
                sx={{
                  mb: 1,
                  color: 'text.secondary',
                  '&::marker': {
                    color: '#1976d2',
                  },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
