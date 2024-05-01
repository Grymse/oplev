type SpotEvent = {
	time: string;
	link: string;
	name: string;
	country?: string;
	venue: string;
	audio?: string;
	img: string;
	day: string;
	description: string;
	links: EventLinks;
	youtube?: string;
};

type EventLinks = {
	Spotify?: string;
	Facebook?: string;
	Instagram?: string;
	TikTok?: string;
};

export function spotToEvent(event: SpotEvent, index?: number): EventInfo {
	const slides: EventSlide[] = [];

	if (event.youtube) {
		slides.push({
			type: 'youtube',
			youtube: event.youtube
		});
	}

	slides.push({
		type: 'img',
		img: event.img,
		audio: event.audio
	});

	slides.push({
		type: 'text',
		text: event.description
	});

	if (Object.keys(event.links).length > 0) {
		slides.push({
			type: 'links',
			links: event.links
		});
	}

	const time = new Date(`5 ${event.day === 'Friday' ? '3' : '4'} 2024 ${event.time}`).toISOString();

	return {
		id: index ?? Math.floor(Math.random() * 10000000),
		time,
		name: event.name,
		country: event.country || '',
		venue: event.venue,
		link: event.link,
		slides
	};
}

export type EventInfo = {
	id: number;
	time: string;
	name: string;
	country: string;
	venue: string;
	link: string;
	slides: EventSlide[];
};

export type YouTubeEventSlide = {
	type: 'youtube';
	youtube: string;
};

export type ImageEventSlide = {
	type: 'img';
	img: string;
	audio?: string;
};

export type TextEventSlide = {
	type: 'text';
	text: string;
};

export type LinksEventSlide = {
	type: 'links';
	links: {
		[key: string]: string;
	};
};

export type EventSlide = YouTubeEventSlide | ImageEventSlide | TextEventSlide | LinksEventSlide;
