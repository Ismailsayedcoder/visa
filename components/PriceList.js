import { memo } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme } from '@mui/material/styles';

const prices = {
  visaTypes: {
    tourist: {
      usa: { price: 3000, duration: '3-6 أسابيع', note: 'تشمل الرسوم التأمين الصحي' },
      uk: { price: 2500, duration: '3-4 أسابيع', note: 'تشمل الرسوم البيومترية' },
      schengen: { price: 2000, duration: '2-3 أسابيع', note: 'صالحة لجميع دول شنغن' },
      uae: { price: 500, duration: '3-5 أيام', note: 'تشمل التأمين الإلزامي' }
    },
    business: {
      usa: { price: 4000, duration: '4-8 أسابيع', note: 'تشمل خطاب الدعوة' },
      uk: { price: 3500, duration: '3-5 أسابيع', note: 'تشمل ترجمة المستندات' },
      schengen: { price: 2500, duration: '2-4 أسابيع', note: 'صالحة لمدة عام' },
      uae: { price: 800, duration: '5-7 أيام', note: 'تشمل التأمين الصحي' }
    },
    student: {
      usa: { price: 3500, duration: '6-8 أسابيع', note: 'تشمل التأمين الصحي' },
      uk: { price: 3000, duration: '4-6 أسابيع', note: 'تشمل ترجمة المستندات' },
      schengen: { price: 2200, duration: '3-4 أسابيع', note: 'صالحة لمدة الدراسة' },
      uae: { price: 600, duration: '5-7 أيام', note: 'تشمل التأمين الإلزامي' }
    },
    medical: {
      usa: { price: 3800, duration: '5-7 أسابيع', note: 'تشمل ترجمة التقارير الطبية' },
      uk: { price: 3200, duration: '3-5 أسابيع', note: 'تشمل التأمين الصحي' },
      schengen: { price: 2300, duration: '2-4 أسابيع', note: 'صالحة لمدة العلاج' },
      uae: { price: 700, duration: '3-5 أيام', note: 'تشمل خطاب المستشفى' }
    }
  },
  services: {
    appointment: { price: 200, note: 'يشمل تنسيق المواعيد' },
    insurance: { price: 300, note: 'تغطية شاملة' },
    application: { price: 500, note: 'يشمل مراجعة المستندات' }
  }
};

const PriceListItem = memo(({ icon: Icon, primary, secondary, divider }) => (
  <>
    <ListItem>
      <Box sx={{ mr: 2, color: 'primary.main' }}>
        <Icon />
      </Box>
      <ListItemText 
        primary={<Typography variant="subtitle1">{primary}</Typography>}
        secondary={<Typography variant="body2" color="text.secondary">{secondary}</Typography>}
      />
    </ListItem>
    {divider && <Divider />}
  </>
));

PriceListItem.displayName = 'PriceListItem';

export default function PriceList({ country, visaType }) {
  const theme = useTheme();
  const priceInfo = prices.visaTypes[visaType]?.[country];

  if (!priceInfo) return null;

  return (
    <Card
      sx={{
        mt: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          تفاصيل الرسوم والمدة
        </Typography>
        <List>
          <PriceListItem
            icon={PaymentIcon}
            primary={`الرسوم: ${priceInfo.price} ريال`}
            secondary="شاملة جميع المصاريف"
            divider
          />
          <PriceListItem
            icon={AccessTimeIcon}
            primary={`مدة الإجراءات: ${priceInfo.duration}`}
            secondary="المدة التقريبية للحصول على التأشيرة"
            divider
          />
          <PriceListItem
            icon={InfoIcon}
            primary="ملاحظات"
            secondary={priceInfo.note}
          />
        </List>
      </CardContent>
    </Card>
  );
}



