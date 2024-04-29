function read(html) {
	const description = html
		.split('<div data-tab-content="show-en"')?.[1]
		?.split('div class="entry-content">')?.[1]
		?.split('</div>')?.[0]
		?.replaceAll('\t', '');

	const tempLinks = html
		.split('class="show-intro__some">')?.[1]
		?.split('</div>')?.[0]
		?.split('<a href="');
	const links = {};
	if (tempLinks) {
		for (let i = 1; i < tempLinks.length; i++) {
			const title = tempLinks[i].split('title="')[1].split('"')[0];
			const link = tempLinks[i].split('"')[0];
			links[title] = link;
		}
	}

	const YT = html.split('href="https://www.youtube.com/watch?v=')[1]?.split('"')?.[0];
	const youtube = YT ? `https://www.youtube.com/watch?v=${YT}` : undefined;

	return {
		description,
		links,
		youtube
	};
}

import fs from 'fs';
// Read json file without require
function readJson(path) {
	try {
		const data = fs.readFileSync(path, {
			encoding: 'utf8'
		});

		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading file:', error);
	}
}

function writeJson(path, data) {
	try {
		fs.writeFileSync(path, JSON.stringify(data, null, 2));
	} catch (error) {
		console.error('Error writing file:', error);
	}
}

async function fix(item) {
	const url1 = item.link;
	const url2 = item.link.substring(0, item.link.length - 1) + '-2/';
	const { html, url } = await fetchContent(url1, url2);
	const content = read(html);
	return { ...item, ...content, link: url };
}

async function main() {
	const output = [];
	const data = readJson('./data.json');
	for (const item of data) {
		const fixed = await fix(item);
		output.push(fixed);
	}
	writeJson('./output.json', output);
}
main();

async function fetchHTML(url) {
	const response = await fetch(url);
	const html = await response.text();
	return html;
}

async function fetchContent(url1, url2) {
	try {
		const html = await fetchHTML(url1);
		if (html.includes('Uncaught Error: Call to a member function is_archive()')) throw new Error();
		return { url: url1, html };
	} catch (e) {
		const html = await fetchHTML(url2);
		return { url: url2, html };
	}
}
