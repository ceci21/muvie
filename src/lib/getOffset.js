const getOffset = (currentWidth, minCharLen, maxCharLen, minWidth, maxWidth) => {
  const ratio = (maxCharLen - minCharLen) / (maxWidth - minWidth);
  const result = Math.floor(ratio * (currentWidth - minWidth));
  return result || 0;
};

export default getOffset;
