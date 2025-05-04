import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../../components/admin/AuthGuard';
import DashboardStats from '../../components/admin/Dashboard';
import SearchFilters from '../../components/admin/SearchFilters';
import ExportData from '../../components/admin/ExportData';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

export default function AdminDashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    const mockRequests = [
      {
        id: 1,
        type: 'appointment',
        clientName: 'أحمد محمد',
        phone: '0123456789',
        email: 'ahmed@example.com',
        status: 'pending',
        date: new Date().toLocaleDateString('ar-EG'),
        details: {
          country: 'السعودية',
          visaType: 'سياحية',
          passportNumber: 'A123456'
        }
      },
      {
        id: 2,
        type: 'flight',
        clientName: 'محمد علي',
        phone: '0987654321',
        email: 'mohamed@example.com',
        status: 'processing',
        date: new Date().toLocaleDateString('ar-EG'),
        details: {
          destination: 'دبي',
          departureDate: '2025-05-01',
          returnDate: '2025-05-15'
        }
      }
    ];
    setRequests(mockRequests);
    setFilteredRequests(mockRequests);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa000';
      case 'processing': return '#2196f3';
      case 'completed': return '#4caf50';
      default: return '#757575';
    }
  };

  const serviceTypes = {
    appointment: 'حجز موعد',
    flight: 'حجز طيران',
    hotel: 'حجز فندق',
    insurance: 'تأمين سفر',
    application: 'طلب تأشيرة',
    tourplan: 'برنامج سياحي'
  };

  const handleFilterChange = (filters) => {
    let filtered = [...requests];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(request =>
        request.clientName?.toLowerCase().includes(searchLower) ||
        request.phone?.includes(filters.search) ||
        request.email?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }

    if (filters.service !== 'all') {
      filtered = filtered.filter(request => request.type === filters.service);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(request =>
        new Date(request.date) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(request =>
        new Date(request.date) <= new Date(filters.dateTo)
      );
    }

    setFilteredRequests(filtered);
  };

  return (
    <AuthGuard>
      <Box sx={{ p: 3 }}>
        <DashboardStats requests={requests} />
        <Box sx={{ my: 3 }}>
          <ExportData requests={filteredRequests} />
          <SearchFilters onFilterChange={handleFilterChange} />
        </Box>

        <Typography variant="h4" gutterBottom align="center">
          لوحة تحكم المشرف
        </Typography>

        <Card sx={{ mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label="جميع الطلبات" />
            <Tab label="قيد الانتظار" />
            <Tab label="قيد المعالجة" />
            <Tab label="مكتملة" />
          </Tabs>
        </Card>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>رقم الطلب</TableCell>
                <TableCell>نوع الخدمة</TableCell>
                <TableCell>اسم العميل</TableCell>
                <TableCell>رقم الهاتف</TableCell>
                <TableCell>البريد الإلكتروني</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell>التاريخ</TableCell>
                <TableCell>تفاصيل</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{serviceTypes[request.type]}</TableCell>
                  <TableCell>{request.clientName}</TableCell>
                  <TableCell>{request.phone}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: getStatusColor(request.status),
                        color: 'white',
                        p: 1,
                        borderRadius: 1,
                        textAlign: 'center'
                      }}
                    >
                      {request.status === 'pending' ? 'قيد الانتظار' :
                       request.status === 'processing' ? 'قيد المعالجة' : 'مكتمل'}
                    </Box>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewDetails(request)}
                    >
                      عرض التفاصيل
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          {selectedRequest && (
            <>
              <DialogTitle>
                تفاصيل الطلب #{selectedRequest.id}
              </DialogTitle>
              <DialogContent>
                <Typography><strong>نوع الخدمة:</strong> {serviceTypes[selectedRequest.type]}</Typography>
                <Typography><strong>اسم العميل:</strong> {selectedRequest.clientName}</Typography>
                <Typography><strong>رقم الهاتف:</strong> {selectedRequest.phone}</Typography>
                <Typography><strong>البريد الإلكتروني:</strong> {selectedRequest.email}</Typography>
                <Typography><strong>الحالة:</strong> {selectedRequest.status}</Typography>
                <Typography><strong>التاريخ:</strong> {selectedRequest.date}</Typography>
                
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>تفاصيل إضافية:</Typography>
                {Object.entries(selectedRequest.details).map(([key, value]) => (
                  <Typography key={key}>
                    <strong>{key}:</strong> {value}
                  </Typography>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>
                  إغلاق
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </AuthGuard>
  );
}
