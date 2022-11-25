import { Object } from '../../Object'
import { StyledFinish, StyledGround, StyledLava, StyledWall, StyledWater } from '../../Game.style'
import { ReactComponent as IconPlayer } from '../../../../Assets/player.svg'
import { ReactComponent as IconApple } from '../../../../Assets/apple.svg'
import { ReactComponent as IconPear } from '../../../../Assets/pear.svg'
import { ReactComponent as IconPortal } from '../../../../Assets/portal.svg'
import { Colors } from '../../../../types'

const Column = (props: {
	x: number;
	y: number;
	obj: Object;
	colors: Colors;
}) => {
	const renderObject = () => {
		switch (props.obj) {
			case Object.NULL:
				return <StyledGround/>
			case Object.WALL:
				return <StyledWall style={{ backgroundColor: props.colors.wall }}/>
			case Object.WATER:
				return <StyledWater style={{ backgroundColor: props.colors.water }}/>
			case Object.LAVA:
				return <StyledLava style={{ backgroundColor: props.colors.lava }}/>
			case Object.FINISH:
				return <StyledFinish/>
			case Object.PLAYER:
				return (
					<StyledGround>
						<IconPlayer/>
					</StyledGround>
				)
			case Object.APPLE:
				return (
					<StyledGround>
						<IconApple/>
					</StyledGround>
				)
			case Object.PEAR:
				return (
					<StyledGround>
						<IconPear/>
					</StyledGround>
				)
			case Object.PORTAL:
				return (
					<StyledGround>
						<IconPortal/>
					</StyledGround>
				)
			default:
				return <></>
		}
	}

	return renderObject()
}

export default Column
