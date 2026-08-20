# Ariza → Telegram: sozlash

Ariza formasi to'ldirilib "Arizani yuborish" bosilganda barcha javoblar
Telegram chatiga tushadi. Bot tokeni faqat serverda o'qiladi — na git'da,
na brauzerda, na prod bundle'ida ko'rinmaydi.

## 1. Paketlarni o'rnatish

```bash
npm install
```

Ikkita yangi paket qo'shildi:

- `@vercel/blob` — video faylni brauzerdan to'g'ridan-to'g'ri bulutga yuklash
- `server-only` — token bilan ishlaydigan modul brauzerga tushib qolsa,
  build **xato** beradi (himoya qatlami)

## 2. Bot va chat

1. Telegramda [@BotFather](https://t.me/BotFather) → `/newbot` → tokenni oling
   (`1234567890:AAG...` ko'rinishida).
2. Arizalar tushadigan guruh yarating, botni guruhga qo'shing va **admin**
   qiling.
3. Chat ID ni oling: guruhga bitta xabar yozib, quyidagini oching —
   `https://api.telegram.org/bot<TOKEN>/getUpdates` → `chat.id` qiymatini
   nusxalang. Guruh ID odatda `-100...` bilan boshlanadi.

## 3. Lokal `.env.local`

Loyiha ildizida `.env.local` fayl yarating (`.env.example` dan nusxa oling):

```bash
cp .env.example .env.local
```

va qiymatlarni to'ldiring:

```
TELEGRAM_BOT_TOKEN=1234567890:AAG...
TELEGRAM_CHAT_ID=-1001234567890
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

`.env.local` `.gitignore` orqali git'ga **hech qachon** tushmaydi.

## 4. Vercel Blob (video uchun)

Vercel → loyihangiz → **Storage** → **Create Database** → **Blob**.
Yaratilgach `BLOB_READ_WRITE_TOKEN` avtomatik ravishda loyiha env'iga
qo'shiladi. Lokal ishlash uchun:

```bash
npx vercel link
npx vercel env pull .env.local
```

## 5. Prod (Vercel)

Vercel → Project → **Settings → Environment Variables** ga qo'shing:

| Nomi | Qiymat | Environment |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather bergan token | Production, Preview, Development |
| `TELEGRAM_CHAT_ID` | Guruh yoki chat ID | Production, Preview, Development |
| `TELEGRAM_THREAD_ID` | (ixtiyoriy) forum-guruh topic ID | — |
| `BLOB_READ_WRITE_TOKEN` | Blob store yaratilganda avtomatik qo'shiladi | — |

Keyin **Redeploy** qiling — env o'zgarishi eski deploy'ga tegmaydi.

> Vercel'da env qiymatlari yaratilgandan keyin dashboard'da ham ochib
> ko'rsatilmaydi (faqat almashtirish mumkin), shuning uchun token hech kimga
> ko'rinmaydi.

## Token qayerda ishlaydi va qayerda ishlamaydi

| | Token ko'rinadimi? |
|---|---|
| `.env.local` (lokal kompyuter) | ✅ faqat sizda |
| Git / GitHub | ❌ `.gitignore` bloklaydi |
| Brauzer bundle (`.next/static`) | ❌ `NEXT_PUBLIC_` yo'q → tushmaydi |
| `/api/apply` javobi | ❌ hech qachon qaytarilmaydi |
| Server loglari | ❌ xato matnida token bo'lmaydi |

`src/lib/telegram.server.ts` fayli `import "server-only"` bilan boshlanadi —
kimdir uni xato bilan client komponentga import qilsa, build yiqiladi.

## Qanday ishlaydi

```
Brauzer                          Server                      Tashqi
───────                          ──────                      ──────
video tanlanadi
   └─ POST /api/apply/upload  →  1 soatlik, faqat video,
                                 maks 100MB token beradi
   ← token
   └─ fayl to'g'ridan-to'g'ri  ─────────────────────────→  Vercel Blob
      yuklanadi (progress bar)                             (URL qaytadi)

"Arizani yuborish"
   └─ POST /api/apply         →  qayta tekshiradi,
       (JSON + video URL)        xabarni yig'adi        →  Telegram Bot API
                              ←  { ok: true }
```

Video fayl API route'dan **o'tmaydi** — shuning uchun Vercel'ning 4.5MB
so'rov limiti to'sqinlik qilmaydi va 100MB'gacha video muammosiz yuklanadi.
Fayl 20MB'dan kichik bo'lsa, Telegram uni chatga video sifatida ham tortadi;
kattaroq bo'lsa xabarda yuklab olish havolasi bo'ladi.

## Xavfsizlik choralari

- **Honeypot** — botlar to'ldiradigan yashirin maydon; to'lgan ariza jimgina
  tashlab yuboriladi.
- **Rate limit** — bitta IP 10 daqiqada 5 tadan ko'p ariza yubora olmaydi.
- **Server-side validatsiya** — brauzerdagi tekshiruv faqat qulaylik uchun;
  haqiqiy qoida serverda qayta ishlaydi.
- **Label'lar serverdan** — Telegram xabaridagi savol matnlari locale
  fayllardan olinadi, mijoz yuborgan ma'lumotdan emas. Sahifani tahrirlab
  soxta xabar yuborib bo'lmaydi.
- **Video URL tekshiruvi** — faqat `*.vercel-storage.com` havolasi qabul
  qilinadi.
- **HTML escape** — foydalanuvchi kiritgan matn Telegram razmetkasini buza
  olmaydi.

## Tekshirish

```bash
npm run dev
```

Formani to'ldirib yuboring. Xatolik bo'lsa, terminal logida `[apply]` bilan
boshlanuvchi qatorga qarang (u yerda ham token ko'rsatilmaydi).
