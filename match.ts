type User = {
  englishName: string;
  chineseName: string;
  age?: number;
  comments?: string[];
  hobby?: string;
};

const users: User[] = [
  { englishName: 'David Smith', chineseName: '大卫 斯密斯' },
  { englishName: 'Yueling Zhang', chineseName: '月林张' },
  { englishName: 'Huawen Wu', chineseName: '华文吴' },
  { englishName: 'Annie Lee', chineseName: '李安妮' },
];

// Create firstname and surname mappings
const firstnameMapping: { [key: string]: string } = {
  David: '大卫',
  Yueling: '月林',
  Huawen: '华文',
  Annie: '安妮',
};

const surnameMapping: { [key: string]: string } = {
  Smith: '斯密斯',
  Zhang: '张',
  Wu: '吴',
  Lee: '李',
};

const isValidInput = (input: string): boolean => {
  if (!input || input.trim() === '' || /[^a-zA-Z\u4e00-\u9fa5\s]/.test(input)) {
    return false;
  }
  return true;
};

const matchUser = (input: string): User | string => {
  if (!isValidInput(input)) {
    return 'Invalid input';
  }

  const formattedInput = input.toLowerCase().replace(/\s+/g, '');

  for (const user of users) {
    const [partOne, partTwo] = user.englishName.split(' ');

    // Create possible matches without spaces
    const englishMatches = [
      `${partOne}${partTwo}`.toLowerCase(),
      `${partTwo}${partOne}`.toLowerCase(),
    ];

    const chineseMatches = [
      `${firstnameMapping[partOne]}${surnameMapping[partTwo]}`,
      `${surnameMapping[partTwo]}${firstnameMapping[partOne]}`,
    ];

    if (
      englishMatches.includes(formattedInput) ||
      chineseMatches.includes(formattedInput)
    ) {
      return user;
    }
  }

  return 'No match found';
};

// Test cases
const inputs: string[] = [
  '吴华文', // Should match Huawen Wu
  'Wu Huawen', // Should match Huawen Wu
  '华文吴', // Should match Huawen Wu
  'David Smith', // Should match David Smith
  'Smith David', // Should match David Smith
  'SmithDavid', // Should match David Smith
  '斯密斯大卫', // Should match David Smith
  '大卫斯密斯', // Should match David Smith
  '大卫 斯密斯', // Should match David Smith
  '斯密斯 大卫', // Should match David Smith
  '安妮李', // Should match Annie Lee
  '李安妮', // Should match Annie Lee
  'Huawen Wu', // Should match Huawen Wu
  'DAVID SMITH', // Should match David Smith
  'sMItH dAVid', // Should match David Smith
  'iuadshfcugsda', // Should return No match found
  '', // Should output Invalid input
  ' ', // Should output Invalid input
  '$%^&*(', // Should output Invalid input
  '妮李安', // Should return No match found
];

inputs.forEach((input) => {
  const result = matchUser(input);
  console.log(
    `Input: '${input}', Result: ${
      typeof result === 'string'
        ? result
        : `${result.englishName}, ${result.chineseName}`
    }`
  );
});
