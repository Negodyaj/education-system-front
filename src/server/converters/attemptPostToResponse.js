import { newId } from '../server';
import * as users from '../mock-data/users.json';
export function convertAttemptPostToResponse(attemptPost) {
  let authorFromDB = users.default.filter(
    (user) => user.id === attemptPost.authorId
  )[0];
  console.log(users.default, attemptPost.authorId);

  return {
    id: newId.next().value || -1,
    comment: attemptPost.comment,
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
