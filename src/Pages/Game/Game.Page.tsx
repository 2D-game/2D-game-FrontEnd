import React from 'react'
import Game from '../../Components/Game/Game'
import { StyledGamePage } from './GamePage.style'
import { useParams } from 'react-router-dom'

const GamePage = () => {
	const { lobbyID } = useParams()

	return (
		<StyledGamePage>
			<Game lobbyID={lobbyID}/>
		</StyledGamePage>
	)
}

export default GamePage
