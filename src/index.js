import { config } from './config/config';
//-----------------------------------------------------//
import authService from './appwrite/authService';
import storageService from './appwrite/storageService';
//-----------------------------------------------------//
import { Container } from './components/Elements/Container';
//-----------------------------------------------------//

import Register from './components/services/Register';

export { config, authService, storageService, Register, Container };

// import React from 'react';
// import { Container } from '../../index';
// import { Link } from 'react-router-dom';
// function Register() {
//   return (
//     <Container>
//       <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px] border">
//         <div className="flex items-center justify-center py-12 border">
//           <div className="mx-auto grid w-[450px] gap-6 border p-4">
//             <div className="grid gap-2 text-center">
//               <h1 className="text-3xl font-bold">Login</h1>
//               <p className="text-balance text-muted-foreground">
//                 Enter Following Details To Register.
//               </p>
//             </div>
//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   className="border p-1 rounded-md"
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center justify-between">
//                   <label htmlFor="password">Password</label>
//                   {/* <Link
//                     to={'/'}
//                     className="ml-auto inline-block text-sm underline"
//                   > */}
//                   <div>Forgot your password?</div>
//                   {/* </Link> */}
//                 </div>
//                 <input
//                   className="border p-1 rounded-md"
//                   id="password"
//                   type="password"
//                   required
//                 />
//               </div>
//               <div className="w-full text-center ">
//                 <button type="submit" className="border p-2 w-[20%] rounded-lg">
//                   Login
//                 </button>
//               </div>
//               {/* <button className="w-full">Login with Google</button> */}
//             </div>
//             <div className="mt-4 text-center text-sm">
//               Don&apos;t have an account?{' '}
//               {/* <Link to={'/'} className="underline"> */}
//               Sign up
//               {/* </Link> */}
//             </div>
//           </div>
//         </div>

//         {/* 2nd part  */}
//         <div className="hidden bg-muted lg:block">
//           <img
//             src="/placeholder.svg"
//             alt="Image"
//             width="1920"
//             height="1080"
//             className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//           />
//         </div>
//       </div>
//     </Container>
//   );
// }

// export default Register;
