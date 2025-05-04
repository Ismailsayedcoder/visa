import { useState, useCallback, useEffect, memo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import arSA from 'date-fns/locale/ar-SA';

const statusOptions = [
  { value: 'all', label: 'الكل' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد المعالجة' },
  { value: 'completed', label: 'مكتمل' },
  { value: 'rejected', label: 'مرفوض' }
];

const serviceOptions = [
  { value: 'all', label: 'كل الخدمات' },
  { value: 'visa', label: 'تأشيرة سياحية' },
  { value: 'business', label: 'تأشيرة عمل' },
  { value: 'student', label: 'تأشيرة دراسية' },
  { value: 'family', label: 'تأشيرة عائلية' }
];

const SearchFilters = memo(({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    service: 'all',
    dateFrom: null,
    dateTo: null,
    ...initialFilters
  });

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== filters.search) {
        handleFilterChange('search', debouncedSearch);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  const handleFilterChange = useCallback((field, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [field]: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters = {
      search: '',
      status: 'all',
      service: 'all',
      dateFrom: null,
      dateTo: null
    };
    setFilters(clearedFilters);
    setDebouncedSearch('');
    onFilterChange(clearedFilters);
  }, [onFilterChange]);

  const isFiltersActive = useCallback(() => {
    return filters.search !== '' ||
      filters.status !== 'all' ||
      filters.service !== 'all' ||
      filters.dateFrom !== null ||
      filters.dateTo !== null;
  }, [filters]);

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ position: 'relative' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="بحث (اسم، هاتف، بريد)"
              value={debouncedSearch}
              onChange={(e) => setDebouncedSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <SearchIcon color="action" sx={{ ml: 1 }} />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>الحالة</InputLabel>
              <Select
                value={filters.status}
                label="الحالة"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                {statusOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>نوع الخدمة</InputLabel>
              <Select
                value={filters.service}
                label="نوع الخدمة"
                onChange={(e) => handleFilterChange('service', e.target.value)}
              >
                {serviceOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arSA}>
              <DatePicker
                label="من تاريخ"
                value={filters.dateFrom}
                onChange={(date) => handleFilterChange('dateFrom', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'medium'
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arSA}>
              <DatePicker
                label="إلى تاريخ"
                value={filters.dateTo}
                onChange={(date) => handleFilterChange('dateTo', date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'medium'
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          {isFiltersActive() && (
            <Grid item xs="auto">
              <Tooltip title="مسح الفلاتر">
                <IconButton
                  onClick={handleClearFilters}
                  size="small"
                  sx={{
                    bgcolor: 'grey.100',
                    '&:hover': { bgcolor: 'grey.200' }
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </Box>
    </Paper>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters;
