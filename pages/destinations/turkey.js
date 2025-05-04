import { Box, Container, Typography, Grid, Paper, Chip } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Turkey() {
  return (
    <Box>
      {/* قسم الصورة الرئيسية */}
      <Box sx={{ height: '70vh', position: 'relative' }}>
        <Image
          src="/images/turkey-hero.jpg"
          alt="تركيا"
          layout="fill"
          objectFit="cover"
          priority
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                textAlign: 'center',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: 'Tajawal'
              }}
            >
              تركيا
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                textAlign: 'center',
                mt: 2,
                fontFamily: 'Tajawal',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              استمتع بجمال الطبيعة والتاريخ العريق
            </Typography>
          </motion.div>
        </Box>
      </Box>

      {/* قسم المعالم السياحية */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: 'Tajawal', fontWeight: 'bold', color: 'primary.main' }}
              >
                معالم سياحية بارزة
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}
              >
                تجمع تركيا بين جمال الطبيعة وعراقة التاريخ، مع مزيج فريد من الثقافة الشرقية والغربية
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {["آيا صوفيا", "البسفور", "كابادوكيا", "السوق المغطى"].map((highlight, idx) => (
                  <Chip
                    key={idx}
                    label={highlight}
                    icon={<LocationOnIcon />}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontSize: '1rem',
                      py: 2,
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Box sx={{ position: 'relative', height: 400, borderRadius: 4, overflow: 'hidden' }}>
                <Image
                  src="/images/turkey.jpg"
                  alt="معالم تركيا"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}