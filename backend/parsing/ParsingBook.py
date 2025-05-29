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
