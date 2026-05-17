const axios = require('axios');

const backendUrl = 'http://localhost:3002';

async function testBackend() {
  try {
    const uniqueId = Date.now();
    const testUsername = `user${uniqueId}`;
    const testEmail = `user${uniqueId}@example.com`;
    
    console.log('Testing backend at:', backendUrl);
    
    // Test register
    console.log('\n--- Testing Register ---');
    const registerRes = await axios.post(`${backendUrl}/register`, {
      username: testUsername,
      email: testEmail,
      password: 'TestPass123!'
    });
    console.log('Register success:', registerRes.data);
    
    // Test login
    console.log('\n--- Testing Login ---');
    const loginRes = await axios.post(`${backendUrl}/login`, {
      username: testUsername,
      password: 'TestPass123!'
    });
    console.log('Login success:', loginRes.data);
    
    // Test login history
    console.log('\n--- Testing Login History ---');
    const historyRes = await axios.get(`${backendUrl}/loginHistory`, {
      headers: { Authorization: `Bearer ${loginRes.data.token}` }
    });
    console.log('Login History:', JSON.stringify(historyRes.data, null, 2));
    
    console.log('\n✅ Backend is working correctly!');
  } catch (err) {
    console.error('❌ Backend Error:', err.response?.data || err.message);
    process.exit(1);
  }
}

testBackend();
