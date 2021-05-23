import { createServer } from 'miragejs';

import * as homeworks from '../store/homework-page/mock/homeworks.json';

import * as themes from './mock-data/themes.json';
import * as attempts from './mock-data/attempts.json';
import convertHomeworkPostToHomework from './converters/homeworkPostToHomework';

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
      this.get(
        'https://80.78.240.16:7070/api/User/current',
        import('./mock-data/current-user.json')
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework',
        (schema) => schema.db.homeworksTable
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework/:id',
        (schema, request) => {
          let { id } = request.params;

          return schema.db.homeworksTable.find(id);
        }
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework/:hId/attempts',
        (schema, request) => {
          let { hId } = request.params;

          return schema.db.attemptsTable.find(hId).attempts;
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
    },
  });
};

export default runMock;
