import { Object } from "../Object";
import Column from "./Column/Column";
import { StyledRow } from "../Game.style";
import { Colors } from "../../../types";

const Row = (props: { row: Object[]; y: number; colors: Colors }) => {
  return (
    <StyledRow>
      {props.row.map((obj, x) => (
        <Column key={x} x={x} y={props.y} obj={obj} colors={props.colors} />
      ))}
    </StyledRow>
  );
};

export default Row;
