import requests
from dotenv import load_dotenv
import os

load_dotenv()

def search_core_dataset(entity, search_query, offset, limit):
    headers = {
        "Authorization": f"Bearer {os.getenv("CORE_API_KEY")}"
    }
    url = "https://api.core.ac.uk/v3/search/" + entity
    payload = {
        "q": search_query,
        "offset": offset,
        "limit": limit,
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()

    return response.json()

def search_papers(search_query, offset=0, limit=10):
    return search_core_dataset(entity='works', search_query=search_query, offset=offset, limit=limit)

def search_journals(search_query, offset=0, limit=10):
    return search_core_dataset(entity='journals', search_query=search_query, offset=offset, limit=limit)

def search_data_providers(search_query, offset=0, limit=10):
    return search_core_dataset(entity='data-providers', search_query=search_query, offset=offset, limit=limit)
