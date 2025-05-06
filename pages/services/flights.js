import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import ServiceFeature from '../../components/ServiceFeature';

const airports = [
  { label: 'مطار دبي الدولي (DXB)', code: 'DXB' },
  { label: 'مطار اسطنبول الدولي (IST)', code: 'IST' },
  { label: 'مطار كوالالمبور الدولي (KUL)', code: 'KUL' },
];

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

export default function FlightsPage() {
  const [tripType, setTripType] = useState(0);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleTripTypeChange = (event, newValue) => {
    setTripType(newValue);
  };

  return (
    <Layout>
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Container sx={{ py: 8 }}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)',
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Tabs
                value={tripType}
                onChange={handleTripTypeChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                sx={{ mb: 3 }}
              >
                <Tab label="ذهاب فقط" />
                <Tab label="ذهاب وعودة" />
              </Tabs>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={airports}
                    getOptionLabel={(option) => option.label}
                    value={origin}
                    onChange={(e, newValue) => setOrigin(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="من" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={airports}
                    getOptionLabel={(option) => option.label}
                    value={destination}
                    onChange={(e, newValue) => setDestination(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} label="إلى" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="تاريخ المغادرة"
                      value={departureDate}
                      onChange={(newValue) => setDepartureDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                {tripType === 1 && (
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="تاريخ العودة"
                        value={returnDate}
                        onChange={(newValue) => setReturnDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </LocalizationProvider>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" size="large" fullWidth>
                    بحث عن الرحلات
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
              مميزات خدمة حجز الطيران
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ServiceFeature {...feature} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}
