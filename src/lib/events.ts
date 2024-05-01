import { get, writable } from 'svelte/store';
import type { EventInfo, EventReaction } from './slides';
import eventData from './events.json';
import { spotToEvent } from './slides';

type EventSystem = {
	events: EventInfo[];
	reactions: Map<number, EventReaction>;
};

// Create a writable store
export const eventSystem = writable<EventSystem>({
	events: [],
	reactions: new Map()
});

export function react(event: EventInfo, reaction: EventReaction) {
	eventSystem.update((system) => {
		system.reactions.set(event.id, reaction);
		return system;
	});
	writeReactionsToLocalstorage(get(eventSystem));
}

export function removeReaction(event: EventInfo) {
	eventSystem.update((system) => {
		system.reactions.delete(event.id);
		return system;
	});
	writeReactionsToLocalstorage(get(eventSystem));
}

type SavedReactions = {
	reactions: [number, EventReaction][];
	version: number;
};

function writeReactionsToLocalstorage(system: EventSystem) {
	const toWrite: SavedReactions = {
		reactions: Array.from(system.reactions.entries()),
		version: 2
	};

	localStorage.setItem('reactions', JSON.stringify(toWrite));
}

function readFromLocalStorage(): SavedReactions | null {
	const stored = localStorage.getItem('reactions');
	if (!stored) return null;
	const parsed = JSON.parse(stored);
	if (parsed.version === 2) {
		parsed.reactions = new Map(parsed.reactions);
		return parsed;
	}
	localStorage.removeItem('reactions');
	return null;
}

export function initializeEventSystem() {
	// @ts-expect-error - TS doesn't know about the localStorage API
	const events = eventData.map(spotToEvent);
	const stored = readFromLocalStorage();
	const newSystem = createSystem(events, stored);
	if (!newSystem) eventSystem.set({ events, reactions: new Map() });
	else eventSystem.set(newSystem);
}

function createSystem(events: EventInfo[], stored: SavedReactions | null) {
	if (!stored) return;
	const system: EventSystem = {
		events,
		reactions: new Map(stored.reactions)
	};

	return system;
}
