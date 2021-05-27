import { newId } from '../server';
import * as users from '../mock-data/users.json';
export function convertAttemptPutToResponse(attemptPut) {
  let authorFromDB = users.default.filter(
    (user) => user.id === attemptPut.authorId
  )[0];

  return {
    id: attemptPut.id,
    comment: attemptPut.comment,
    author: authorFromDB,
    homeworkAttemptStatus: 'ожидает проверки',
    // comments: [
    //     {
    //         id: 0,
    //         message: string,
    //         author: {
    //             id: 0,
    //             firstName: string,
    //             lastName: string,
    //             birthDate: string,
    //             login: string,
    //             phone: string,
    //             userPic: string,
    //             email: string,
    //             contractNumber: 0,
    //             roles: [
    //                 0
    //             ]
    //         },
    //         attachments: [
    //             {
    //                 id: 0,
    //                 path: string,
    //                 attachmentType: string
    //             }
    //         ]
    //     }
    // ],
    // attachments: [
    //     {
    //         id: 0,
    //         path: string,
    //         attachmentType: string
    //     }
    // ]
  };
}
