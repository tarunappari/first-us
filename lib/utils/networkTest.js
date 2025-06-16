// lib/utils/networkTest.js
// Network testing utilities

export const testBackendConnectivity = async () => {
  const backendUrl = 'https://news-app-backend-lo3a.onrender.com';
  
  console.log('🔍 Testing backend connectivity...');
  console.log('Backend URL:', backendUrl);
  
  try {
    // Test 1: Basic fetch to root endpoint
    console.log('📡 Test 1: Basic connectivity test...');
    const response = await fetch(backendUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('✅ Basic connectivity successful');
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    return {
      success: true,
      status: response.status,
      message: 'Backend is accessible',
    };
  } catch (error) {
    console.error('❌ Basic connectivity failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Backend is not accessible',
    };
  }
};

export const testCORS = async () => {
  const backendUrl = 'https://news-app-backend-lo3a.onrender.com';
  
  console.log('🔍 Testing CORS configuration...');
  
  try {
    // Test CORS preflight
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'OPTIONS',
      headers: {
        'Origin': window.location.origin,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    
    console.log('✅ CORS preflight successful');
    console.log('Status:', response.status);
    console.log('CORS Headers:', {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
    });
    
    return {
      success: true,
      status: response.status,
      message: 'CORS is properly configured',
    };
  } catch (error) {
    console.error('❌ CORS test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'CORS configuration issue',
    };
  }
};

export const testLoginEndpoint = async () => {
  const backendUrl = 'https://news-app-backend-lo3a.onrender.com';
  
  console.log('🔍 Testing login endpoint...');
  
  try {
    // Test login endpoint with invalid credentials (should return 401, not network error)
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'invalid',
      }),
    });
    
    console.log('✅ Login endpoint is accessible');
    console.log('Status:', response.status);
    
    const data = await response.json().catch(() => ({}));
    console.log('Response data:', data);
    
    return {
      success: true,
      status: response.status,
      message: 'Login endpoint is accessible',
      data,
    };
  } catch (error) {
    console.error('❌ Login endpoint test failed:', error);
    return {
      success: false,
      error: error.message,
      message: 'Login endpoint is not accessible',
    };
  }
};

export const runFullDiagnostic = async () => {
  console.group('🚀 Running Full Network Diagnostic');
  
  const results = {
    connectivity: await testBackendConnectivity(),
    cors: await testCORS(),
    loginEndpoint: await testLoginEndpoint(),
  };
  
  console.log('📊 Diagnostic Results:', results);
  console.groupEnd();
  
  return results;
};
