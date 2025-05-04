import io from 'socket.io-client';

let socket;
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export class ApiError extends Error {
  constructor(message, status, errors = [], retryable = true) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = 'ApiError';
    this.retryable = retryable;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const initializeSocket = async () => {
  try {
    await fetch('/api/socketio');
    socket = io({
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socket.on('connect', () => {
      console.log('تم الاتصال بالخادم');
      retryCount = 0; // Reset retry count on successful connection
    });

    socket.on('connect_error', (error) => {
      console.error('خطأ في الاتصال:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('تم قطع الاتصال:', reason);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log('تم إعادة الاتصال بنجاح بعد', attemptNumber, 'محاولات');
    });

    return true;
  } catch (error) {
    console.error('خطأ في تهيئة الاتصال:', error);
    return false;
  }
};

const handleApiResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;

  try {
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new ApiError('استجابة غير صالحة من الخادم', response.status);
    }
  } catch (error) {
    throw new ApiError('خطأ في معالجة الاستجابة', response.status);
  }
  
  if (!response.ok) {
    const retryable = response.status >= 500 || response.status === 429;
    throw new ApiError(
      data.message || 'حدث خطأ في الطلب',
      response.status,
      data.errors,
      retryable
    );
  }
  
  return data;
};

const retryRequest = async (fn, retries = MAX_RETRIES) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ApiError && error.retryable && retries > 0) {
      await delay(RETRY_DELAY);
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

export const submitRequest = async (formData, serviceType) => {
  const makeRequest = async () => {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        type: serviceType,
        date: new Date().toISOString()
      }),
    });

    const data = await handleApiResponse(response);

    if (socket?.connected) {
      socket.emit('new-request', {
        type: serviceType,
        clientName: formData.fullName || formData.name,
        date: new Date().toISOString(),
        requestId: data.requestId,
        status: 'pending',
        ...formData
      });
    }

    return data;
  };

  try {
    return await retryRequest(makeRequest);
  } catch (error) {
    if (error instanceof ApiError) {
      // Add Arabic error messages based on status codes
      switch (error.status) {
        case 400:
          error.message = 'البيانات المدخلة غير صحيحة';
          break;
        case 401:
          error.message = 'يرجى تسجيل الدخول للمتابعة';
          break;
        case 429:
          error.message = 'عدد كبير من الطلبات، يرجى المحاولة لاحقاً';
          break;
      }
      throw error;
    }
    throw new ApiError(
      'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى',
      500
    );
  }
};

export const getRequestStatus = async (requestId) => {
  const makeRequest = async () => {
    const response = await fetch(`/api/request-status/${requestId}`);
    return handleApiResponse(response);
  };

  try {
    return await retryRequest(makeRequest);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('حدث خطأ في جلب حالة الطلب', 500);
  }
};

export const uploadDocument = async (file, requestId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('requestId', requestId);

    const response = await fetch('/api/upload-document', {
      method: 'POST',
      body: formData,
    });

    return handleApiResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('حدث خطأ في رفع الملف', 500);
  }
};
