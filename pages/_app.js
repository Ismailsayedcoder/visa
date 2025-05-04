import { useState, useEffect } from 'react';
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { arSA } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import { ThemeProvider as CustomThemeProvider } from '../context/ThemeContext';

// تحميل المكونات بشكل كسول
const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

// إنشاء كاش RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// إنشاء الثيم مع اتجاه RTL
const themeObj = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
        },
      },
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // تقليل وقت التحميل إلى 100 مللي ثانية

    return () => clearTimeout(timer);
  }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1976d2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <CacheProvider value={cacheRtl}>
        <StyledEngineProvider injectFirst>
          <CustomThemeProvider>
            <ThemeProvider theme={themeObj}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arSA}>
                <CssBaseline />
                {!isLoading && getLayout(<Component {...pageProps} />)}
              </LocalizationProvider>
            </ThemeProvider>
          </CustomThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </>
  );
}
