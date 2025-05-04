import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useMediaQuery,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import InfoIcon from '@mui/icons-material/Info';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ExploreIcon from '@mui/icons-material/Explore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';
import { useTheme as useMuiTheme } from '@mui/material/styles';

const menuItems = [
  { 
    title: 'الرئيسية', 
    icon: <HomeIcon />, 
    path: '/' 
  },
  { 
    title: 'خدماتنا', 
    icon: <DescriptionIcon />,
    path: '/services',
    subItems: [
      { title: 'حجز طيران', icon: <FlightIcon />, path: '/services/flights' },
      { title: 'حجز فنادق', icon: <HotelIcon />, path: '/services/hotels' },
      { title: 'تأشيرات', icon: <DescriptionIcon />, path: '/services/visas' },
      { title: 'حجز مواعيد', icon: <EventAvailableIcon />, path: '/services/appointments' },
      { title: 'تأمين سفر', icon: <LocalHospitalIcon />, path: '/services/insurance' },
      { title: 'برامج سياحية', icon: <ExploreIcon />, path: '/services/tours' },
      { title: 'تقديم طلب', icon: <AssignmentIcon />, path: '/services/application' },
    ]
  },
  { 
    title: 'من نحن', 
    icon: <InfoIcon />,
    path: '/about' 
  },
  { 
    title: 'اتصل بنا', 
    icon: <ContactSupportIcon />,
    path: '/contact' 
  },
  { 
    title: 'لوحة التحكم', 
    icon: <BusinessIcon />,
    path: '/admin/dashboard' 
  }
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSubMenu, setAnchorElSubMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorElSubMenu(null);
    setActiveSubMenu(null);
  };

  const handleOpenSubMenu = (event, item) => {
    setAnchorElSubMenu(event.currentTarget);
    setActiveSubMenu(item);
  };

  const handleCloseSubMenu = () => {
    setAnchorElSubMenu(null);
    setActiveSubMenu(null);
  };

  const handleNavigation = (path) => {
    if (!path) return;
    window.location.href = path;
    handleCloseNavMenu();
    handleCloseSubMenu();
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <FlightTakeoffIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              color: 'primary.main'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Cairo',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            خدمات التأشيرات
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="القائمة"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.subItems ? (
                    <MenuItem onClick={(e) => handleOpenSubMenu(e, item)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={() => handleNavigation(item.path)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </MenuItem>
                  )}
                </div>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <FlightTakeoffIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              color: 'primary.main'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Cairo',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            خدمات التأشيرات
          </Typography>

          {/* Add theme toggle button */}
          <IconButton 
            onClick={toggleTheme} 
            sx={{ 
              ml: 2,
              color: isDarkMode ? '#ffffff' : '#000000'
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.title}
                onClick={item.subItems ? (e) => handleOpenSubMenu(e, item) : () => handleNavigation(item.path)}
                sx={{ 
                  my: 2, 
                  color: 'primary.main',
                  display: 'block',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>

      {/* Submenu for desktop */}
      <Menu
        anchorEl={anchorElSubMenu}
        open={Boolean(anchorElSubMenu)}
        onClose={handleCloseSubMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            '& .MuiMenuItem-root': {
              py: 1.5,
              px: 2,
            }
          }
        }}
      >
        {activeSubMenu?.subItems?.map((subItem) => (
          <MenuItem 
            key={subItem.title} 
            onClick={() => handleNavigation(subItem.path)}
            sx={{ 
              minWidth: 200,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            <ListItemIcon>
              {subItem.icon || activeSubMenu.icon}
            </ListItemIcon>
            <ListItemText primary={subItem.title} />
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Navbar;
