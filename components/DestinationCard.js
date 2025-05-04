import { memo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Chip,
  useTheme
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import Image from 'next/image';

const DestinationCard = memo(({ destination, onClick }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[8]
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ position: 'relative', height: 200 }}>
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={destination.id === 1}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {destination.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {destination.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }} />
          <Typography variant="body2">{destination.duration}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={destination.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>({destination.rating})</Typography>
        </Box>
        <Typography variant="h6" color="primary.main" sx={{ mt: 1 }}>
          {destination.price}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {destination.features.map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard; 