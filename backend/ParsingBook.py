import requests
from bs4 import BeautifulSoup
import json

# URL сайту, який парсимо 
base_url = "https://books.toscrape.com/catalogue/page-{}.html"
books_data = []

# Перевіряємо статус відповіді
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

        books_data.append({
            "title": title,
            "price": price,
            "image_url": image_url
        })

    # Зберігаємо як JSON
with open("books.json", "w", encoding="utf-8") as f:
    json.dump(books_data, f, indent=4, ensure_ascii=False)
