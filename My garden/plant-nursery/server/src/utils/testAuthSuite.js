const API_BASE = 'http://localhost:5001/api';

async function runCleanTestSuite() {
  console.log('====================================================');
  console.log('KINATTUKARA AUTHENTICATION SYSTEM CLEAN TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Initial Seed Admin Login Test
  console.log('--- 1. Testing Seeded Admin Login ---');
  let adminCookie = '';
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@kinattukara.com',
        password: 'Kinattukara2026!#'
      })
    });
    const data = await res.json();
    console.log('Login Response:', res.status, data);

    assert(res.status === 200, 'Admin login succeeded with status 200');
    assert(data.success === true, 'Response status is success: true');
    assert(data.data.user.role === 'ADMIN', 'User role is ADMIN');
    assert(data.data.user.emailVerified === true, 'Admin account has emailVerified = true');
    assert(data.data.user.password === undefined, 'Password hash is NEVER returned to client');
    assert(data.data.user.lastLoginAt !== undefined, 'lastLoginAt was updated on login');

    // Extract cookie
    const setCookie = res.headers.get('set-cookie');
    assert(
      setCookie && setCookie.includes('admin_token') && setCookie.includes('HttpOnly'),
      'HttpOnly admin_token cookie was set securely'
    );
    if (setCookie) {
      adminCookie = setCookie.split(';')[0];
    }
  } catch (err) {
    assert(false, `Admin login failed: ${err.message}`);
  }

  // 2. Protected Admin API Access Test (With & Without Session)
  console.log('\n--- 2. Testing Protected Admin API Authorization ---');
  try {
    // Unauthenticated request
    const unauthRes = await fetch(`${API_BASE}/nurseries/my/profile`);
    const unauthData = await unauthRes.json();
    assert(unauthRes.status === 401, 'Unauthenticated request correctly returned 401 Unauthorized');
    assert(unauthData.code === 'AUTH_REQUIRED', 'Response returned AUTH_REQUIRED code');

    // Authenticated request using cookie
    if (adminCookie) {
      const authRes = await fetch(`${API_BASE}/nurseries/my/profile`, {
        headers: { Cookie: adminCookie }
      });
      const authData = await authRes.json();
      assert(authRes.status === 200, 'Authenticated admin profile request succeeded with 200');
      assert(authData.data && (authData.data._id || authData.data.name), 'Admin nursery profile data retrieved');
    }
  } catch (err) {
    assert(false, `Protected API test failed: ${err.message}`);
  }

  // 3. Verify Active Session /auth/me
  console.log('\n--- 3. Testing /api/auth/me Session Verification ---');
  try {
    const meRes = await fetch(`${API_BASE}/auth/me`, {
      headers: { Cookie: adminCookie }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, '/api/auth/me returned 200 for valid session');
    assert(meData.data.email === 'admin@kinattukara.com', 'Verified active user email matches');
    assert(meData.data.role === 'ADMIN', 'Verified active user role is ADMIN');
  } catch (err) {
    assert(false, `/auth/me failed: ${err.message}`);
  }

  // 4. Forgot Password Flow & Reset Token Security
  console.log('\n--- 4. Testing Forgot Password Flow & Enumeration Defense ---');
  try {
    // Non-existent email should give generic response (no account enumeration)
    const enumRes = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'unknown@example.com' })
    });
    const enumData = await enumRes.json();
    assert(
      enumData.message && enumData.message.includes('If an account exists'),
      'Forgot password returns generic message preventing email enumeration'
    );

    // Existing admin email
    const resetRes = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@kinattukara.com' })
    });
    const resetData = await resetRes.json();
    assert(
      resetData.message && resetData.message.includes('If an account exists'),
      'Admin forgot password request succeeds with identical generic message'
    );
  } catch (err) {
    assert(false, `Forgot password test failed: ${err.message}`);
  }

  // 5. Strong Password Policy on Reset Password
  console.log('\n--- 5. Testing Password Policy ---');
  try {
    const weakRes = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'test-token', password: 'weak' })
    });
    const weakData = await weakRes.json();
    assert(weakRes.status === 400, 'Weak password rejected with 400 Bad Request');
    assert(
      weakData.message && weakData.message.includes('Password must be at least 12 characters'),
      `Correct validation error returned: ${weakData.message}`
    );
  } catch (err) {
    assert(false, `Password policy test failed: ${err.message}`);
  }

  // 6. Logout Test
  console.log('\n--- 6. Testing Secure Logout ---');
  try {
    const logoutRes = await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
    assert(logoutRes.status === 200, 'Logout returned status 200');
    const setCookies = logoutRes.headers.get('set-cookie');
    assert(
      setCookies && (setCookies.includes('admin_token=;') || setCookies.includes('Expires=Thu, 01 Jan 1970')),
      'Logout cleared the HttpOnly admin_token cookie'
    );
  } catch (err) {
    assert(false, `Logout failed: ${err.message}`);
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');
}

runCleanTestSuite();
