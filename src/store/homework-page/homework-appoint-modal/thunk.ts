import { Dispatch } from 'redux';

import { AllGroupsInCollege } from '../../../interfaces/AllGroupsInCollege';
import { sendGetRequest } from '../../../services/http.service';
import { isAllGroupsInCollegeArr } from '../../../services/type-guards/allGroupsIncollegeArr';
import { groupList } from '../../../shared/tmp-mock-data/hw/groupList';
import { thunkResponseHandler } from '../../thunkResponseHadlers';

import { groupListByTeacherIdLoaded } from './action-creators';

export const getGroupsByTeacherId = (teacherId: number) => (
  dispatch: Dispatch<any>
) => {
  sendGetRequest<AllGroupsInCollege[]>(`Group`, isAllGroupsInCollegeArr).then(
    (response) => {
      const groups = thunkResponseHandler(dispatch, response);

      if (groups) dispatch(groupListByTeacherIdLoaded(groups));
    }
  );
};
