import { createServer } from 'miragejs';

import * as homeworks from '../store/homework-page/mock/homeworks.json';

import * as themes from './mock-data/themes.json';
import * as attempts from './mock-data/attempts.json';
import convertHomeworkPostToHomework from './converters/homeworkPostToHomework';
import { convertAttemptPostToResponse } from './converters/attemptPostToResponse';
import { convertAttemptPutToResponse } from './converters/attemptPutToResponse';

function* idGenerator() {
  let n = 10000;
  while (true) yield (n += 1);
}

export const newId = idGenerator();

const runMock = () => {
  createServer({
    seeds(server) {
      server.db.loadData({
        homeworksTable: homeworks.default.map((hw) => hw),
        themesTable: themes.default.map((theme) => theme),
        attemptsTable: Object.keys(attempts.default).map((homeworkId) => ({
          id: homeworkId,
          attempts: attempts.default[Number.parseInt(homeworkId, 10)],
        })),
      });
    },
    routes() {
      this.passthrough('https://80.78.240.16:7070/api/authentication');
      this.passthrough('https://80.78.240.16:7070/api/Group');
      this.passthrough('https://80.78.240.16:7070/api/User');
      this.passthrough('https://80.78.240.16:7070/api/User/:id');
      // this.passthrough('https://80.78.240.16:7070/api/User/current');
      this.passthrough('https://80.78.240.16:7070/api/User/:id/payment');
      this.passthrough('https://80.78.240.16:7070/api/Course');
      this.passthrough('https://80.78.240.16:7070/api/Tag');
      this.passthrough('https://80.78.240.16:7070/api/Tag/:id');
      this.get(
        'https://80.78.240.16:7070/api/User/current',
        import('./mock-data/current-user.json')
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework',
        (schema) => schema.db.homeworksTable
      );
      this.get(
        'https://80.78.240.16:7070/api/Course/theme',
        (schema) => schema.db.themesTable
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework/:id',
        (schema, request) => {
          let { id } = request.params;

          return schema.db.homeworksTable.find(id);
        }
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework/:hId/attempt',
        (schema, request) => {
          let { hId } = request.params;
          let response = schema.db.attemptsTable.find(hId).attempts;

          return response;
        }
      );
      this.post('https://80.78.240.16:7070/api/Homework', (schema, request) => {
        let newRecord = convertHomeworkPostToHomework(
          JSON.parse(request.requestBody)
        );

        schema.db.homeworksTable.insert(newRecord);

        if (JSON.parse(request.requestBody).groupId)
          schema.db.attemptsTable.insert({
            id: newRecord.id,
            attempts: [],
          });

        return schema.db.homeworksTable[schema.db.homeworksTable.length - 1];
      });
      this.post(
        'https://80.78.240.16:7070/api/Homework/:id/attempt',
        (schema, request) => {
          let newRecord = convertAttemptPostToResponse(
            JSON.parse(request.requestBody)
          );
          let { id } = request.params;
          schema.db.attemptsTable.find(id).attempts.push(newRecord);
          schema.db.homeworksTable.find(id).homeworkAttempts.push(newRecord);

          return newRecord;
        }
      );
      this.put(
        'https://80.78.240.16:7070/api/Homework/:hid/attempt/:aid',
        (schema, request) => {
          let newRecord = convertAttemptPutToResponse(
            JSON.parse(request.requestBody)
          );
          let { hid, aid } = request.params;
          schema.db.attemptsTable
            .find(hid)
            .attempts.find(aid)
            .replace(newRecord);

          return newRecord;
        }
      );
    },
  });
};

export default runMock;
