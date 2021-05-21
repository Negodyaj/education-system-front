export interface Attendance {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    userPic: string;
  };
  isAbsent: boolean;
  reasonOfAbsence: string;
}
