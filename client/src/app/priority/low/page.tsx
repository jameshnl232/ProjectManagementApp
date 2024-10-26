import { Priority } from "@/state/type";
import ReusablePriorityPage from "../reuseablePage.tsx";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Low;
