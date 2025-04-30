export type Vector2 = { x: number; y: number };
export type Vector2WithRot = { rot: number } & Vector2;

export function add(v1: Vector2, v2: Vector2): Vector2 {
	return { x: v1.x + v2.x, y: v1.y + v2.y };
}

export function subtract(v1: Vector2, v2: Vector2): Vector2 {
	return { x: v1.x - v2.x, y: v1.y - v2.y };
}

export function multiply(v: Vector2, scalar: number): Vector2 {
	return { x: v.x * scalar, y: v.y * scalar };
}

export function divide(v: Vector2, scalar: number): Vector2 {
	return { x: v.x / scalar, y: v.y / scalar };
}

export function divideVectors(v1: Vector2, v2: Vector2): Vector2 {
	return { x: v1.x / v2.x, y: v1.y / v2.y };
}

export function length(v: Vector2): number {
	return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalize(v: Vector2): Vector2 {
	const len = length(v);
	return len === 0 ? { x: 0, y: 0 } : divide(v, len);
}

export function dot(v1: Vector2, v2: Vector2): number {
	return v1.x * v2.x + v1.y * v2.y;
}

export function distance(v1: Vector2, v2: Vector2): number {
	return length(subtract(v1, v2));
}
export function angleBetween(v1: Vector2, v2: Vector2): number {
	const dotProduct = dot(v1, v2);
	const len1 = length(v1);
	const len2 = length(v2);
	return Math.acos(dotProduct / (len1 * len2));
}

export function rotate(v: Vector2, angle: number): Vector2 {
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);
	return { x: v.x * cos - v.y * sin, y: v.x * sin + v.y * cos };
}

export function rotateAround(v: Vector2, angle: number, pivot: Vector2): Vector2 {
	const translated = subtract(v, pivot);
	const rotated = rotate(translated, angle);
	return add(rotated, pivot);
}
