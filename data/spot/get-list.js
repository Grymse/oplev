/**
 * Following code is used to scrape the data from the page.
 * Go to https://spotfestival.dk/schedule/, scroll down to
 * load all the events and then run this code in the console.
 * The data will be stored in the `toObject` variable.
 */
// @ts-expect-error Client side the Array.from works, but not in accordance to this project
const items = Array.from(document.querySelectorAll('.shows-posts__item'));

// @ts-expect-error Cannot find type of items given error above
const toObject = items.map(item => {
    return {
        time: item.children[0].innerText,
        img: item.querySelector('img').src,
        name: item.querySelector('.title-entry').children[0].textContent,
        country: item.querySelector('.title-entry').children[1]?.textContent,
        venue: item.querySelector('.shows-posts__item-venue').innerText,
        audio: item.querySelector('audio')?.src,
        link: item.querySelector('a').href
    }});

JSON.stringify(toObject);