import ReactNativeBlobUtil, { ReactNativeBlobUtilFetchPolyfill } from 'react-native-blob-util'

readFileBase64 = async(filePath) => {
    if(!filePath){
      return null
    }
    const data = await ReactNativeBlobUtil.fs.readFile(filePath, 'base64');
    const file = `${data}`;
    return file;
  }



export const formatTimeByOffset = (dateString, offset) => {
  // Params:
  // How the backend sends me a timestamp
  // dateString: on the form yyyy-mm-dd hh:mm:ss
  // offset: the amount of hours to add.

  // If we pass anything falsy return empty string
  if (!dateString) return '';
  if (dateString.length === 0) return '';

  // Step 1: Parse the backend date string

  // Get Parameters needed to create a new date object
  let date = new Date(dateString);
  const milliseconds = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  );
  const localTime = new Date(milliseconds);
  console.log(localTime)
  const newDateString = localTime
    .toISOString()
    .replace('T', ' ')
    .slice(0, 16);
  // Step 1: Parse the backend date string

  return `${newDateString}`;
};
  
const Utils = {
    readFileBase64,
};
export default Utils;