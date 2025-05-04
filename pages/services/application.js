import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Box, Card, CardContent, TextField, Button, Typography, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function Application() {
  const router = useRouter();
  const { country, visaType } = router.query;
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: null,
    nationality: '',
    passportNumber: '',
    passportExpiry: null,
    address: '',
    phone: '',
    email: '',
    
    // Employment Information
    employer: '',
    jobTitle: '',
    workAddress: '',
    monthlyIncome: '',
    
    // Travel Information
    travelDate: null,
    returnDate: null,
    destinationCity: '',
    accommodation: '',
    
    // Contact Person
    contactName: '',
    contactRelation: '',
    contactPhone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, country, visaType });
    alert('تم إرسال طلب التأشيرة بنجاح. سيتم التواصل معك قريباً');
  };

  return (
    <Layout>
      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            نموذج طلب تأشيرة
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              المعلومات الشخصية
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="الاسم الكامل"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="تاريخ الميلاد"
                    value={formData.dateOfBirth}
                    onChange={(newValue) => setFormData({...formData, dateOfBirth: newValue})}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="الجنسية"
                  required
                  value={formData.nationality}
                  onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="رقم جواز السفر"
                  required
                  value={formData.passportNumber}
                  onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              معلومات العمل
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="جهة العمل"
                  required
                  value={formData.employer}
                  onChange={(e) => setFormData({...formData, employer: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="المسمى الوظيفي"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="الدخل الشهري"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              معلومات السفر
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="تاريخ السفر"
                    value={formData.travelDate}
                    onChange={(newValue) => setFormData({...formData, travelDate: newValue})}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="مدينة الوجهة"
                  required
                  value={formData.destinationCity}
                  onChange={(e) => setFormData({...formData, destinationCity: e.target.value})}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              معلومات الاتصال في حالات الطوارئ
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="اسم جهة الاتصال"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="صلة القرابة"
                  required
                  value={formData.contactRelation}
                  onChange={(e) => setFormData({...formData, contactRelation: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
            >
              تقديم الطلب
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}
