# 🚀 MyPortfolio — Full-Stack AI Powered Portfolio

MyPortfolio, modern teknolojilerle geliştirilmiş, içerisinde yapay zeka (Gemini) entegrasyonu bulunan gelişmiş bir kişisel portfolyo ve yönetim sistemidir.

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript
- **Backend:** .NET 9, ASP.NET Core Web API, Entity Framework Core
- **Database:** PostgreSQL
- **AI Entegrasyonu:** Google Gemini API
- **DevOps:** Docker, Docker Compose

## ✨ Öne Çıkan Özellikler

- **🤖 Yapay Zeka Asistanı:** Ziyaretçilerin projeleriniz ve deneyimleriniz hakkında interaktif şekilde soru sorabileceği Gemini destekli akıllı sohbet botu.
- **⚙️ Yönetici Paneli:** Projeleri, yetenekleri, deneyimleri, iletişim formlarını ve kişisel profilinizi yönetebileceğiniz güvenli CMS (İçerik Yönetim Sistemi).
- **🛡️ Üst Düzey Güvenlik:** JWT Cookie doğrulama, XSS ve SQL Injection koruması, Prompt Injection koruması, Rate Limiting (İstek Sınırlandırma) ve sıkılaştırılmış CORS kuralları.
- **🐳 Kolay Kurulum:** Docker Compose ile tek komutta tüm sistemin ayağa kaldırılması.

## 🚀 Hızlı Başlangıç

Projeyi yerel ortamınızda çalıştırmak çok kolaydır. Tek ihtiyacınız olan **Docker** ve bir veritabanıdır.

### 1. Veritabanı ve API Key Ayarları

- Proje varsayılan olarak ana makinenizdeki PostgreSQL veritabanına bağlanır (`host.docker.internal`). Veritabanı bağlantı bilgilerini değiştirmek isterseniz `docker-compose.yml` içindeki `ConnectionStrings__DefaultConnection` ayarını güncelleyebilirsiniz.
- AI Chatbot'un çalışması için bir Google Gemini API anahtarına ihtiyacınız var. Güvenlik nedeniyle API anahtarınızı `backend/Portfolio.API/appsettings.Development.json` dosyasına veya Docker environment'a eklemelisiniz.

### 2. Docker ile Sistemi Ayağa Kaldırma

Terminali açın ve proje dizininde aşağıdaki komutu çalıştırın:

```bash
docker-compose up --build -d
```

Uygulama hazır olduğunda aşağıdaki adreslerden erişebilirsiniz:
- **Ziyaretçi Arayüzü (Frontend):** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5024/api](http://localhost:5024/api)

### 3. Yönetici Paneli (Admin) Girişi

Portfolyonuzu yönetmek için admin sayfasına gidin:
- **Admin Giriş URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

> **Not:** Backend ilk çalıştığında Entity Framework Core veritabanını otomatik olarak oluşturur (Migration) ve içerisine başlangıç verilerini (Seed Data) ekler.

## 🏗️ Mimari

Proje "Clean Architecture" prensiplerinden ilham alınarak katmanlı bir yapıda geliştirilmiştir:
- `Portfolio.Domain`: Varlıklar (Entities) ve özel istisnalar (Exceptions).
- `Portfolio.Application`: Servisler, DTO'lar, FluentValidation doğrulama kuralları.
- `Portfolio.Infrastructure`: Veritabanı Context'i ve Repository pattern uygulamaları.
- `Portfolio.API`: Controller'lar, Middleware'ler ve konfigürasyonlar.

## 🤝 Katkıda Bulunma

Bu bir kişisel projedir, ancak geliştirme fikirlerine ve hata bildirimlerine (Pull Request / Issues) her zaman açıktır!
