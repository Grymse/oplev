export function ISOToTimeDay(ISO: string): string {
	return new Date(ISO).toLocaleDateString('en-GB', {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit'
	});
}
