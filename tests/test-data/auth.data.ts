/**
 * Test Data for Auth Page (Login/Register)
 * Contains valid and invalid mock data for testing
 */

// ==================== VALID TEST DATA ====================

export const VALID_LOGIN_DATA = {
  email: 'zzz@gmail.com',
  password: 'zzzzzz',
};

export const VALID_REGISTER_DATA = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'securePassword123',
};

// Generate unique email for registration tests using random string
export const generateUniqueEmail = (): string => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString(36);
  return `testuser_${randomString}${timestamp}@test.com`;
};

// Alternative: Generate unique email with custom prefix
export const generateUniqueEmailWithPrefix = (prefix: string): string => {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${randomString}@test.com`;
};

// ==================== INVALID TEST DATA ====================

// Invalid Email Formats
export const INVALID_EMAILS = {
  missingAtSymbol: 'testexample.com',
  missingDomain: 'test@',
  missingUsername: '@example.com',
  invalidDomain: 'test@example',
  doubleDot: 'test@example..com',
  spacesInEmail: 'test @example.com',
  specialChars: 'test!#$%@example.com',
  missingTLD: 'test@example.',
  multiplAtSymbols: 'test@@example.com',
};

// Invalid Passwords
export const INVALID_PASSWORDS = {
  empty: '',
  tooShort: '123',
  spacesOnly: '      ',
};

// Invalid Names
export const INVALID_NAMES = {
  empty: '',
  spacesOnly: '      ',
  tooShort: 'A',
};

// Missing Field Scenarios
export const MISSING_FIELDS = {
  login: {
    missingEmail: { email: '', password: 'password123' },
    missingPassword: { email: 'test@example.com', password: '' },
    missingBoth: { email: '', password: '' },
  },
  register: {
    missingName: { name: '', email: 'test@example.com', password: 'password123' },
    missingEmail: { name: 'John Doe', email: '', password: 'password123' },
    missingPassword: { name: 'John Doe', email: 'test@example.com', password: '' },
    missingAll: { name: '', email: '', password: '' },
    missingNameAndEmail: { name: '', email: '', password: 'password123' },
    missingNameAndPassword: { name: '', email: 'test@example.com', password: '' },
    missingEmailAndPassword: { name: 'John Doe', email: '', password: '' },
  },
};

// Wrong Credentials (for login failure tests)
export const WRONG_CREDENTIALS = {
  wrongEmail: { email: 'wronguser@example.com', password: 'password123' },
  wrongPassword: { email: 'testuser@example.com', password: 'wrongpassword' },
  bothWrong: { email: 'wrong@wrong.com', password: 'wrongpassword' },
};

// Boundary Test Data
export const BOUNDARY_DATA = {
  veryLongEmail: `${'a'.repeat(100)}@example.com`,
  veryLongPassword: 'a'.repeat(200),
  veryLongName: 'A'.repeat(200),
  minLengthName: 'AB',
  minLengthPassword: '123456',
};

// SQL Injection Attempts (for security testing)
export const SQL_INJECTION_DATA = {
  email: "' OR '1'='1",
  password: "'; DROP TABLE users; --",
  name: "<script>alert('xss')</script>",
};

// ==================== ERROR MESSAGES ====================

export const ERROR_MESSAGES = {
  missingFields: 'Please provide all values!',
  invalidEmail: 'please provide a valid email',
  invalidCredentials: 'Invalid Credentials',
  userAlreadyExists: 'Email already in use',
  passwordTooShort: 'Password is too short',
};
