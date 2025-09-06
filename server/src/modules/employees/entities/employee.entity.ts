export class Employee {
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

/**
 * 
 * CREATE TABLE EMPLOYERS (
    MGMT_PASS            VARCHAR(20),
    ID                   INTEGER NOT NULL,
    NAME                 VARCHAR(100),
    ID_SECTOR            INTEGER,
    DEPARTMENT           VARCHAR(50),
    STATUS               INTEGER,
    LOCATION             VARCHAR(50),
    FIRSTNAME            VARCHAR(32),
    LASTNAME             VARCHAR(32),
    MIDDLENAME           VARCHAR(32),
    BANK_CARD            VARCHAR(24),
    CARD_HOLDER          VARCHAR(64),
    PHONE                VARCHAR(24),
    PERMISSION_GROUP_ID  INTEGER
);
 */
