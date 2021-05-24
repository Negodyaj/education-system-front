export interface SendAttemptResponse {
  id: number;
  comment?: string;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    userPic: string;
  };
  homeworkAttemptStatus: string;
  comments?: [
    {
      id: number;
      message: string;
      author: {
        id: number;
        firstName: string;
        lastName: string;
        birthDate: string;
        login: string;
        phone: string;
        userPic: string;
        email: string;
        contractNumber: number;
        roles: [number];
      };
      attachments?: [
        {
          id: number;
          path: string;
          attachmentType: string;
        }
      ];
    }
  ];
  attachments?: [
    {
      id: number;
      path: string;
      attachmentType: string;
    }
  ];
}
