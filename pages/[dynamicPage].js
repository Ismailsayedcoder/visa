import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';

export default function DynamicPage({ page }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          {page}
        </Typography>
      </Container>
    </Box>
  );
}

// Add getStaticPaths to define valid paths
export async function getStaticPaths() {
  return {
    paths: [
      // Define your dynamic routes here
      { params: { dynamicPage: 'terms' } },
      { params: { dynamicPage: 'privacy' } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      // Your page props here
      page: params.dynamicPage
    }
  };
}