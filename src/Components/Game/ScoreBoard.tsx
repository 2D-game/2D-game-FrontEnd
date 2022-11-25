import { StyledScoreBoard } from './Game.style'

export const ScoreBoard = ({ scores }: { scores: any }) => {
	return (
		<StyledScoreBoard>
			<h3>Score board</h3>
			<table style={{ margin: '0 auto' }}>
				<tr>
					<th>Username</th>
					<th>Score</th>
				</tr>
				{scores.map((score: any) => (
					<tr key={score.id}>
						<td>{score.username}</td>
						<td>{score.score}</td>
					</tr>
				))}
			</table>
		</StyledScoreBoard>
	)
}
