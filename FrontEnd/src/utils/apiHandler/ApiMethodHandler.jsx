// import axios from 'axios';



// export function apiClientHandler(config) {
//     const baseUrl = 'http://localhost:5000';

//     return async function (method, options) {
//         const apiMethod = config?.[method];

//         // 405 if the method doesn't exist.
//         if (!apiMethod) {
//             throw new Error(`${method} method not allowed.`);
//         }

//         const requestConfig = {
//             method: method.toUpperCase(),
//             url: `${baseUrl}/${apiMethod.endpoint}`, // Use the base URL and endpoint
//             data: apiMethod.body,
//             headers: apiMethod.headers,
//             ...options,
//         };

//         try {
//             const response = await axios(requestConfig);
//             return response;
//         } catch (error) {
//             // Handle errors as needed
//             throw error;
//         }
//     };
// }
