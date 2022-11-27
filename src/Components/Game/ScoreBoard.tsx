import { StyledScoreBoard } from './Game.style'

export const ScoreBoard = ({ scores }: { scores: any }) => {
	const sortedScores = scores.sort((a: any, b: any) => b.score - a.score)
	return (
		<StyledScoreBoard>
			<h3>Score board</h3>
			<table style={{ margin: '0 auto' }}>
				<tr>
					<th>Username</th>
					<th>Score</th>
				</tr>
				{sortedScores.map((score: any) => (
					<tr key={score.id}>
						<td>{score.username}</td>
						<td>{score.score}</td>
					</tr>
				))}
			</table>
		</StyledScoreBoard>
	)
}
