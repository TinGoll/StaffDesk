export interface Employee {
  id: number;
  name: string;
  department: string;
  sectorId: number;
  status: number;
  location?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  bankCard?: string;
  cardHolder?: string;
  phone?: string;
  permissionGroupId?: number;
  mgtPass?: string;
}
