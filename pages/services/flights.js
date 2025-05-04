import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ServiceFeature from '../../components/ServiceFeature';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const features = [
  {
    icon: SearchIcon,
    title: 'بحث سهل وسريع',
    description: 'ابحث عن رحلات الطيران بسهولة وقارن بين مختلف شركات الطيران',
  },
  {
    icon: PaymentIcon,
    title: 'أسعار تنافسية',
    description: 'نقدم أفضل الأسعار مع خيارات دفع متعددة ومرنة',
  },
  {
    icon: ConfirmationNumberIcon,
    title: 'حجز فوري',
    description: 'احصل على تأكيد حجزك فوراً مع إمكانية اختيار المقعد المفضل',
  },
];

export default function FlightsService() {
  const router = useRouter();

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
            src="/images/flight-hero.jpg"
            alt="Airplane in sky"
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
            حجز رحلات الطيران
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 4 }}
          >
            احجز رحلتك بأفضل الأسعار مع أفضل شركات الطيران
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
