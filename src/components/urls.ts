import type { EventReaction } from './slides';

export function generateURL(reactions: Map<number, EventReaction>) {
	const origin = location.origin;
	const stringifiedReactions = stringifyReactions(reactions);
	return (
		origin +
		'?likes=' +
		stringifiedReactions.likes +
		'&hearts=' +
		stringifiedReactions.hearts +
		'&passes=' +
		stringifiedReactions.passes
	);
}

export function urlHasReactions(currentUrl: string) {
	const url = new URL(currentUrl);
	return (
		url.searchParams.has('likes') ||
		url.searchParams.has('hearts') ||
		url.searchParams.has('passes')
	);
}

export function parseURL(currentUrl: string): Map<number, EventReaction> {
	const url = new URL(currentUrl);
	const likes = parseIds(url.searchParams.get('likes') ?? '');
	const hearts = parseIds(url.searchParams.get('hearts') ?? '');
	const passes = parseIds(url.searchParams.get('passes') ?? '');
	const reactions = new Map<number, EventReaction>();
	for (const id of likes) {
		reactions.set(id, 'like');
	}
	for (const id of hearts) {
		reactions.set(id, 'heart');
	}
	for (const id of passes) {
		reactions.set(id, 'pass');
	}
	return reactions;
}

function stringifyIds(ids: number[]): string {
	return ids.map((id) => id.toString(36).padStart(2, '0')).join('');
}

function parseIds(hex: string): number[] {
	const ids = [];
	for (let i = 0; i < hex.length; i += 2) {
		ids.push(parseInt(hex.slice(i, i + 2), 36));
	}
	return ids;
}

function stringifyReactions(reactions: Map<number, EventReaction>) {
	return {
		likes: stringifyIds(getReactionIds(reactions, 'like')),
		hearts: stringifyIds(getReactionIds(reactions, 'heart')),
		passes: stringifyIds(getReactionIds(reactions, 'pass'))
	};
}

function getReactionIds(reactions: Map<number, EventReaction>, reactionType: EventReaction) {
	const ids = [];
	for (const [id, reaction] of reactions.entries()) {
		if (reaction === reactionType) {
			ids.push(id);
		}
	}
	return ids;
}
