import { Object } from "../../Object";
import {
  StyledGround,
  StyledPlayer,
  StyledWall,
  StyledLava,
  StyledWater,
  StyledFinish,
} from "../../Game.style";
import { ReactComponent as IconPlayer } from "../../../../Assets/player.svg";
import { Colors } from "../../../../types";

const Column = (props: {
  x: number;
  y: number;
  obj: Object;
  colors: Colors;
}) => {
  const renderObject = () => {
    switch (props.obj) {
      case Object.NULL:
        return <StyledGround />;
      case Object.WALL:
        return <StyledWall style={{ backgroundColor: props.colors.wall }} />;
      case Object.WATER:
        return <StyledWater style={{ backgroundColor: props.colors.water }} />;
      case Object.LAVA:
        return <StyledLava style={{ backgroundColor: props.colors.lava }} />;
      case Object.FINISH:
        return <StyledFinish />;
      case Object.PLAYER:
        return (
          <StyledGround>
            <StyledPlayer>
              <IconPlayer />
            </StyledPlayer>
          </StyledGround>
        );
      default:
        return <></>;
    }
  };

  return renderObject();
};

export default Column;
