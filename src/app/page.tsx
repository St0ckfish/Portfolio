import { RootState } from "@/GlobalRedux/store";
import Landing from "./home/Landing";
import { useSelector } from "react-redux";

export default function Home() {
  // const booleanValue = useSelector((state: RootState) => state.boolean.value);

  return (
    <main className={``}>
      <Landing/>
    </main>
  );
}