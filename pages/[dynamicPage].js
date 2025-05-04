import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@mui/material';

export default function DynamicPage() {
  const router = useRouter();
  const { dynamicPage } = router.query;

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          {dynamicPage}
        </Typography>
      </Container>
    </Box>
  );
}

// Add this function to generate the static paths
export async function getStaticPaths() {
  return {
    paths: [], // Define your paths here
    fallback: 'blocking' // or false or true depending on your needs
  }
}

// Add this function to fetch the data for each path
export async function getStaticProps({ params }) {
  return {
    props: {
      // Your page props here
    }
  }
}