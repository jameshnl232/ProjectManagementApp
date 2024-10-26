import { Priority } from "@/state/type";
import ReusablePriorityPage from "../reuseablePage.tsx";

const Medium = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
