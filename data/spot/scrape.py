import requests
from bs4 import BeautifulSoup
import json

# Load JSON data from './from-list.json'
with open('./from-list.json', 'r') as file:
    data = json.load(file)

# Iterate through each object in the data array
for item in data:
    link = item.get('link')
    name = item.get('name')
    if not link:
        # If 'link' is not present, skip this item
        print(f"No link found for {name}, skipping...")
        continue
    try:
        # Download the page
        response = requests.get(link)
        response.raise_for_status()
        
        # Parse the page content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Placeholder for query selectors
        descriptionComponent = soup.select_one('.entry-content')
        item['description'] = descriptionComponent.text.strip() if descriptionComponent else None

        SoMe = soup.select_one('.show-intro__some')
        if not SoMe:
            print(f"No social media links found for {link}, skipping...")
            continue

        # Extract social media links
        links = {}
        for a_tag in SoMe.find_all('a', href=True, title=True):
            platform = a_tag['title']
            href = a_tag['href']
            links[platform] = href

        # Add extracted links to the item
        item['links'] = links
        youtubeLink = soup.select_one('.button-play-video')
        if youtubeLink:
            item['youtube'] = youtubeLink['href']

        # Add your query selectors here
        print(f"Successfully fetched and parsed: {link}")
        # save JSON file
        with open('./scraped-events.json', 'w') as file:
            json.dump(data, file, indent=4)
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch {link}: {e}")


