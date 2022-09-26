import { Object } from '../../Object'
import { StyledGround, StyledPlayer, StyledWall } from '../../Game.style'
import { ReactComponent as IconPlayer } from "../../../../Assets/player.svg";

const Column = (props: { x: number, y: number, obj: Object }) => {
	const renderObject = () => {
		switch (props.obj) {
			case Object.NULL:
				return <StyledGround/>
			case Object.WALL:
				return <StyledWall/>
			case Object.PLAYER:
				return <StyledGround>
					<StyledPlayer>
						<IconPlayer />
					</StyledPlayer>
				</StyledGround>
			default:
				return <></>
		}
	}

	return (
		renderObject()
	)
}

export default Column
