import { Priority } from "@/state/type";
import ReusablePriorityPage from "../reuseablePage.tsx";

const Backlog = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
