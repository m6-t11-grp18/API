export function excludeMiddleware(
  obj: any,
  keysDelete: any
) {
  let tempData: any = {};
  for (let keyDelete of keysDelete) {
    for (let [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        tempData[key] = excludeMiddleware(
          obj[key],
          keysDelete
        );
      } else if (key !== keyDelete) {
        tempData[key] = value;
      }
    }
  }
  return tempData;
}

// export function excludeMiddleware(
//   obj: any,
//   keysDelete: any
// ) {
//   let tempData: any = {};
//   for (let keyDelete of keysDelete) {
//     for (let [key, value] of Object.entries(obj)) {
//       if (typeof value === 'object') {
//         tempData[key] = excludeMiddleware(
//           obj[key],
//           keysDelete
//         );
//       } else if (key !== keyDelete) {
//         tempData[key] = value;
//       }
//     }
//   }
//   return tempData;
// }

// export function excludeMiddleware(obj: any, keys: any) {
//     for (let key of keys) {
//       delete obj[key]
//     }
//     return obj
//   }
