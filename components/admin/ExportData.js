import { Button, Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ExportData({ requests }) {
  const exportToExcel = () => {
    // تحويل البيانات إلى تنسيق CSV
    const headers = [
      'رقم الطلب',
      'نوع الخدمة',
      'اسم العميل',
      'الدولة',
      'نوع التأشيرة',
      'رقم الهاتف',
      'البريد الإلكتروني',
      'الحالة',
      'التاريخ'
    ].join(',');

    const rows = requests.map(request => [
      request.id,
      getServiceName(request.type),
      request.clientName || request.fullName,
      request.country,
      request.visaType,
      request.phone,
      request.email,
      getStatusName(request.status),
      new Date(request.date).toLocaleString('ar-EG')
    ].join(','));

    const csv = [headers, ...rows].join('\n');
    
    // إنشاء ملف للتحميل
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `تقرير_الطلبات_${new Date().toLocaleDateString('ar-EG')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const getStatusName = (status) => {
    const names = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      completed: 'مكتمل'
    };
    return names[status] || status;
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FileDownloadIcon />}
        onClick={exportToExcel}
      >
        تصدير التقرير
      </Button>
    </Box>
  );
}
