import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${data.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${data.status})`);
//     return data;
//   } catch (err) {
//     throw err; //* So we basically propagated the error down from one async function to the other by re-throwing the error here in this catch block.
//   }
// };

// //* If you use the keyword 'throw' in an async function, the function will call the 'reject()' function behind the scenes and the promise will get rejected

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPost = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const res = await Promise.race([fetchPost, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${data.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
