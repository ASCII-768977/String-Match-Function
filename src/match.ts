type User = {
  englishName: string;
  chineseName: string;
  age?: number;
  specialComments?: string[];
};

const users: User[] = [
  { englishName: 'David Smith', chineseName: '大卫 斯密斯' },
  { englishName: 'Yueling Zhang', chineseName: '月林张' },
  { englishName: 'Huawen Wu', chineseName: '华文吴' },
  { englishName: 'Annie Lee', chineseName: '李安妮' },
];

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

export const matchUser = (input: string): User | string => {
  if (!isValidInput(input)) {
    return 'Invalid input';
  }

  const formattedInput = input.toLowerCase().replace(/\s+/g, '');

  for (const user of users) {
    const [partOne, partTwo] = user.englishName.split(' ');

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
