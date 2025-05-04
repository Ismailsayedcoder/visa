import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Badge,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import NotificationsIcon from '@mui/icons-material/Notifications';
import io from 'socket.io-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardStats({ requests }) {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    revenueByService: {},
    requestsByCountry: {},
    dailyRequests: []
  });

  useEffect(() => {
    // إعداد Socket.IO
    const socketInit = async () => {
      await fetch('/api/socketio');
      const socket = io();
      
      socket.on('admin-notification', (data) => {
        setNotifications(prev => [data, ...prev]);
        setShowNotification(true);
      });

      setSocket(socket);
    };

    socketInit();

    // تحليل البيانات وإعداد الإحصائيات
    calculateStats();

    return () => {
      if (socket) socket.disconnect();
    };
  }, [requests]);

  const calculateStats = () => {
    const newStats = {
      totalRequests: requests.length,
      pendingRequests: requests.filter(r => r.status === 'pending').length,
      completedRequests: requests.filter(r => r.status === 'completed').length,
      revenueByService: {},
      requestsByCountry: {},
      dailyRequests: []
    };

    // حساب الإيرادات حسب نوع الخدمة
    requests.forEach(request => {
      if (!newStats.revenueByService[request.type]) {
        newStats.revenueByService[request.type] = 0;
      }
      // حساب الإيرادات (هذا مثال، يجب تعديله حسب الأسعار الفعلية)
      newStats.revenueByService[request.type] += getServicePrice(request.type);

      // حساب الطلبات حسب الدولة
      if (!newStats.requestsByCountry[request.country]) {
        newStats.requestsByCountry[request.country] = 0;
      }
      newStats.requestsByCountry[request.country]++;
    });

    setStats(newStats);
  };

  const getServicePrice = (type) => {
    const prices = {
      appointment: 200,
      flight: 300,
      hotel: 250,
      insurance: 300,
      application: 500,
      tourplan: 400
    };
    return prices[type] || 0;
  };

  const getServiceName = (type) => {
    const names = {
      appointment: 'حجز موعد',
      flight: 'حجز طيران',
      hotel: 'حجز فندق',
      insurance: 'تأمين سفر',
      application: 'طلب تأشيرة',
      tourplan: 'برنامج سياحي'
    };
    return names[type] || type;
  };

  const chartData = {
    revenue: {
      labels: Object.keys(stats.revenueByService).map(type => getServiceName(type)),
      datasets: [{
        data: Object.values(stats.revenueByService),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    },
    countries: {
      labels: Object.keys(stats.requestsByCountry),
      datasets: [{
        data: Object.values(stats.requestsByCountry),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }]
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* إحصائيات سريعة */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إجمالي الطلبات
              </Typography>
              <Typography variant="h3">
                {stats.totalRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                الطلبات قيد الانتظار
              </Typography>
              <Typography variant="h3" color="warning.main">
                {stats.pendingRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                الطلبات المكتملة
              </Typography>
              <Typography variant="h3" color="success.main">
                {stats.completedRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* الرسوم البيانية */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                الإيرادات حسب نوع الخدمة
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={chartData.revenue} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                الطلبات حسب الدولة
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={chartData.countries} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* الإشعارات الأخيرة */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  آخر الإشعارات
                </Typography>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </Box>
              <List>
                {notifications.slice(0, 5).map((notification, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`طلب جديد: ${getServiceName(notification.type)}`}
                      secondary={`من: ${notification.clientName} - ${new Date(notification.date).toLocaleString('ar-EG')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* إشعار منبثق للطلبات الجديدة */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
      >
        <Alert severity="info" onClose={() => setShowNotification(false)}>
          تم استلام طلب جديد!
        </Alert>
      </Snackbar>
    </Box>
  );
}
