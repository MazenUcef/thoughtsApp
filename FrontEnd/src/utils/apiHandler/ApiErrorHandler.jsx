// import { isAxiosError } from 'axios';

// export function apiErrorHandler(error) {
//     if (isAxiosError(error)) {
//         if (error.response) {
//             const { status = 400, data } = error.response;

//             let message = '';
//             if (typeof data === 'string') {
//                 message = data;
//             } else if (
//                 typeof data === 'object' &&
//                 'Message' in data &&
//                 typeof data.Message === 'string'
//             ) {
//                 message = data.Message;
//             } else {
//                 message = data;
//             }

//             return { status: status === 200 ? 400 : status, error: message };
//         }

//         if (error.message) {
//             return { status: 500, error: error.message };
//         }
//     }

//     return {
//         status: 500,
//         error: "We're experiencing technical difficulties. Please try again later.",
//     };
// }
