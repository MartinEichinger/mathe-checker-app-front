import http from "./httpService";

const apiEndpoint = "/calc1x1";

function thisUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getCalc1x1(body) {
  // search for new calculation task with search string
  const { data: arr } = await http.get(apiEndpoint, {
    params: JSON.stringify(body),
  });
  console.log("calcService", arr, body);
  return arr[Math.ceil(Math.random() * arr.length)];
}

// export function getCalc1x1(id) {
//   return http.get(thisUrl(id));
// }

export async function saveCalc1x1(data) {
  if (data._id) {
    const body = { ...data };
    delete body._id;
    return http.put(thisUrl(data._id), body);
  } else {
    return http.post(apiEndpoint, data);
  }
}

export function deleteCalc1x1(id) {
  return http.delete(thisUrl(id));
}
