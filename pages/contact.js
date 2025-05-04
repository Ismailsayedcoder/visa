import { Box, Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال النموذج
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold', color: '#1976d2' }}>
          اتصل بنا
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                أرسل لنا رسالة
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="الاسم"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="البريد الإلكتروني"
                  type="email"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="الرسالة"
                  multiline
                  rows={4}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  إرسال
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                معلومات الاتصال
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LocationOnIcon sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography>
                    شارع الملك فهد، الرياض، المملكة العربية السعودية
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PhoneIcon sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography>
                    +966 11 234 5678
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmailIcon sx={{ color: '#1976d2', mr: 2, fontSize: 30 }} />
                  <Typography>
                    info@visaservices.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  ساعات العمل
                </Typography>
                <Typography>
                  الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً
                </Typography>
                <Typography>
                  الجمعة - السبت: مغلق
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
