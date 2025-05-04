import { Box, Container, Typography, Grid, Button } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ServiceFeature from '../../components/ServiceFeature';
import Image from 'next/image';

const features = [
  {
    icon: LocationOnIcon,
    title: 'فنادق عالمية',
    description: 'أفضل الفنادق في جميع أنحاء العالم',
  },
  {
    icon: StarIcon,
    title: 'تصنيفات موثوقة',
    description: 'اختيارات مضمونة وتقييمات حقيقية',
  },
  {
    icon: LocalOfferIcon,
    title: 'عروض حصرية',
    description: 'أفضل الأسعار وعروض خاصة لعملائنا',
  },
];

export default function HotelsService() {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
            حجز الفنادق
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 4 }}
          >
            احجز إقامتك في أفضل الفنادق حول العالم
          </Typography>
        </Container>
      </Box>

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
