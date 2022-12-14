import { Object } from '../../Object'
import { StyledFinish, StyledGround, StyledLava, StyledWall, StyledWater } from '../../Game.style'
import { ReactComponent as IconApple } from '../../../../Assets/apple.svg'
import { ReactComponent as IconPear } from '../../../../Assets/pear.svg'
import { ReactComponent as IconPortal } from '../../../../Assets/portal.svg'
import { ReactComponent as IconBox } from '../../../../Assets/box.svg'
import { ReactComponent as IconGiftBox} from '../../../../Assets/redbox.svg'
import BadApple from '../../../../Assets/badapple.png'
import { Colors } from '../../../../types'
import { PlayersContext } from '../../Game'

export const Player = ({ base64SVG }: { base64SVG?: string }) => {
	return (
		<div className="player">
			<img src={'data:image/png;base64,' + base64SVG} alt="player"/>
		</div>
	)
}

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
					<PlayersContext.Consumer>
						{players => {
							const img = players?.find(player => player.coords.x === props.x && player.coords.y === props.y)?.image
							if (!img) {
								return <StyledGround/>
							}
							return (
								<StyledGround>
									<Player base64SVG={img}/>
								</StyledGround>
							)
						}}
					</PlayersContext.Consumer>
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
			case Object.BOX:
				return (
					<StyledGround>
						<IconBox/>
					</StyledGround>
				)
			case Object.GIFT_BOX:
				return (
					<StyledGround>
						<IconGiftBox/>
					</StyledGround>
				)
			case Object.BAD_APPLE:
				return (
					<StyledGround>
						<div className="badapple">
							<img  src={BadApple} alt="badapple"/>
						</div>
					</StyledGround>
				)
			default:
				return <></>
		}
	}

	return renderObject()
}

export default Column
