import { Homework } from '../../../interfaces/Homework';

export const LinkDetector = (props: { hw: Homework }) => {
  const { hw } = props;
  const descriptionText = hw.description ? hw.description : 'нет описания';
  const parsed = descriptionText.split(' ');
  const linkPartIndex = parsed.indexOf(
    parsed.filter((part) => part.includes('https:/'))[0]
  );

  return (
    <>
      {parsed.map((splitPart, index) =>
        index === linkPartIndex ? (
          <a href={splitPart}> {splitPart}</a>
        ) : (
          ` ${splitPart}`
        )
      )}
    </>
  );
};
