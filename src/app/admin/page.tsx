"use client";
import { useEffect } from "react";
// import Loading from "../loading";
// import { useGetCurrentUserQuery } from "./features/currentUserApi";
// import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
//   const { data, error, isLoading } = useGetCurrentUserQuery(null);

//   useEffect(() => {
//     if (error) {
//       Cookie.remove("token");
//       router.replace("/admin/login");
//     }
//   }, [data, error]);

//   if (isLoading)
//     return (
//       <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
//         <Loading />
//       </div>
//     );

  return <div className="mt-[50px] lg:mr-[270px]">Admin</div>;
};

export default Admin;
