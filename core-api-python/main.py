from post_search_request import search_works, search_journals, search_data_providers
import json

def main():
    output_file_path="machine-learning-query-results.json"
    works_response = search_works(search_query='machine learning in medicine', limit=1)

    with open(output_file_path, 'w') as json_file:
        json.dump(works_response, json_file, indent=4)

if __name__ == "__main__":
    main()
