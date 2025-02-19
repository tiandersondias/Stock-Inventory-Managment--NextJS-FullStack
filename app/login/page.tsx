// "use client";

// import React from "react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../authContext";

// export default function LoginPage() {
//   const { register, handleSubmit } = useForm();
//   const router = useRouter();
//   const { login } = useAuth();

//   const onSubmit = (data: any) => {
//     console.log(data);
//     // Handle login logic here
//     login();
//     // On successful login, redirect to the dashboard
//     router.push("/");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Sign in to your account
//         </h2>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 {...register("email")}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 {...register("password")}
//               />
//             </div>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 {...register("rememberMe")}
//               />
//               <label
//                 htmlFor="remember-me"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 Remember me
//               </label>
//             </div>
//             <div className="text-sm">
//               <Link
//                 href="/forgot-password"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign in
//             </button>
//           </div>
//           <div className="text-sm text-center">
//             <Link
//               href="/register"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Don&apos;t have an account? Register
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
