export const LinkDetector = (props: { stringForDetecting: string }) => {
  const { stringForDetecting } = props;
  const stringForDetectingSplit = stringForDetecting.split(' ');
  const linkPartIndex = stringForDetectingSplit.indexOf(
    stringForDetectingSplit.filter(
      (part) => part.includes('https:/') || part.includes('http:/')
    )[0]
  );

  return (
    <>
      {stringForDetectingSplit.map((splitPart, index) =>
        index === linkPartIndex ? (
          <a href={splitPart} target="blank">
            {` ${splitPart}`}
          </a>
        ) : (
          ` ${splitPart}`
        )
      )}
    </>
  );
};
