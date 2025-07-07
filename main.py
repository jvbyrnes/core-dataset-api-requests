from post_search_request import search_works, search_journals, search_data_providers

def main():
    works_response = search_works(search_query='machine learning in medicine', limit=2)
    journals_response = search_journals(search_query="machine learning", limit=2)
    data_providers_response = search_data_providers(search_query="dataset")


    print(works_response)
    print("-"*60)
    print(journals_response)
    print("-"*60)
    print(data_providers_response)


if __name__ == "__main__":
    main()
