import { Paper, Typography, Box } from '@mui/material';

export default function ServiceFeature({ icon: Icon, title, description }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
        },
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#1976d2',
          mb: 2,
        }}
      >
        <Icon sx={{ fontSize: 30, color: 'white' }} />
      </Box>
      <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
}
