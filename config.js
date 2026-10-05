const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.ENV = {
  API_BASE_URL: IS_LOCAL 
    ? 'http://localhost:3001/api' 
    : 'https://dsa-be-i1c6.onrender.com/api',
  GOOGLE_CLIENT_ID: '388160599090-slda0efpv5oo0ejq6vl4foa6hiu03pst.apps.googleusercontent.com'
};

