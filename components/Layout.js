import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 4, md: 6 },
          bgcolor: 'background.default'
        }}
      >
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
};

export default Layout;
