import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupIcon from '@mui/icons-material/Group';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    icon: VerifiedIcon,
    title: 'خبرة موثوقة',
    description: 'أكثر من 10 سنوات من الخبرة في مجال خدمات التأشيرات والسفر'
  },
  {
    icon: GroupIcon,
    title: 'فريق محترف',
    description: 'فريق متخصص لمساعدتك في جميع إجراءات السفر والتأشيرات'
  },
  {
    icon: SpeedIcon,
    title: 'خدمة سريعة',
    description: 'نضمن لك سرعة الإجراءات وتوفير الوقت والجهد'
  },
  {
    icon: SecurityIcon,
    title: 'خدمة آمنة',
    description: 'نضمن لك السرية التامة وأمان معلوماتك الشخصية'
  }
];

export default function About() {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold', color: '#1976d2' }}>
          من نحن
        </Typography>

        <Paper sx={{ p: 4, mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
            شركة خدمات التأشيرات والسفر
          </Typography>
          <Typography variant="body1" paragraph>
            نحن شركة متخصصة في تقديم خدمات التأشيرات والسفر بأعلى مستويات الجودة والاحترافية. نسعى دائماً لتوفير أفضل الخدمات لعملائنا وتسهيل إجراءات السفر عليهم.
          </Typography>
          <Typography variant="body1" paragraph>
            نمتلك فريقاً من الخبراء المتخصصين في مجال التأشيرات والسفر، ونعمل بشكل مستمر على تطوير خدماتنا لتلبية احتياجات عملائنا المتنوعة.
          </Typography>
        </Paper>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)'
                  }
                }}>
                  <Icon sx={{ fontSize: 50, color: '#1976d2', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Paper sx={{ p: 4, mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
            رؤيتنا
          </Typography>
          <Typography variant="body1" paragraph>
            نسعى لأن نكون الخيار الأول والأفضل في مجال خدمات التأشيرات والسفر، من خلال تقديم خدمات متميزة وحلول مبتكرة تلبي احتياجات عملائنا.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', mt: 4 }}>
            رسالتنا
          </Typography>
          <Typography variant="body1">
            تقديم خدمات التأشيرات والسفر بأعلى معايير الجودة والاحترافية، مع الحرص على راحة العملاء وتوفير الوقت والجهد عليهم.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
