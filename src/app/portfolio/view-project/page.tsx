"use client"
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

const ViewProject = () => {
  const booleanValue = useSelector((state: RootState) => state.boolean.value);

    return ( 
        <div className={`${booleanValue ? "bg-white" : "" } h-[566px]`}>
        </div>
     );
}
 
export default ViewProject;