import React from 'react';
import { TrelloCard } from '../../models/Trello';

export const MiniCard: React.FC<TrelloCard> = ({ name, labels }) => {
	return (
		<blessed-text style={{ bg: labels[0].color || 'black' }}>
			{ name }
		</blessed-text>
	)
}
