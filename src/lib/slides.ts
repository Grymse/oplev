/* class Engine {
	events: Event[];

	constructor(data: string) {
		this.events = JSON.parse(data);
	}
}

interface IEngine {
	events: Event[];

	react(event: Event, reaction: Reaction): void;
	setup(event: Event, reactions: Reaction[]): IEngine;
	next(): Event;
	previous(): Event;
	getReactedEvents(reaction?: Reaction | 'all'): Event[];
	getUnreactedEvents(): Event[];
}
 */
/* type Reaction = 'like' | 'dislike' | 'superlike';
 */
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

/* const h = {
    // Static
		"time": "16:00",
		"name": "iiris",
		"country": "(DK)",
		"venue": "Klubscenen, Musikhuset",
		"day": "Friday",
		"link": "https://spotfestival.dk/program/iiris/",

    // First
    "youtube": "https://www.youtube.com/watch?v=_ntBpbzq9_M&#038;list=OLAK5uy_n0mFpLPm5uAYuaPJEFwwyHWUQwpsfENm4"
		
    // Second
    "audio": "https://p.scdn.co/mp3-preview/35257f88d0597c95eba6fb607a1697300634c69d?cid=a2c36625c4b74e1cb98e214da3e3e4e6",
		"img": "https://s3-eu-west-1.amazonaws.com/spotfestival/189/eventitems/5435/pictures/iiris_0_medium.jpg",
		
    // Third
    "description": "<p>iiris is an Aarhus-based art-pop duo consisting of Anders Skadhede and Thilde Dam. Together, they write songs that everyone needs when the emotions of everyday life become too overwhelming to face alone. These are stories about the fear of growing up, long-distance relationships, and playing too hard-to-get to message your crush. In January 2023, the duo released their debut EP, &lsquo;Kradser Ik&rsquo; L&aelig;ngere Mine H&aelig;nder&rsquo;, taking the listener on a journey from a broken heart to finally becoming their own main character again. iiris is not afraid to share aspects of their private lives, making the lyrics personal and sincere, yet humorous and unpretentious. For iiris, melodies are a crucial element in their songs, and as a listener, it's hard not to sing along to the playful choruses and hooks.</p>\n<p>iiris has performed at events such as SEEK, RAMA festival, and most recently, SPOT, in a packed R&aring; Hal at Godsbanen, earning much praise from an audience that laughed and cried throughout the show. On stage, iiris is known for both the simple duo setup and the grand nine-person band, including strings, backup singers, and a VJ. Their concerts are intimate, intense, humorous, and filled with gimmicks and sing-along moments that are hard to forget.</p>\n<p>Presented by The Royal Academy of Music</p>\n<p><br style=\"font-weight: 400;\" /><br style=\"font-weight: 400;\" /></p>\n",
		
    // Fourth
    "links": {
			"Spotify": "https://open.spotify.com/artist/2X8610iPguCWzJZxPUaxzv?si=m-olg-pUSv6BZphlT-0Sjg",
			"Facebook": "https://www.facebook.com/iiris.band.official",
			"Instagram": "https://www.instagram.com/iiris_official/"
		},
	}; */

export function spotToEvent(event: SpotEvent): EventInfo {
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
		text: event.description,
		links: event.links
	});

	const time = new Date(`6 ${event.day === 'Friday' ? '3' : '4'} 2024 ${event.time}`).toISOString();

	return {
		time,
		name: event.name,
		country: event.country || '',
		venue: event.venue,
		link: event.link,
		slides
	};
}

export type EventInfo = {
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
	links: {
		[key: string]: string;
	};
};

export type EventSlide = YouTubeEventSlide | ImageEventSlide | TextEventSlide;
