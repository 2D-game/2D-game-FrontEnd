import { Object } from '../Object'
import Column from './Column/Column'
import { StyledRow } from '../Game.style'

const Row =	(props: { row: Object[], y: number }) => {
	return (
		<StyledRow>
			{props.row.map((obj, x) => (
				<Column key={x} x={x} y={props.y} obj={obj} />
			))}
		</StyledRow>
	)
}

export default Row
