import "./styles/Agreement.scss";

interface AgreementProps {
  onNo: React.Dispatch<React.SetStateAction<boolean>>;
  onYes: (id: number) => void;
  id: number;
}

function Agreement({ onNo, onYes, id }: AgreementProps) {
  return (
    <article className="window">
      <h3 className="window__tittle">Are you sure?</h3>
      <div className="window__buttonsFlex">
        <button
          className="window__buttonsFlex--yes"
          onClick={() => {
            onYes(id);
          }}
        >
          Yes
        </button>
        <button
          className="window__buttonsFlex--no"
          onClick={() => {
            onNo(false);
          }}
        >
          No
        </button>
      </div>
    </article>
  );
}

export default Agreement;
