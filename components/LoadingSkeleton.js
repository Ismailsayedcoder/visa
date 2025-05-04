import { Skeleton, Card, CardContent, Box } from '@mui/material';

export function FormSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 3, mx: 'auto' }} />
        <Box sx={{ mt: 3 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />
          ))}
          <Skeleton variant="rectangular" height={36} sx={{ mt: 2, borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
}

export function PriceListSkeleton() {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
        {[1, 2, 3, 4].map((i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Skeleton variant="text" width="70%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export function ServiceCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1, mb: 2 }} />
        <Skeleton variant="text" width="80%" height={32} />
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 1 }} />
      </CardContent>
    </Card>
  );
}
