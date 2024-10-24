type Props = {
  id: string;
  setIsModalNewTaskOpen: (open: boolean) => void;
};

export default function ListView({ id, setIsModalNewTaskOpen }: Props) {
  return (
    <div>
      <h1>ListView</h1>
    </div>
  );
}
