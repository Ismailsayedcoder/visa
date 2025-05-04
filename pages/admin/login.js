import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Container,
  Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // التحقق من وجود توكن تسجيل الدخول
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // التحقق من بيانات الدخول (يمكن تعديلها حسب الحاجة)
    if (formData.username === 'admin' && formData.password === 'admin123') {
      localStorage.setItem('adminToken', 'dummy-token-for-demo');
      router.push('/admin/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth={false} sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f5f5f5',
      py: 8
    }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 3,
          px: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h5" component="h1">
            تسجيل دخول المشرف
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="اسم المستخدم"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="username"
              dir="rtl"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="كلمة المرور"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="current-password"
              dir="rtl"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              تسجيل الدخول
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
