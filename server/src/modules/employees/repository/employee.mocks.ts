import { Employee } from '../entities/employee.entity';

const departments = ['IT', 'HR', 'Finance', 'Logistics', 'Sales', 'Marketing'];
const locations = [
  'Moscow',
  'Amsterdam',
  'Berlin',
  'New York',
  'Tokyo',
  'Paris',
];
const statuses = [1, -1]; // допустим, -1 = inactive, 1 = active
const firstNames = [
  'Ivan',
  'Petr',
  'Sergey',
  'Anna',
  'Olga',
  'Maria',
  'John',
  'Emily',
  'Sophia',
  'Liam',
];
const lastNames = [
  'Ivanov',
  'Petrov',
  'Sidorov',
  'Smirnova',
  'Volkova',
  'Kuznetsova',
  'Smith',
  'Johnson',
  'Brown',
  'Williams',
];
const middleNames = [
  'Ivanovich',
  'Petrovich',
  'Sergeevich',
  'Nikolaevich',
  'Olegovich',
  'Dmitrievna',
  'Alexeevna',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone(): string {
  return `+7${Math.floor(9000000000 + Math.random() * 999999999).toString()}`;
}

function randomCard(): string {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(1000 + Math.random() * 9000))
    .join(' ');
}

export const mockEmployees: Employee[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const middleName = randomItem(middleNames);
  const fullName = `${lastName} ${firstName} ${middleName}`;

  return {
    id: i + 1,
    name: fullName,
    department: randomItem(departments),
    sectorId: Math.floor(Math.random() * 10) + 1,
    status: randomItem(statuses),
    location: randomItem(locations),
    firstName,
    lastName,
    middleName,
    bankCard: randomCard(),
    cardHolder: `${firstName} ${lastName}`,
    phone: randomPhone(),
    permissionGroupId: Math.floor(Math.random() * 5) + 1,
    mgtPass: `PASS-${Math.floor(100000 + Math.random() * 900000)}`,
  };
});
