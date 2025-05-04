import { Box, Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import SecurityIcon from '@mui/icons-material/Security';
import ExploreIcon from '@mui/icons-material/Explore';

const services = [
  {
    title: 'حجز طيران',
    description: 'حجز تذاكر الطيران بأفضل الأسعار',
    icon: FlightIcon,
    link: '/services/flights'
  },
  {
    title: 'حجز فنادق',
    description: 'حجز الفنادق في جميع أنحاء العالم',
    icon: HotelIcon,
    link: '/services/hotels'
  },
  {
    title: 'تأشيرات',
    description: 'خدمات التأشيرات لجميع الدول',
    icon: DescriptionIcon,
    link: '/services/visas'
  },
  {
    title: 'حجز مواعيد',
    description: 'حجز مواعيد السفارات والقنصليات',
    icon: EventIcon,
    link: '/services/appointments'
  },
  {
    title: 'تأمين سفر',
    description: 'تأمين سفر شامل لرحلتك',
    icon: SecurityIcon,
    link: '/services/insurance'
  },
  {
    title: 'تقديم طلب',
    description: 'تقديم طلب للخدمات المتاحة',
    icon: DescriptionIcon,
    link: '/services/application'
  }
];

export default function Services() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold', color: '#1976d2' }}>
          خدماتنا
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 6,
                  },
                }}>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexGrow: 1,
                  }}>
                    <Icon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => window.location.href = service.link}
                      sx={{
                        marginTop: 'auto',
                        '&:hover': {
                          backgroundColor: '#1565c0'
                        }
                      }}
                    >
                      المزيد
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
