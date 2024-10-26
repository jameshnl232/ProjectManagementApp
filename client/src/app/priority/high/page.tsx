import { Priority } from "@/state/type";
import ReusablePriorityPage from "../reuseablePage.tsx";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
