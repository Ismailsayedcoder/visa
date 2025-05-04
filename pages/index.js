import Head from 'next/head';
import { Box, Container, Typography, Grid, Paper, Button, Card, CardContent, IconButton, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HotelIcon from '@mui/icons-material/Hotel';
import ExploreIcon from '@mui/icons-material/Explore';
import Image from 'next/image';

const features = [
  {
    title: 'حجز رحلات',
    description: 'اكتشف أفضل العروض على تذاكر الطيران',
    icon: FlightTakeoffIcon,
    link: '/services/flights'
  },
  {
    title: 'إقامة فاخرة',
    description: 'فنادق راقية بأسعار تنافسية',
    icon: HotelIcon,
    link: '/services/hotels'
  },
  {
    title: 'برامج سياحية',
    description: 'باقات سياحية متكاملة لوجهات مميزة',
    icon: ExploreIcon,
    link: '/services/tours' // تصحيح المسار
  }
];

const destinations = [
  {
    title: "دبي",
    shortTitle: "دبي",
    description: "اكتشف روعة المدينة العصرية وناطحات السحاب المذهلة",
    image: "/images/dubai.jpg",
    heroImage: "/images/dubai-hero.jpg",
    highlights: ["برج خليفة", "دبي مول", "جزيرة النخلة", "المدينة القديمة"]
  },
  {
    title: "تركيا",
    shortTitle: "تركيا",
    description: "استمتع بجمال الطبيعة والتاريخ العريق",
    image: "/images/turkey.jpg",
    heroImage: "/images/turkey-hero.jpg",
    highlights: ["آيا صوفيا", "البسفور", "كابادوكيا", "السوق المغطى"]
  },
  {
    title: "ماليزيا",
    shortTitle: "ماليزيا",
    description: "اكتشف سحر الطبيعة الاستوائية والثقافة الآسيوية",
    image: "/images/malaysia.jpg",
    heroImage: "/images/malaysia-hero.jpg",
    highlights: ["برجا بتروناس", "جزيرة لنكاوي", "مرتفعات جنتنج", "مدينة ملاكا"]
  }
];

export default function Home() {
  const router = useRouter();

  const handleServiceClick = (path) => {
    if (!path) return;
    router.push(path);
  };

  return (
    <Box>
      <Head>
        <title>وكالة السفر والسياحة</title>
        <meta name="description" content="خدمات سياحية متكاملة ورحلات مميزة" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* قسم الترحيب الرئيسي */}
      <Box sx={{ height: '80vh', position: 'relative' }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          style={{
            height: '100%',
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            '--swiper-navigation-size': '44px'
          }}
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
                    zIndex: 1
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '30%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    zIndex: 1
                  }
                }}
              >
                <Image
                  src={destination.heroImage}
                  alt={destination.title}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                  quality={85}
                  style={{
                    transform: 'scale(1.1)',
                    transition: 'transform 6s ease-in-out'
                  }}
                />
                <Container sx={{ position: 'relative', zIndex: 2, color: 'white' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Typography 
                      variant="h1" 
                      sx={{
                        fontSize: { xs: '2.5rem', md: '4.5rem' },
                        fontWeight: 800,
                        mb: 2,
                        textAlign: 'center',
                        fontFamily: 'Tajawal',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {index === 0 ? 'اكتشف العالم معنا' : destination.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'Tajawal',
                        opacity: 0.9,
                        mb: 4,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {index === 0 ? 'رحلات مميزة وتجارب لا تنسى' : destination.description}
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => handleServiceClick(`/destinations/${destination.shortTitle.toLowerCase()}`)}
                        sx={{
                          backgroundColor: 'transparent',
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.2rem',
                          border: '2px solid white',
                          borderRadius: '30px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'primary.main',
                            transform: 'scale(1.05)',
                          }
                        }}
                      >
                        اكتشف المزيد
                      </Button>
                    </Box>
                  </motion.div>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* قسم المميزات */}
      <Container sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom 
            sx={{ 
              mb: 6, 
              color: 'primary.main',
              fontFamily: 'Tajawal',
              fontWeight: 'bold'
            }}
          >
            خدماتنا المميزة
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={3}
                    onClick={() => handleServiceClick(feature.link)}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Icon sx={{ 
                      fontSize: 80, 
                      color: 'primary.main', 
                      mb: 3,
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                    }} />
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontFamily: 'Tajawal', fontWeight: 'bold' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                      {feature.description}
                    </Typography>
                    <Button 
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => handleServiceClick(feature.link)}
                      sx={{
                        mt: 'auto',
                        borderRadius: '30px',
                        px: 3,
                        py: 1.2,
                        backgroundColor: 'transparent',
                        border: '2px solid',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          transform: 'scale(1.05)',
                        }
                      }}
                    >
                      اكتشف المزيد
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* قسم الوجهات السياحية */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                mb: 6, 
                color: 'primary.main',
                fontFamily: 'Tajawal',
                fontWeight: 'bold'
              }}
            >
              وجهات مميزة
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {destinations.map((destination, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    onClick={() => handleServiceClick(`/destinations/${destination.shortTitle.toLowerCase()}`)}
                    sx={{ 
                      height: '100%',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                      },
                      '&:hover img': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: 250,
                        width: '100%'
                      }}
                    >
                      <Image
                        src={destination.image}
                        alt={destination.title}
                        layout="fill"
                        objectFit="cover"
                        priority={index === 0}
                        quality={100}
                      />
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ fontFamily: 'Tajawal', fontWeight: 'bold' }}
                      >
                        {destination.title}
                      </Typography>
                      <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                        {destination.description}
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(`/destinations/${destination.shortTitle.toLowerCase()}`);
                        }}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          px: 3,
                          py: 1,
                          fontSize: '1rem',
                          borderRadius: '30px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'scale(1.05)',
                          }
                        }}
                      >
                        اكتشف المزيد
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// تحديث أزرار الخدمات
<Button
  variant="contained"
  size="large"
  endIcon={<ArrowForwardIcon />}
  onClick={() => handleServiceClick(`/destinations/${destination.shortTitle.toLowerCase()}`)}
  sx={{
    backgroundColor: 'transparent',
    color: 'white',
    px: 4,
    py: 1.5,
    fontSize: '1.2rem',
    border: '2px solid white',
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'white',
      color: 'primary.main',
      transform: 'scale(1.05)',
    }
  }}
>
  اكتشف المزيد
</Button>
