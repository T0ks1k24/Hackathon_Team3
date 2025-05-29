# 🚀 Django Project Setup після `git clone`

## 📦 1. Клонуй репозиторій
```bash
git clone <url>
cd <назва_папки_проєкту>
```

---

## 🐍 2. Створи та активуй віртуальне середовище
```bash
# Windows
python -m venv env
source env/Scripts/activate

# Linux/macOS
python3 -m venv env
source env/bin/activate
```

---

## 📥 3. Встанови залежності
```bash
pip install -r requirements.txt
```

---

## ⚙️ 4. Застосуй міграції
```bash
python manage.py migrate
```

---

## 👤 5. (Опціонально) Створи суперкористувача
```bash
python manage.py createsuperuser
```

---

## 🚀 6. Запусти сервер
```bash
python manage.py runserver
```

---

## 🔗 7. Відкрий у браузері
```
http://127.0.0.1:8000/
```

---

## 🧠 Нові слова
- `virtual environment` — віртуальне середовище  
- `requirements.txt` — список залежностей  
- `migrate` — застосування міграцій  
- `runserver` — запуск сервера  
- `superuser` — адміністратор Django

# dj