import { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Paper, TextField } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ServiceFeature from '../../components/ServiceFeature';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const features = [
  {
    icon: LocalHospitalIcon,
    title: 'تغطية طبية شاملة',
    description: 'تغطية كاملة للحالات الطبية الطارئة',
  },
  {
    icon: SecurityIcon,
    title: 'حماية السفر',
    description: 'تأمين شامل لرحلتك وممتلكاتك',
  },
  {
    icon: AttachMoneyIcon,
    title: 'أسعار تنافسية',
    description: 'باقات تأمين بأسعار مناسبة للجميع',
  },
];

export default function InsuranceService() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    travelDate: '',
    destination: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم إرسال طلب التأمين بنجاح. سيتم التواصل معك قريباً');
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
            src="/images/insurance-hero.jpg"
            alt="Travel insurance coverage"
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
            خدمة تأمين السفر
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            سافر بأمان مع تغطية تأمينية شاملة
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<SecurityIcon />}
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
              احصل على تأمينك الآن
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
          مميزات تأمين السفر
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
            mb: 8,
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="primary">
            التغطية التأمينية
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            تشمل وثيقة التأمين الخاصة بنا:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {[
              'التغطية الطبية الطارئة',
              'تأمين الأمتعة والممتلكات',
              'تعويض إلغاء الرحلة',
              'المسؤولية المدنية',
              'خدمة المساعدة على مدار الساعة',
              'تغطية الرياضات والأنشطة الخطرة',
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

        {/* Insurance Request Form */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="primary">
            طلب تأمين سفر
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="الاسم الكامل"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="رقم الهوية"
                  required
                  value={formData.idNumber}
                  onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="البريد الإلكتروني"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="تاريخ السفر"
                  type="date"
                  required
                  value={formData.travelDate}
                  onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="وجهة السفر"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ملاحظات إضافية"
                  multiline
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
            >
              تقديم الطلب
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
