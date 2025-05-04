import { Box } from '@mui/material';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center',
          bgcolor: 'white',
          borderTop: 1,
          borderColor: 'divider',
          mt: 'auto'
        }}
      >
        © {new Date().getFullYear()} خدمات التأشيرات. جميع الحقوق محفوظة
      </Box>
    </Box>
  );
}
