# AI-Powered Aplikacja SaaS z Integracją Cloudinary

## 🚀 O Projekcie

Profesjonalna platforma SaaS wykorzystująca sztuczną inteligencję do zaawansowanej obróbki i zarządzania obrazami w chmurze. Aplikacja umożliwia użytkownikom przesyłanie, przechowywanie i inteligentne przetwarzanie obrazów z wykorzystaniem usługi Cloudinary, oferując bogaty zestaw funkcji AI do analizy i optymalizacji multimediów.

## ✨ Funkcjonalności

- **Inteligentne przetwarzanie obrazów** z wykorzystaniem AI
- **Automatyczne tagowanie** i kategoryzacja treści
- **Optymalizacja obrazów** pod kątem wydajności
- **Bezpieczne przechowywanie** w chmurze
- **Intuicyjny interfejs użytkownika** zbudowany w Next.js
- **Skalowalna baza danych** z wykorzystaniem NeonDB
- **Nowoczesny design** dzięki DaisyUI

## 🛠️ Technologie

- **Frontend**: Next.js 14 (App Router)
- **Stylowanie**: Tailwind CSS + DaisyUI
- **Baza danych**: PostgreSQL (NeonDB)
- **ORM**: Prisma
- **Autoryzacja**: NextAuth.js
- **Przechowywanie plików**: Cloudinary
- **Deployment**: Vercel
- **Język programowania**: TypeScript

## 🚀 Rozpoczęcie pracy

### Wymagania wstępne

- Node.js 18+
- Konto Cloudinary
- Konto NeonDB (lub lokalna instancja PostgreSQL)
- Konto Vercel (opcjonalnie, do wdrożenia)

### Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/jakubSerok/ai-saas.git
   cd ai-saas
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   # lub
   yarn install
   ```

3. Skonfiguruj zmienne środowiskowe:
   ```env
   DATABASE_URL="twoj-connection-string-do-neon"
   CLOUDINARY_CLOUD_NAME="twoj-cloud-name"
   CLOUDINARY_API_KEY="twoj-api-key"
   CLOUDINARY_API_SECRET="twoj-api-secret"
   NEXTAUTH_SECRET="losowy-ciąg-znaków"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Zastosuj migracje bazy danych:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   # lub
   yarn dev
   ```

## 🌐 Wdrożenie

Aplikacja jest gotowa do wdrożenia na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftwoja-nazwa%2Fai-saas)

## 📄 Licencja

Ten projekt jest objęty licencją MIT. Szczegóły znajdują się w pliku [LICENSE](LICENSE).


