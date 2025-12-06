// src/utils/constants.js

export const GRADE_SCALE = [
  { grade: 'AA', point: 10, min: 90 },
  { grade: 'AB', point: 9, min: 80 },
  { grade: 'BB', point: 8, min: 70 },
  { grade: 'BC', point: 7, min: 60 },
  { grade: 'CC', point: 6, min: 50 },
  { grade: 'CD', point: 5, min: 45 },
  { grade: 'DD', point: 4, min: 40 },
  { grade: 'FF', point: 0, min: 0 },
];

export const SEMESTER_DATA = {
  'First Year': {
    'Semester 1 (Physics Group)': [
      { name: 'Eng. Physics', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Eng. Physics Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Eng. Mathematics-I', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Eng. Mathematics-I Tut', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Elements of Mech & Elec', credits: 4, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Elements of Mech & Elec Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Eng. Mechanics', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Eng. Mechanics Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Comp. Programming', credits: 2, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Comp. Programming Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Yoga & Meditation', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Design Thinking', credits: 0, intMax: 0, extMax: 0, isTheory: false, isAudit: true },
    ],
    'Semester 2 (Chemistry Group)': [
      { name: 'Eng. Chemistry', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Eng. Chemistry Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Eng. Mathematics-II', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Eng. Mathematics-II Tut', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Civil & Elec Eng', credits: 4, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Civil & Elec Eng Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Eng. Graphics', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Eng. Graphics Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Elec-Electronic Comp', credits: 2, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Elec-Electronic Comp Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Human Rights', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Prof. Communication', credits: 0, intMax: 0, extMax: 0, isTheory: false, isAudit: true },
    ]
  },
  'Second Year': {
    'Semester 3': [
      { name: 'Applied Math-I', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Discrete Math Struct', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Digital Sys & Micro', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Digital Sys & Micro Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Data Structures', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Data Structures Lab', credits: 2, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Data Comm & Net', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Data Comm & Net Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Soft Skills Dev', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Environmental Studies', credits: 0, intMax: 0, extMax: 0, isTheory: false, isAudit: true },
    ],
    'Semester 4': [
      { name: 'Applied Math-II', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Theory of Comp', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Adv. Microprocessor', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Adv. Microprocessor Lab', credits: 1, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Comp Organization', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Software Eng', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Linux/Shell Lab', credits: 2, intMax: 50, extMax: 0, isTheory: false },
      { name: 'OOP Lab', credits: 2, intMax: 50, extMax: 50, isTheory: false },
      { name: 'MDM Course I', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Intro Performing Arts', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Environmental Studies', credits: 0, intMax: 0, extMax: 0, isTheory: false, isAudit: true },
    ]
  },
  'Third Year': {
    'Semester 5': [
      { name: 'System Programming', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Design & Analysis Algo', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Operating System', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Database Eng', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Database Eng Lab', credits: 1, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Machine Learning', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Java Prog Lab', credits: 2, intMax: 50, extMax: 50, isTheory: false },
      { name: 'FOSS Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Intro Foreign Lang', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'MDM Course II', credits: 3, intMax: 30, extMax: 70, isTheory: true },
    ],
    'Semester 6': [
      { name: 'Compiler Construction', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Comp Graphics & MM', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Comp Graphics & MM Lab', credits: 1, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Dist & Cloud Comp', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Elective-I', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Open Elective-I', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'MDM Course III', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Adv Programming Lab', credits: 3, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Mini Project-III', credits: 1, intMax: 50, extMax: 0, isTheory: false },
    ]
  },
  'Final Year': {
    'Semester 7': [
      { name: 'HPC', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Soft Computing', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Soft Computing Lab', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'Adv DBMS', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Elective II', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Open Elective II', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Web Tech Lab', credits: 2, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Major Project-I', credits: 2, intMax: 50, extMax: 50, isTheory: false },
      { name: 'Green Tech', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'MDM Industry Internship', credits: 3, intMax: 50, extMax: 50, isTheory: false },
    ],
    'Semester 8': [
      { name: 'Industrial Internship', credits: 10, intMax: 100, extMax: 100, isTheory: false },
      { name: 'Elective III (MOOC)', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Elective IV (MOOC)', credits: 3, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Prog Specific IKS', credits: 2, intMax: 30, extMax: 70, isTheory: true },
      { name: 'Major Project-II', credits: 1, intMax: 100, extMax: 100, isTheory: false },
      { name: 'Prof Ethics', credits: 1, intMax: 50, extMax: 0, isTheory: false },
      { name: 'MDM Mini Project', credits: 2, intMax: 50, extMax: 50, isTheory: false },
    ]
  }
};

/**
 * Calculates grade based on marks and R.B.T rules.
 * @param {number} intObt - Internal Marks Obtained
 * @param {number} intMax - Internal Max Marks
 * @param {number} extObt - External Marks Obtained
 * @param {number} extMax - External Max Marks
 * @param {boolean} isTheory - True if theory course, false if lab
 */
export const calculateGradeFromMarks = (intObt, intMax, extObt, extMax, isTheory) => {
  const totalMax = intMax + extMax;
  if (totalMax === 0) return '';

  // Rule 1: Check External Passing (Strict 40%) - REMOVED
  // This rule was causing issues where students with passing aggregate (40+)
  // but low external marks were getting 'FF'.
  /*
  if (extMax > 0) {
    if (extObt < 0.4 * extMax) return 'FF';
  }
  */

  // Rule 2: Check Internal Passing (LABS ONLY - Strict 40%)
  // Theory internals do NOT have a passing floor (Marksheet evidence: 11/30 PASS).
  if (!isTheory && intMax > 0) {
    if (intObt < 0.4 * intMax) return 'FF';
  }

  // Rule 3: Check Total Passing (40% aggregate)
  const totalObtained = intObt + extObt;
  const percentage = (totalObtained / totalMax) * 100;

  // Uses MIN threshold to find grade (e.g. 89.5 >= 80 -> AB)
  const gradeObj = GRADE_SCALE.find(g => percentage >= g.min);
  return gradeObj ? gradeObj.grade : 'FF';
};

export const getGradePoint = (grade) => {
  if (!grade) return 0;
  const g = GRADE_SCALE.find(i => i.grade === grade);
  return g ? g.point : 0;
};

export const getPenalizedGrade = (grade, penalty = 0) => {
    if (!grade || grade === 'FF' || penalty === 0) return grade;
    const index = GRADE_SCALE.findIndex(g => g.grade === grade);
    if (index === -1) return grade;
    const newIndex = Math.min(index + penalty, 6); // Cap at DD
    return GRADE_SCALE[newIndex].grade;
};