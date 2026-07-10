# 🚀 MyPortfolio — Full-Stack AI Powered Portfolio

![MyPortfolio Banner](https://via.placeholder.com/1200x400.png?text=MyPortfolio+Banner)

MyPortfolio, modern web teknolojileri ile "Clean Architecture" prensipleri doğrultusunda geliştirilmiş, güçlü bir kişisel portfolyo ve içerik yönetim sistemidir (CMS). Ziyaretçilerin özgeçmişinizi, yeteneklerinizi ve projelerinizi incelemesinin yanı sıra, projeye entegre edilen **Google Gemini AI Asistanı** sayesinde sizin hakkınızda merak ettikleri sorulara yapay zeka aracılığıyla anında yanıt alabilmelerini sağlar.

---

## 📑 İçindekiler
- [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
- [Kullanılan Teknolojiler (Tech Stack)](#-kullanılan-teknolojiler-tech-stack)
- [Sistem Mimarisi ve Klasör Yapısı](#-sistem-mimarisi-ve-klasör-yapısı)
- [Güvenlik Yaklaşımı](#-güvenlik-yaklaşımı)
- [Kurulum & Çalıştırma (Docker ile)](#-kurulum--çalıştırma-docker-ile)
- [Kurulum & Çalıştırma (Yerel Geliştirme)](#-kurulum--çalıştırma-yerel-geliştirme)
- [API Uç Noktaları (Endpoints)](#-api-uç-noktaları-endpoints)

---

## ✨ Öne Çıkan Özellikler

### 🤖 Akıllı AI Sohbet Asistanı (Gemini)
* Ziyaretçilerin sorduğu soruları anlık olarak işler.
* Veritabanındaki "Hakkımda", "Projeler" ve "Deneyimler" verilerini sistem bağlamı (System Context) olarak kullanarak, portfolyo sahibine özel ve tutarlı yanıtlar üretir.
* **Prompt Injection koruması** ve **kara liste (blacklist)** filtresi sayesinde kötü niyetli sorgular engellenir.

### ⚙️ Kapsamlı Yönetim Paneli (Admin)
* Güvenli giriş sistemi (JWT).
* Projeler (ekleme/düzenleme/silme), görsel yükleme ve bağlantı yönetimi.
* Yetenek (Skills) ve Deneyim (Experiences) listelerinin kategorize edilmiş şekilde yönetimi.
* Özgeçmiş (CV) yükleme ve profil verilerinin anlık güncellenmesi.

### ⚡ Performans & Modern Arayüz
* **Next.js App Router** ile Server-Side Rendering (SSR) destekli, SEO uyumlu ve son derece hızlı sayfa yüklemeleri.
* Tailwind CSS kullanılarak hazırlanmış, tamamen mobil uyumlu (Responsive) modern tasarım.
* Farklı ekran boyutlarına kusursuz adapte olan esnek Grid ve Flexbox yapıları.

---

## 🛠️ Kullanılan Teknolojiler (Tech Stack)

### Frontend (İstemci)
* **Framework:** [Next.js 14](https://nextjs.org/) (React, App Router)
* **Dil:** TypeScript
* **Stil:** [Tailwind CSS](https://tailwindcss.com/)
* **HTTP İstemcisi:** Axios
* **İkonlar & Animasyonlar:** Lucide React, Framer Motion

### Backend (Sunucu)
* **Çatı (Framework):** [.NET 9](https://dotnet.microsoft.com/) / ASP.NET Core Web API
* **Dil:** C#
* **ORM:** Entity Framework Core
* **Veritabanı:** PostgreSQL
* **Doğrulama:** JWT (JSON Web Tokens)
* **Veri Doğrulama:** FluentValidation
* **AI Entegrasyonu:** Google Gemini Pro API

### DevOps & Araçlar
* **Konteynerleştirme:** Docker & Docker Compose
* **API Dökümantasyonu:** Swagger (OpenAPI)

---

## 🏗️ Sistem Mimarisi ve Klasör Yapısı

Projenin Backend kısmı, bakımı ve genişletilmesi kolay olan **N-Tier (Clean Architecture)** katmanlı mimarisine göre tasarlanmıştır:

```text
backend/
├── Portfolio.Domain/        # Temel varlıklar (Entities), Enumlar ve Repository arayüzleri
├── Portfolio.Application/   # İş kuralları, Servisler, DTO'lar ve FluentValidation kuralları
├── Portfolio.Infrastructure/# EF Core DB Context, Veritabanı Repository uygulamaları (UoW)
└── Portfolio.API/           # Controller'lar, Middleware'ler, CORS, Rate Limiting ve JWT ayarları

frontend/
├── src/
│   ├── app/                 # Next.js App Router (Site ve Admin klasörleri)
│   ├── components/          # Tekrar kullanılabilir React bileşenleri (Site, Admin, UI)
│   ├── context/             # React Context (Auth State Yönetimi)
│   ├── lib/                 # Araçlar, API istemcileri (Axios konfigürasyonları)
│   └── types/               # TypeScript tip tanımlamaları
```

---

## 🛡️ Güvenlik Yaklaşımı

Uygulamanın hem dışarıdan gelebilecek tehditlere karşı korunması hem de performansının düşmemesi için aşağıdaki güvenlik önlemleri alınmıştır:

1. **Rate Limiting (İstek Sınırlandırma):**
   * `/api/ai/chat`: Kötüye kullanımı ve fatura şişirmeyi engellemek için dakika başına 5 istek sınırı.
   * `/api/auth/login`: Brute-force (kaba kuvvet) saldırılarını engellemek için 5 dakikada maksimum 5 deneme.
2. **AI Prompt Injection Koruması:** Kullanıcı mesajları sistem prompt'undan ayrı bir rol olarak (user/model/user) gönderilir. Uzunluk limitleri ve yasaklı kelime kontrolleri aktiftir.
3. **JWT Güvenliği:** Token'lar HTTP-Only, Secure ve Strict SameSite özelliklerine sahip çerezler (Cookies) üzerinden yönetilir.
4. **CORS (Cross-Origin Resource Sharing):** Backend'e sadece belirtilen güvenilir Frontend domainlerinden (örn: localhost:3000) erişilebilir.
5. **Dosya Yükleme Kısıtlamaları:** Sunucuya yüklenen resim ve belgelere 5MB boyut limiti getirilmiş olup, uzantı ve MIME Type kontrolleri titizlikle yapılır.

---

## 🐳 Kurulum & Çalıştırma (Docker ile)

Projeyi bilgisayarınızda çalıştırmanın en kolay ve temiz yolu Docker kullanmaktır. 

### 1. Ön Koşullar
* Bilgisayarınızda **Docker Desktop**'ın kurulu ve çalışır durumda olduğundan emin olun.
* Eğer halihazırda yerel bilgisayarınızda PostgreSQL çalışıyorsa, bilgilerini el altında bulundurun.

### 2. Gerekli Ayarları Yapılandırma
Yapay zeka asistanının çalışabilmesi için bir **Google Gemini API Key** almanız gerekmektedir. 
* API Anahtarınızı `backend/Portfolio.API/appsettings.Development.json` dosyasına ekleyin.
* Eğer yerel makinenizde kurulu olan PostgreSQL veritabanınızı kullanmak isterseniz, `docker-compose.yml` dosyasındaki veritabanı ayarındaki `Host` kısmını `host.docker.internal` olarak bırakabilirsiniz. 

### 3. Konteynerleri Başlatma
Projenin ana dizininde (yani `docker-compose.yml` dosyasının bulunduğu yerde) bir terminal açıp şu komutu çalıştırın:

```bash
docker-compose up --build -d
```

* **Frontend Uygulaması:** `http://localhost:3000`
* **Backend Uygulaması (API):** `http://localhost:5024/api`
* **Swagger API Test Arayüzü:** `http://localhost:5024/swagger`

> **Önemli:** Veritabanınız boşsa endişelenmeyin! Backend ayağa kalktığında ilk çalışmada veritabanı tablolarını (Migration) ve demo verileri (Seed Data) otomatik olarak oluşturacaktır.

---

## 💻 Kurulum & Çalıştırma (Yerel Geliştirme)

Projeyi geliştirme amacıyla Docker olmadan çalıştırmak isterseniz:

### Backend (.NET 9)
```bash
cd backend/Portfolio.API
# appsettings.Development.json içindeki ConnectionString'i kendi PostgreSQL bilginize göre düzenleyin.
dotnet restore
dotnet run
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Yönetici Paneli Girişi

Projeyi ayağa kaldırdıktan sonra yönetim paneline erişmek için:
- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Otomatik olarak oluşturulan Seed Data içindeki admin bilgilerini kullanarak sisteme giriş yapabilir ve portfolyonuzu özelleştirmeye başlayabilirsiniz.

---

## 📡 API Uç Noktaları (Endpoints)

| HTTP Metodu | Uç Nokta (Endpoint) | Açıklama | Yetki (Auth) |
|-------------|---------------------|-----------|--------------|
| `POST`      | `/api/auth/login` | Yönetici girişi yapar ve JWT döner. | ❌ Yok |
| `POST`      | `/api/ai/chat` | Ziyaretçilerin sorularını yanıtlar. | ❌ Yok |
| `GET`       | `/api/projects` | Tüm projeleri listeler. | ❌ Yok |
| `POST/PUT`  | `/api/projects` | Yeni proje ekler veya günceller. | ✅ Yönetici |
| `GET`       | `/api/user/profile` | Profil bilgilerini (Özgeçmiş) getirir. | ❌ Yok |
| `PUT`       | `/api/user/profile` | Profil bilgilerini günceller. | ✅ Yönetici |
| `POST`      | `/api/upload` | Sunucuya resim/PDF yükler ve URL döner. | ✅ Yönetici |

*(Tüm endpointlerin detaylarını `http://localhost:5024/swagger` adresinden inceleyebilirsiniz.)*

---

> Bu proje, temiz kod yazımı, modern güvenlik standartları ve tam kapsamlı "Full-Stack" yetkinliklerini sergilemek amacıyla özel olarak tasarlanıp kodlanmıştır. İlham verici kodlamalar! ☕
