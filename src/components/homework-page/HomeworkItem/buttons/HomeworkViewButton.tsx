import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';

import { Homework } from '../../../../interfaces/Homework';
import { homeworkUrl } from '../../../../shared/consts';
import { RoundButton } from '../../../../shared/styled-components/buttonStyledComponent';

function HomeworkViewButton(props: { hw: Homework }) {
  const { hw } = props;
  const history = useHistory();
  const viewOnClick = () => {
    history.push(`${homeworkUrl}/${hw.id}/attempts`);
  };

  return (
    <RoundButton title="просмотреть" onClick={viewOnClick}>
      <FontAwesomeIcon icon="eye" />
    </RoundButton>
  );
}
export default HomeworkViewButton;
