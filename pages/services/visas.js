import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportIcon from '@mui/icons-material/Support';
import ServiceFeature from '../../components/ServiceFeature';
import Image from 'next/image';


const features = [
  {
    icon: AccessTimeIcon,
    title: 'سرعة الإجراءات',
    description: 'نقدم خدمة سريعة وفعالة للحصول على التأشيرة',
  },
  {
    icon: VerifiedIcon,
    title: 'ضمان الجودة',
    description: 'نضمن تقديم المستندات بشكل صحيح وكامل',
  },
  {
    icon: SupportIcon,
    title: 'دعم متخصص',
    description: 'فريق متخصص لمتابعة طلبك خطوة بخطوة',
  },
];

export default function VisasService() {
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
            src="/images/visa-hero.jpg"
            alt="Passport and visa documents"
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
            خدمة التأشيرات
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            خدمات شاملة للتأشيرات لجميع دول العالم
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<DescriptionIcon />}
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
              ابدأ طلب التأشيرة
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
          لماذا تختار خدماتنا؟
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
            خدماتنا المتكاملة
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            نقدم خدمات شاملة للتأشيرات تشمل:
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {[
              'تجهيز جميع المستندات المطلوبة',
              'ملء نماذج التأشيرة بشكل احترافي',
              'حجز مواعيد السفارات',
              'خدمة الترجمة المعتمدة',
              'متابعة حالة الطلب',
              'خدمة التوصيل للمنزل',
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
