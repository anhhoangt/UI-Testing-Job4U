/**
 * Test Data for Add Job Page
 * Contains valid and invalid mock data for testing job creation
 * Route: https://jobtrack4u.onrender.com/add-job
 */

// ==================== VALID TEST DATA ====================

export const VALID_JOB_DATA = {
  basic: {
    position: 'Software Engineer',
    company: 'Google',
    jobLocation: 'Mountain View, CA',
    status: 'pending',
    jobType: 'full-time',
  },
  withAllFields: {
    position: 'Senior Frontend Developer',
    company: 'Meta',
    jobLocation: 'Menlo Park, CA',
    status: 'interview',
    jobType: 'full-time',
  },
  remote: {
    position: 'DevOps Engineer',
    company: 'GitLab',
    jobLocation: 'Remote',
    status: 'pending',
    jobType: 'remote',
  },
  internship: {
    position: 'Software Engineering Intern',
    company: 'Amazon',
    jobLocation: 'Seattle, WA',
    status: 'pending',
    jobType: 'internship',
  },
  partTime: {
    position: 'Part-time QA Analyst',
    company: 'Startup Inc',
    jobLocation: 'San Francisco, CA',
    status: 'pending',
    jobType: 'part-time',
  },
};

// Job statuses for dropdown
export const JOB_STATUSES = {
  pending: 'pending',
  interview: 'interview',
  declined: 'declined',
};

// Job types for dropdown
export const JOB_TYPES = {
  fullTime: 'full-time',
  partTime: 'part-time',
  remote: 'remote',
  internship: 'internship',
};

// ==================== INVALID TEST DATA ====================

// Empty/Missing Field Scenarios
export const MISSING_FIELDS = {
  missingPosition: {
    position: '',
    company: 'Google',
    jobLocation: 'Mountain View, CA',
  },
  missingCompany: {
    position: 'Software Engineer',
    company: '',
    jobLocation: 'Mountain View, CA',
  },
  missingLocation: {
    position: 'Software Engineer',
    company: 'Google',
    jobLocation: '',
  },
  missingAll: {
    position: '',
    company: '',
    jobLocation: '',
  },
  missingPositionAndCompany: {
    position: '',
    company: '',
    jobLocation: 'San Francisco, CA',
  },
};

// Whitespace Only Data
export const WHITESPACE_DATA = {
  positionWhitespace: {
    position: '   ',
    company: 'Google',
    jobLocation: 'Mountain View, CA',
  },
  companyWhitespace: {
    position: 'Software Engineer',
    company: '   ',
    jobLocation: 'Mountain View, CA',
  },
  locationWhitespace: {
    position: 'Software Engineer',
    company: 'Google',
    jobLocation: '   ',
  },
  allWhitespace: {
    position: '   ',
    company: '   ',
    jobLocation: '   ',
  },
};

// Invalid Characters/Special Characters
export const SPECIAL_CHARS_DATA = {
  positionSpecialChars: {
    position: '<script>alert("xss")</script>',
    company: 'Google',
    jobLocation: 'Mountain View, CA',
  },
  companySpecialChars: {
    position: 'Software Engineer',
    company: '"; DROP TABLE jobs; --',
    jobLocation: 'Mountain View, CA',
  },
  htmlInjection: {
    position: '<b>Bold Position</b>',
    company: '<a href="malicious.com">Company</a>',
    jobLocation: '<img src=x onerror=alert(1)>',
  },
};

// ==================== BOUNDARY TEST DATA ====================

export const BOUNDARY_DATA = {
  // Minimum valid length
  minLength: {
    position: 'QA',
    company: 'AB',
    jobLocation: 'LA',
  },
  // Maximum length (typical limits)
  maxLength: {
    position: 'A'.repeat(100),
    company: 'B'.repeat(100),
    jobLocation: 'C'.repeat(100),
  },
  // Very long strings (exceeding typical limits)
  exceedsMaxLength: {
    position: 'A'.repeat(500),
    company: 'B'.repeat(500),
    jobLocation: 'C'.repeat(500),
  },
  // Single character
  singleChar: {
    position: 'A',
    company: 'B',
    jobLocation: 'C',
  },
};

// ==================== UNICODE & INTERNATIONAL DATA ====================

export const UNICODE_DATA = {
  japanese: {
    position: 'ソフトウェアエンジニア',
    company: '株式会社テスト',
    jobLocation: '東京都',
  },
  chinese: {
    position: '软件工程师',
    company: '测试公司',
    jobLocation: '北京市',
  },
  korean: {
    position: '소프트웨어 엔지니어',
    company: '테스트 회사',
    jobLocation: '서울시',
  },
  arabic: {
    position: 'مهندس برمجيات',
    company: 'شركة اختبار',
    jobLocation: 'دبي',
  },
  emoji: {
    position: '🚀 Software Engineer',
    company: '💻 Tech Corp',
    jobLocation: '🌍 Remote',
  },
  mixedLanguages: {
    position: 'Software Engineer ソフトウェア',
    company: 'Global Corp 글로벌',
    jobLocation: 'Tokyo 東京',
  },
};

// ==================== REALISTIC JOB DATA ====================

export const REALISTIC_JOBS = {
  techJobs: [
    {
      position: 'Full Stack Developer',
      company: 'Netflix',
      jobLocation: 'Los Gatos, CA',
      status: 'pending',
      jobType: 'full-time',
    },
    {
      position: 'Machine Learning Engineer',
      company: 'OpenAI',
      jobLocation: 'San Francisco, CA',
      status: 'interview',
      jobType: 'full-time',
    },
    {
      position: 'iOS Developer',
      company: 'Apple',
      jobLocation: 'Cupertino, CA',
      status: 'pending',
      jobType: 'full-time',
    },
    {
      position: 'Cloud Architect',
      company: 'Microsoft',
      jobLocation: 'Redmond, WA',
      status: 'pending',
      jobType: 'full-time',
    },
    {
      position: 'Data Scientist',
      company: 'Airbnb',
      jobLocation: 'San Francisco, CA',
      status: 'declined',
      jobType: 'full-time',
    },
  ],
  remoteJobs: [
    {
      position: 'Remote Backend Developer',
      company: 'Zapier',
      jobLocation: 'Remote - USA',
      status: 'pending',
      jobType: 'remote',
    },
    {
      position: 'Remote Product Manager',
      company: 'Automattic',
      jobLocation: 'Remote - Worldwide',
      status: 'interview',
      jobType: 'remote',
    },
  ],
  internships: [
    {
      position: 'Summer Software Intern',
      company: 'LinkedIn',
      jobLocation: 'Sunnyvale, CA',
      status: 'pending',
      jobType: 'internship',
    },
    {
      position: 'Data Engineering Intern',
      company: 'Uber',
      jobLocation: 'San Francisco, CA',
      status: 'interview',
      jobType: 'internship',
    },
  ],
};

// ==================== EDGE CASE DATA ====================

export const EDGE_CASES = {
  // Company names with special formats
  companyFormats: {
    withAmpersand: {
      position: 'Accountant',
      company: 'Johnson & Johnson',
      jobLocation: 'New Brunswick, NJ',
    },
    withApostrophe: {
      position: 'Barista',
      company: "Dunkin' Donuts",
      jobLocation: 'Boston, MA',
    },
    withNumbers: {
      position: 'Developer',
      company: '3M Company',
      jobLocation: 'St. Paul, MN',
    },
    withAcronym: {
      position: 'Engineer',
      company: 'IBM',
      jobLocation: 'Armonk, NY',
    },
    withDot: {
      position: 'Developer',
      company: 'Yahoo!',
      jobLocation: 'Sunnyvale, CA',
    },
  },
  // Location formats
  locationFormats: {
    cityStateZip: {
      position: 'Developer',
      company: 'Test Corp',
      jobLocation: 'Austin, TX 78701',
    },
    international: {
      position: 'Developer',
      company: 'Test Corp',
      jobLocation: 'London, United Kingdom',
    },
    multipleLocations: {
      position: 'Developer',
      company: 'Test Corp',
      jobLocation: 'NYC / SF / Remote',
    },
    fullyRemote: {
      position: 'Developer',
      company: 'Test Corp',
      jobLocation: 'Fully Remote',
    },
    hybrid: {
      position: 'Developer',
      company: 'Test Corp',
      jobLocation: 'Hybrid - Austin, TX',
    },
  },
  // Position title formats
  positionFormats: {
    withLevel: {
      position: 'Senior Software Engineer II',
      company: 'Test Corp',
      jobLocation: 'San Francisco, CA',
    },
    withTeam: {
      position: 'Software Engineer - Platform Team',
      company: 'Test Corp',
      jobLocation: 'San Francisco, CA',
    },
    withSlash: {
      position: 'Full Stack / DevOps Engineer',
      company: 'Test Corp',
      jobLocation: 'San Francisco, CA',
    },
    withParentheses: {
      position: 'Software Engineer (Remote)',
      company: 'Test Corp',
      jobLocation: 'San Francisco, CA',
    },
  },
};

// ==================== ERROR MESSAGES ====================

export const ERROR_MESSAGES = {
  requiredField: 'Please provide all values',
  positionRequired: 'Position is required',
  companyRequired: 'Company is required',
  locationRequired: 'Job location is required',
  invalidStatus: 'Invalid status value',
  invalidJobType: 'Invalid job type',
};

// ==================== FORM FIELD NAMES ====================

export const FORM_FIELDS = {
  position: 'position',
  company: 'company',
  jobLocation: 'jobLocation',
  status: 'status',
  jobType: 'jobType',
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Generate a unique job entry with timestamp
 */
export const generateUniqueJob = (baseData = VALID_JOB_DATA.basic) => {
  const timestamp = Date.now();
  return {
    ...baseData,
    position: `${baseData.position} - ${timestamp}`,
  };
};

/**
 * Generate multiple unique jobs
 */
export const generateMultipleJobs = (count: number, baseData = VALID_JOB_DATA.basic) => {
  return Array.from({ length: count }, (_, index) => ({
    ...baseData,
    position: `${baseData.position} #${index + 1}`,
    company: `${baseData.company} - Branch ${index + 1}`,
  }));
};

/**
 * Generate job with random status
 */
export const generateJobWithRandomStatus = (baseData = VALID_JOB_DATA.basic) => {
  const statuses = Object.values(JOB_STATUSES);
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  return {
    ...baseData,
    status: randomStatus,
  };
};

/**
 * Generate job with random job type
 */
export const generateJobWithRandomType = (baseData = VALID_JOB_DATA.basic) => {
  const types = Object.values(JOB_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  return {
    ...baseData,
    jobType: randomType,
  };
};
