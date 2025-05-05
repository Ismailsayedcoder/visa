import { useRouter } from 'next/router';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { destinations } from '../../data/destinations';

export default function DestinationPage({ destination }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>جاري التحميل...</div>;
  }

  if (!destination) {
    return <div>لم يتم العثور على الوجهة</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {destination.title}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center">
          {destination.description}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {destination.highlights.map((highlight, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6">{highlight}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getStaticPaths() {
  const paths = destinations.map((destination) => ({
    params: { destination: destination.shortTitle }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const destination = destinations.find(
    (dest) => dest.shortTitle === params.destination
  );

  return {
    props: {
      destination: destination || null
    }
  };
}