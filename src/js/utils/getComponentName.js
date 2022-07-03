const getComponentName = (contentID) => {
  const contentIDsArray = contentID.trim().split(".");
  return contentIDsArray[contentIDsArray.length - 1];
};

export default getComponentName;
