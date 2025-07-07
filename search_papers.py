import requests
from dotenv import load_dotenv
import os

load_dotenv()

def search_papers(search_query, offset=0, limit=10):
    headers = {
        "Authorization": f"Bearer {os.getenv("CORE_API_KEY")}"
    }
    url = "https://api.core.ac.uk/v3/search/works"
    payload = {
        "q": search_query,
        "offset": offset,
        "limit": limit,
    }
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        print(response.json())
    except requests.exceptions.RequestException as e:
        print("Request Exception:", e)

if __name__=="__main__": 
    search_papers("machine learning")