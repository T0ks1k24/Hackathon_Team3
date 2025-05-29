from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
from bs4 import BeautifulSoup

def parse_books():
    
    # URL сайту, який парсимо 
    base_url = "https://books.toscrape.com/catalogue/page-{}.html"
    books_data = []

    for page in range(1, 51):  # 1 до 50 включно
        url = base_url.format(page)
        response = requests.get(url) # Надсилаємо запит до сайту

        if response.status_code != 200:
            print(f"Помилка при доступі до сторінки {page}")
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        books = soup.find_all("article", class_="product_pod")

        for book in books:
            title = book.h3.a["title"]
            price = book.find("p", class_="price_color").text.strip()
            image_rel_url = book.find("img")["src"]
            image_url = "https://books.toscrape.com/" + image_rel_url.replace("../../", "")

            rating_class = book.find("p", class_="star-rating")["class"]
            rating_text = rating_class[1] if len(rating_class) > 1 else "None"

            rating_map = {
                "One": 1,
                "Two": 2,
                "Three": 3,
                "Four": 4,
                "Five": 5
            }
            rating = rating_map.get(rating_text, 0)

            books_data.append({
                "title": title,
                "price": price,
                "image_url": image_url,
                "rating": rating
            })
        
    return books_data


import json
from urllib.parse import urljoin
import re
import random
import time

start_time = time.time()

base_site = "http://books.toscrape.com/"

def fetch_book(book_url, genre):
    try:
        response = requests.get(book_url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.find("div", class_="product_main").h1.text.strip()
        
        price = soup.find("p", class_="price_color").text.strip()
        price  = float(re.findall(r"[\d\.]+", price)[0])

        availability = soup.find("p", class_="instock availability").text.strip()
        availability_match = re.search(r"\((\d+)\savailable\)", availability)
        availability = int(availability_match.group(1)) if availability_match else 0

        rating_tag = soup.find("p", class_="star-rating")
        rating_class = rating_tag["class"] if rating_tag else []
        rating_text = rating_class[1] if len(rating_class) > 1 else "None"

        rating_map = {
            "One": 1,
            "Two": 2,
            "Three": 3,
            "Four": 4,
            "Five": 5
        }
        rating = rating_map.get(rating_text, 0)
                
        table = soup.find("table", class_="table table-striped")
        upc = table.find("th", string="UPC").find_next("td").text if table else ""
        
        img_tag = soup.find("img")
        img_url = urljoin("http://books.toscrape.com/", img_tag["src"]) if img_tag else ""

        description = ""
        desc_tag = soup.find("div", id="product_description")
        if desc_tag:
            desc_p = desc_tag.find_next_sibling("p")
            if desc_p:
                description = desc_p.text.strip()
        
        year = random.randint(1800, 2025)


        return {
            "title": title,
            "price": price,
            "availability": availability,
            "rating": rating,
            "upc": upc,
            "image_url": img_url,
            "description": description,
            "genre": genre,
            "year": year
        }
    except Exception as e:
        print(f"Error fetching {book_url}: {e}")
        return None

def get_genres():
    response = requests.get(base_site)
    soup = BeautifulSoup(response.text, "html.parser")
    genres = soup.select("div.side_categories ul li ul li a")
    genre_links = []


    for genre in genres:
        name = genre.text.strip()
        relative_link = genre.get("href")
        genre_url = urljoin(base_site, relative_link)
        genre_links.append((name, genre_url))

    return genre_links

def get_book_links_from_genre(genre_url):
    book_links = []
    page_number = 1

    while True:
        if page_number == 1:
            url = genre_url
        else:
            url = genre_url.replace("index.html", f"page-{page_number}.html")

        response = requests.get(url)
        if response.status_code != 200:
            break

        soup = BeautifulSoup(response.text, "html.parser")
        books = soup.find_all("article", class_="product_pod")

        if not books:
            break

        for book in books:
            relative_link = book.h3.a["href"].replace('../../../', '')
            book_url = urljoin(base_site + "catalogue/", relative_link)
            book_links.append(book_url)

        page_number += 1

    return book_links

def main():
    all_book_urls = []
    genre_links = get_genres()
    print(f"Found {len(genre_links)} genres.")

    for genre_name, genre_url in genre_links:
        print(f"Processing genre: {genre_name}")
        book_urls = get_book_links_from_genre(genre_url)
        all_book_urls.extend(book_urls)

    with open("books_by_genre.jsonl", "w", encoding="utf-8") as f:
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(fetch_book, url, genre_name) for url in all_book_urls]
            for future in as_completed(futures):
                book_data = future.result()
                if book_data:
                    f.write(json.dumps(book_data, ensure_ascii=False) + "\n")

if __name__ == "__main__":
    main()

end_time = time.time()
print(f"{end_time - start_time:.5f} секунд")