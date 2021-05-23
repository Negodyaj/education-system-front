import { createServer } from 'miragejs';

import {
  store,
  getFromStorage,
  removeFromStorage,
} from '../services/local-storage.service';
import * as homeworks from '../store/homework-page/mock/homeworks.json';

import * as themes from './mock-data/themes.json';
import convertHomeworkPostToHomework from './converters/homeworkPostToHomework';

function* idGenerator() {
  let n = 10020;
  while (true) yield (n += 1);
}

export const newId = idGenerator();

// removeFromStorage('homeworksTable');

const runMock = () => {
  createServer({
    seeds(server) {
      server.db.loadData({
        homeworksTable: homeworks.default.map((hw) => hw),
        themesTable: themes.default.map((theme) => theme),
      });
    },
    routes() {
      this.passthrough('https://80.78.240.16:7070/api/authentication');
      this.passthrough('https://80.78.240.16:7070/api/User/current');
      this.passthrough('https://80.78.240.16:7070/api/Group');
      this.get(
        'https://80.78.240.16:7070/api/Homework',
        (schema) => schema.db.homeworksTable
      );
      this.get(
        'https://80.78.240.16:7070/api/Homework/:id',
        (schema, request) => {
          let { id } = request.params;
          console.log(id);

          return schema.db.homeworksTable.find(id);
        }
      );
      this.post('https://80.78.240.16:7070/api/Homework', (schema, request) => {
        let newRecord = JSON.parse(request.requestBody);
        schema.db.homeworksTable.insert(
          convertHomeworkPostToHomework(newRecord)
        );

        return schema.db.homeworksTable[schema.db.homeworksTable.length - 1];
      });
    },
  });
};

export default runMock;
