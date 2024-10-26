import { Priority } from "@/state/type";
import ReusablePriorityPage from "../reuseablePage.tsx";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;
