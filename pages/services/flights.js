
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Divider,
  Tooltip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ServiceFeature from '../../components/ServiceFeature';

const airports = [
  { label: 'مطار دبي الدولي (DXB)', code: 'DXB' },
  { label: 'مطار اسطنبول الدولي (IST)', code: 'IST' },
  { label: 'مطار كوالالمبور الدولي (KUL)', code: 'KUL' },
];

import LuggageIcon from '@mui/icons-material/Luggage';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const features = [
  {
    icon: SearchIcon,
    title: 'بحث سهل وسريع',
    description: 'ابحث عن رحلات الطيران بسهولة وقارن بين مختلف شركات الطيران',
  },
  {
    icon: PaymentIcon,
    title: 'أسعار تنافسية',
    description: 'نقدم أفضل الأسعار مع خيارات دفع متعددة ومرنة',
  },
  {
    icon: ConfirmationNumberIcon,
    title: 'حجز فوري',
    description: 'احصل على تأكيد حجزك فوراً مع إمكانية اختيار المقعد المفضل',
  },
  {
    icon: LuggageIcon,
    title: 'خدمة الأمتعة المرنة',
    description: 'اختر وزن الأمتعة المناسب لرحلتك مع خيارات متعددة',
  },
  {
    icon: RestaurantIcon,
    title: 'وجبات خاصة',
    description: 'اطلب وجبتك المفضلة قبل موعد رحلتك',
  },
  {
    icon: NotificationsActiveIcon,
    title: 'تنبيهات الرحلة',
    description: 'احصل على إشعارات فورية حول حالة رحلتك وأي تحديثات',
  }
];

const mealOptions = {
  regular: [
    { value: 'standard', label: 'وجبة قياسية', icon: RestaurantIcon },
    { value: 'special', label: 'وجبة خاصة', icon: RestaurantIcon },
  ],
  vegetarian: [
    { value: 'vegan', label: 'نباتي صرف', icon: RestaurantIcon },
    { value: 'vegetarian', label: 'نباتي', icon: RestaurantIcon },
  ],
  halal: [
    { value: 'halal-regular', label: 'حلال عادي', icon: RestaurantIcon },
    { value: 'halal-special', label: 'حلال خاص', icon: RestaurantIcon },
  ],
};

export default function FlightsPage() {
  const router = useRouter();
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('economy');

  const handleSwapAirports = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };

  const [flightType, setFlightType] = useState('roundtrip');
  const [specialMeal, setSpecialMeal] = useState('');
  const [extraLuggage, setExtraLuggage] = useState(false);
  const [seatPreference, setSeatPreference] = useState('');
  const [priceAlerts, setPriceAlerts] = useState(false);

  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedMealOption, setSelectedMealOption] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Add new state for multicity
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: null, to: null, date: null }
  ]);

  // Function to handle multicity flights
  const handleAddFlight = () => {
    setMultiCityFlights([...multiCityFlights, { from: null, to: null, date: null }]);
  };

  const handleRemoveFlight = (index) => {
    const newFlights = multiCityFlights.filter((_, i) => i !== index);
    setMultiCityFlights(newFlights);
  };

  // Enhanced search function
  const handleSearch = () => {
    setIsSearching(true);
    
    // Prepare search data based on flight type
    const searchData = {
      type: flightType,
      passengers,
      flightClass,
      meals: selectedMealOption,
      seatPreference,
      extraLuggage,
      priceAlerts
    };

    if (flightType === 'roundtrip') {
      searchData.flights = {
        departure: { from: fromAirport, to: toAirport, date: departureDate },
        return: { from: toAirport, to: fromAirport, date: returnDate }
      };
    } else if (flightType === 'oneway') {
      searchData.flights = {
        departure: { from: fromAirport, to: toAirport, date: departureDate }
      };
    } else {
      searchData.flights = multiCityFlights;
    }

    // Simulate API call
    console.log('Searching flights with:', searchData);
    setTimeout(() => {
      setIsSearching(false);
      // Here you would normally handle the search results
    }, 2000);
  };

  // Render flight form based on type
  const renderFlightForm = () => {
    switch (flightType) {
      case 'roundtrip':
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Autocomplete
                value={fromAirport}
                onChange={(event, newValue) => setFromAirport(newValue)}
                options={airports}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="من"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton
                onClick={handleSwapAirports}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <SwapHorizIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} md={5}>
              <Autocomplete
                value={toAirport}
                onChange={(event, newValue) => setToAirport(newValue)}
                options={airports}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="إلى"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="تاريخ المغادرة"
                  value={departureDate}
                  onChange={setDepartureDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="تاريخ العودة"
                  value={returnDate}
                  onChange={setReturnDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={departureDate || new Date()}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );

      case 'oneway':
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Autocomplete
                value={fromAirport}
                onChange={(event, newValue) => setFromAirport(newValue)}
                options={airports}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="من"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton
                onClick={handleSwapAirports}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <SwapHorizIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} md={5}>
              <Autocomplete
                value={toAirport}
                onChange={(event, newValue) => setToAirport(newValue)}
                options={airports}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="إلى"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="تاريخ المغادرة"
                  value={departureDate}
                  onChange={setDepartureDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        );

      case 'multicity':
        return (
          <Box>
            {multiCityFlights.map((flight, index) => (
              <Card
                key={index}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{ mb: 2, p: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      رحلة {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Autocomplete
                      value={flight.from}
                      onChange={(_, newValue) => {
                        const newFlights = [...multiCityFlights];
                        newFlights[index].from = newValue;
                        setMultiCityFlights(newFlights);
                      }}
                      options={airports}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="من"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Autocomplete
                      value={flight.to}
                      onChange={(_, newValue) => {
                        const newFlights = [...multiCityFlights];
                        newFlights[index].to = newValue;
                        setMultiCityFlights(newFlights);
                      }}
                      options={airports}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="إلى"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="التاريخ"
                        value={flight.date}
                        onChange={(newValue) => {
                          const newFlights = [...multiCityFlights];
                          newFlights[index].date = newValue;
                          setMultiCityFlights(newFlights);
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        minDate={index > 0 ? multiCityFlights[index - 1].date : new Date()}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {index > 0 && (
                    <Grid item xs={12}>
                      <Button
                        onClick={() => handleRemoveFlight(index)}
                        startIcon={<DeleteIcon />}
                        color="error"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        حذف الرحلة
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Card>
            ))}
            
            {multiCityFlights.length < 5 && (
              <Button
                onClick={handleAddFlight}
                startIcon={<AddIcon />}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                إضافة رحلة
              </Button>
            )}
          </Box>
        );
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/flight-hero.jpg"
            alt="Airplane in sky"
            layout="fill"
            objectFit="cover"
            priority
          />
        </Box>
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            حجز رحلات الطيران
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 4 }}
          >
            احجز رحلتك بأفضل الأسعار مع أفضل شركات الطيران
          </Typography>
        </Container>
      </Box>

      {/* Search Form Section */}
      <Container sx={{ py: 8 }}>
        <Card
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          sx={{
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)'
            }
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Flight Type Selector with enhanced styling */}
            <Tabs
              value={flightType}
              onChange={(e, newValue) => {
                setFlightType(newValue);
                if (newValue === 'oneway') {
                  setReturnDate(null);
                }
              }}
              sx={{
                mb: 4,
                '& .MuiTabs-indicator': {
                  backgroundColor: '#2196F3',
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                },
                '& .MuiTab-root': {
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#2196F3',
                    transform: 'translateY(-2px)'
                  },
                  '&.Mui-selected': {
                    color: '#2196F3',
                    fontWeight: 700
                  }
                }
              }}
              centered
            >
              <Tab 
                value="roundtrip" 
                label="ذهاب وعودة"
                sx={{
                  '&.Mui-selected': {
                    background: 'rgba(33, 150, 243, 0.1)',
                    borderRadius: '8px 8px 0 0'
                  }
                }}
              />
              <Tab 
                value="oneway" 
                label="ذهاب فقط"
                sx={{
                  '&.Mui-selected': {
                    background: 'rgba(33, 150, 243, 0.1)',
                    borderRadius: '8px 8px 0 0'
                  }
                }}
              />
              <Tab 
                value="multicity" 
                label="وجهات متعددة"
                sx={{
                  '&.Mui-selected': {
                    background: 'rgba(33, 150, 243, 0.1)',
                    borderRadius: '8px 8px 0 0'
                  }
                }}
              />
            </Tabs>

            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Autocomplete
                  value={fromAirport}
                  onChange={(event, newValue) => setFromAirport(newValue)}
                  options={airports}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="من"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  onClick={handleSwapAirports}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <SwapHorizIcon />
                </IconButton>
              </Grid>

              <Grid item xs={12} md={5}>
                <Autocomplete
                  value={toAirport}
                  onChange={(event, newValue) => setToAirport(newValue)}
                  options={airports}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="إلى"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="تاريخ المغادرة"
                    value={departureDate}
                    onChange={(newValue) => setDepartureDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="تاريخ العودة"
                    value={returnDate}
                    onChange={(newValue) => setReturnDate(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>عدد المسافرين</InputLabel>
                  <Select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    label="عدد المسافرين"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} مسافر
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>درجة الرحلة</InputLabel>
                  <Select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    label="درجة الرحلة"
                  >
                    <MenuItem value="economy">الدرجة السياحية</MenuItem>
                    <MenuItem value="business">درجة رجال الأعمال</MenuItem>
                    <MenuItem value="first">الدرجة الأولى</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 2,
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2196F3 60%, #21CBF3 90%)',
                      transform: 'scale(1.02)',
                    }
                  }}
                >
                  بحث عن الرحلات
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Additional Features Section */}
        <Grid item xs={12}>
          <Divider sx={{ 
            my: 4,
            '&::before, &::after': {
              borderColor: 'rgba(0, 0, 0, 0.1)'
            }
          }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                px: 2,
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              خدمات إضافية
            </Typography>
          </Divider>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>تفضيلات المقعد</InputLabel>
                <Select
                  value={seatPreference}
                  onChange={(e) => setSeatPreference(e.target.value)}
                  label="تفضيلات المقعد"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3'
                    }
                  }}
                >
                  <MenuItem value="window">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AirlineSeatReclineExtraIcon />
                      <span>نافذة</span>
                    </Box>
                  </MenuItem>
                  <MenuItem value="aisle">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AirlineSeatReclineExtraIcon />
                      <span>ممر</span>
                    </Box>
                  </MenuItem>
                  <MenuItem value="middle">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AirlineSeatReclineExtraIcon />
                      <span>وسط</span>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>وجبات خاصة</InputLabel>
                <Select
                  value={specialMeal}
                  onChange={(e) => setSpecialMeal(e.target.value)}
                  label="وجبات خاصة"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#2196F3'
                    }
                  }}
                >
                  <MenuItem value="regular">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RestaurantIcon />
                      <span>عادي</span>
                    </Box>
                  </MenuItem>
                  <MenuItem value="vegetarian">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RestaurantIcon />
                      <span>نباتي</span>
                    </Box>
                  </MenuItem>
                  <MenuItem value="halal">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <RestaurantIcon />
                      <span>حلال</span>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={extraLuggage}
                    onChange={(e) => setExtraLuggage(e.target.checked)}
                    sx={{
                      color: '#2196F3',
                      '&.Mui-checked': {
                        color: '#2196F3'
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LuggageIcon color="action" />
                    <Typography>أمتعة إضافية</Typography>
                  </Box>
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={priceAlerts}
                    onChange={(e) => setPriceAlerts(e.target.checked)}
                    sx={{
                      color: '#2196F3',
                      '&.Mui-checked': {
                        color: '#2196F3'
                      }
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NotificationsActiveIcon color="action" />
                    <Typography>تنبيهات الأسعار</Typography>
                  </Box>
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Features Section with enhanced styling */}
        <Grid container spacing={4} sx={{ mt: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 4
                }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.light',
                      borderRadius: '50%',
                      p: 2,
                      mb: 2,
                      color: 'primary.main'
                    }}
                  >
                    {<feature.icon sx={{ fontSize: 40 }} />}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

            {/* Render the dynamic flight form */}
            {renderFlightForm()}

            {/* Common Options Section */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {/* Passengers */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="عدد المسافرين"
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value)))}
                  InputProps={{
                    inputProps: { min: 1 }
                  }}
                />
              </Grid>

              {/* Flight Class */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>درجة الرحلة</InputLabel>
                  <Select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                  >
                    <MenuItem value="economy">اقتصادية</MenuItem>
                    <MenuItem value="business">رجال الأعمال</MenuItem>
                    <MenuItem value="first">الدرجة الأولى</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Meal Selection */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>نوع الوجبة</InputLabel>
                  <Select
                    value={selectedMealType}
                    onChange={(e) => {
                      setSelectedMealType(e.target.value);
                      setSelectedMealOption('');
                    }}
                  >
                    {Object.keys(mealOptions).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type === 'regular' ? 'عادي' : type === 'vegetarian' ? 'نباتي' : 'حلال'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Search Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSearch}
                  disabled={isSearching}
                  sx={{
                    mt: 2,
                    py: 2,
                    fontSize: '1.2rem',
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)'
                    }
                  }}
                >
                  {isSearching ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CircularProgress size={24} color="inherit" />
                      <span>جاري البحث...</span>
                    </Box>
                  ) : (
                    'بحث عن الرحلات'
                  )}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            مميزات خدمة حجز الطيران
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ServiceFeature {...feature} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}