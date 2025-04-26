import json

# Load JSON data from './from-list.json'
with open('./scraped-events.json', 'r') as file:
    data = json.load(file)

print(f"Loaded {len(data)} items from scraped-events.json")

day = "Friday"

# renaming for each item
for item in data:
    if item.get('name') == "LIFT OFF Dayparty":
        item['day'] = "Saturday"
    
    item["day"] = day
    img = item.get('img')
    if img:
        item['img'] = img.replace('_small.jpg', '_medium.jpg')
    
    item["country"] = item.get('country')[1:-1] if item.get('country') else None

with open('./events.json', 'w') as file:
    json.dump(data, file, indent=4)


"""
"time": "17:15", x
"link": "https://spotfestival.dk/program/moyka/", x
"name": "Moyka",x
"country": "NO", x
"venue": "Radar", x
"audio": "https://p.scdn.co/mp3-preview/ebb544e99f19eb22123f3e7c04aa42400a381d76?cid=a2c36625c4b74e1cb98e214da3e3e4e6",
"img": "https://s3-eu-west-1.amazonaws.com/spotfestival/189/eventitems/5344/pictures/Moyka_0_medium.jpg",
"day": "Friday", ???
"description": "<p>Moyka is on the radar within a new generation of alternative pop. Since her EPs &lsquo;Circles&rsquo; (2019) and &lsquo;Spaces&rsquo; (2020), we have been able to follow Moyka on her journey as an artist, songwriter, and producer, without her ever compromising her true self. She has built up a catalog with a clear identity and garnered attention from international heavyweights like Billboard, Notion, and The Line of Best Fit.</p>\n<p>Moyka's second album, &lsquo;Movies, Cars & Heartbreak&rsquo;, was released in October 2023. The concept album is a cinematic journey from start to finish, exploring themes of self-development through love and heartbreak. The album is a focused collection of catchy pop songs and artistic synth sequences that make you feel like life is a movie. It&rsquo;s about those moments where you feel so alone in a world that seems so enormous, trying to navigate what seems like a never-ending highway of emotions. It&rsquo;s about going fast and falling hard, taking chances, daring to believe in love and celebrating these big emotions that make us who we are.</p>\n<p><br style=\"font-weight: 400;\" /><br style=\"font-weight: 400;\" /></p>\n",
"links": {
    "Spotify": "https://open.spotify.com/artist/2u7pjisWrThF8JErPVIPlJ?si=ANqkXZmhQ0S-KtVR6O5v-w",
    "Facebook": "https://www.facebook.com/moykamusic",
    "Instagram": "https://www.instagram.com/moykamusic/",
    "TikTok": "https://www.tiktok.com/@moykamusic"
},
"youtube": "https://www.youtube.com/watch?v=qucoddqiwMM"
"""