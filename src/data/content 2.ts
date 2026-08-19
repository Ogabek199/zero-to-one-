/**
 * Central content source for the whole site.
 * All copy lives here per-locale so the RU / UZ / EN switcher stays in sync
 * and sections never hardcode strings. Add a language by adding a key.
 */

export type Locale = "ru" | "uz" | "en";

export const LOCALES: Locale[] = ["ru", "uz", "en"];
export const DEFAULT_LOCALE: Locale = "uz";

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureItem {
  index: string;
  title: string;
  body: string;
}

export interface TimelineItem {
  index: string;
  title: string;
  meta: string;
}

export interface ChecklistItem {
  index: string;
  body: string;
}

/* ------------------------------------------------------------------ */
/*  Application form (multi-step modal)                                */
/* ------------------------------------------------------------------ */

export type ApplyStepKind =
  | "fields"
  | "textarea"
  | "checklist"
  | "video"
  | "links";

export interface ApplyFieldDef {
  key: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "tel";
}

export interface ApplyVideoCopy {
  label: string;
  dropTitle: string;
  dropHint: string;
  uploadBtn: string;
  or: string;
  linkLabel: string;
  linkPlaceholder: string;
}

export interface ApplyStep {
  kind: ApplyStepKind;
  /** Section badge, e.g. "1-BLOK · SIZ KIMSIZ". */
  block: string;
  title: string;
  sublabel?: string;
  /** Small "optional" tag rendered under the title. */
  optional?: string;
  /** For kind "fields" / "links". */
  fields?: ApplyFieldDef[];
  /** For kind "textarea". */
  placeholder?: string;
  /** For kind "checklist". */
  options?: string[];
  note?: string;
  /** For kind "video". */
  video?: ApplyVideoCopy;
}

export interface ApplyContent {
  modalTitle: string;
  intro: { badge: string; body: string[]; start: string };
  steps: ApplyStep[];
  nav: { back: string; next: string; submit: string };
  success: { title: string; body: string; close: string };
}

export interface Content {
  nav: { program: string; terms: string };
  menu: { program: string; terms: string };
  hero: {
    titleTop: string;
    titleBottom: string;
    body: string;
    cta: string;
    note: string;
  };
  stats: StatItem[];
  features: FeatureItem[];
  timeline: TimelineItem[];
  notACourse: {
    heading: string;
    forYouTitle: string;
    forYou: ChecklistItem[];
    notForYouTitle: string;
    notForYou: ChecklistItem[];
    verdictLead: string;
    verdictAccent: string;
    verdictTail: string;
  };
  cta: {
    titleTop: string;
    titleBottom: string;
    body: string;
    button: string;
  };
  footer: {
    tagline: string;
    telegram: string;
    instagram: string;
    rights: string;
  };
  apply: ApplyContent;
}

export const CONTENT: Record<Locale, Content> = {
  uz: {
    nav: { program: "Dastur", terms: "Shartlar" },
    menu: { program: "DASTUR", terms: "SHARTLAR" },
    hero: {
      titleTop: "Biz startaplarga o'qitmaymiz",
      titleBottom: "Biz ularni sizbilon birga quramiz.",
      body: "40 kun davomida siz loyihasini MVP va birinchi sotuvlargacha olib borasiz. Eng yaxshilari 10 000 dan 100 000 dollaragucha investitsiya oladi.",
      cta: "Ariza topshirish",
      note: "Qatnashish - bepul. Muddati — 22.22.2026.",
    },
    stats: [
      { value: "40 kun", label: "Oflayn, to'liq ish vaqti" },
      { value: "$10–100K", label: "Natijalar asosida investitsiya" },
      { value: "0 so'm", label: "Bizga hech qanday to'lovlar yo'q" },
      { value: "20", label: "Jamoa - va ortiqcha hech nima yo'q" },
    ],
    features: [
      {
        index: "01",
        title: "Jamoa ichida operator",
        body: "Lektsiyalar emas. O'z treker va mentorlar - ular o'zlari qurilib sotdilar, har hafta sizbilon ishlaydi: vorkshoplar, shaxsiy office hours, sizning raqamlaringizni tahlil. Plyus ofis, mutaxassislar va yuriskonsultlar - bepul.",
      },
      {
        index: "02",
        title: "Ochiq reyting",
        body: "Har juma kuni barcha jamoalarning raqamlari barcha ko'radi. Trekshn qolgan qismdan ikki marta vazni ko'p. Chiroyli slaydlar - nol. Yuqori ko'rsatilgan raqamlar - ban, takroriy - chetlashtirilish.",
      },
      {
        index: "03",
        title: "Natija asosida investitsiya",
        body: "40 kun davomida 10 000 dan 100 000 dollaragucha - daromad va mijozlarga etib borgan jamoalarga. Qaror raqamlar asosida qilinadi. Natija bo'lmagan jamoa hech nima olmaydi.",
      },
    ],
    timeline: [
      { index: "01", title: "G'oya", meta: "1-kun" },
      { index: "02", title: "MVP ishga tushirildi", meta: "3-hafta" },
      { index: "03", title: "Birinchi daromad", meta: "4-hafta" },
      { index: "04", title: "Demo kun va investitsiya", meta: "6-hafta" },
    ],
    notACourse: {
      heading: "Bu kurs emas.",
      forYouTitle: "Qo'llan, agar",
      forYou: [
        {
          index: "01",
          body: "Siz allaqachon g'oyaga o'zingiz vaqt yoki pul sarflagan - va uni bizbilon yoki bizsiz qurasiz.",
        },
        {
          index: "02",
          body: "Siz 40 kun to'liq ish vaqtiga tayyor va sizning raqamlaringiz har hafta barcha ko'rishi qabul qilasiz.",
        },
        {
          index: "03",
          body: "Sizga tanqid qiluvchi, ammo olovlanmaydigun sheriklar kerak.",
        },
      ],
      notForYouTitle: "Qo'llan masalan agar",
      notForYou: [
        {
          index: "01",
          body: "Siz bepul ofis, mentorshib yoki sertifikat uchun keldingiz.",
        },
        {
          index: "02",
          body: "Sizning g'oyangiz taqdimot - va siz boshlanishga ruhsat kutayapsiz.",
        },
        {
          index: "03",
          body: "Siz avansot pulga hisob qilsangiz. Bu yerda investitsiya earned.",
        },
      ],
      verdictLead: "Deyarli barcha rad etishlarning sababi bitta: ",
      verdictAccent:
        "Founder dasturni o'z kompaniyasidan ko'ra ko'proo xohladi.",
      verdictTail: " Bizga aksini ko'rsating.",
    },
    cta: {
      titleTop: "Buning har holda qurasiz",
      titleBottom: "Biz faqat tezlashtiramiz.",
      body: "Ariza 2-3 soat vaqt oladi. Siz allaqachon nima qilgangiz va mijozlardan nima o'rgangingizni ko'rsating. Bu birinchi filter.",
      button: "Arizani boshlash",
    },
    footer: {
      tagline: "Eng sodda g'oya eng kuchli bo'ladi",
      telegram: "Telegram",
      instagram: "Instagram",
      rights: "© 2026 Zero to One",
    },
    apply: {
      modalTitle: "Ariza topshirish",
      intro: {
        badge: "Boshlashdan oldin",
        body: [
          "Ariza 2-3 soat oladi. Bu ataylab shunday: u dasturning birinchi filtri. Aniq javob bering — ismlar, raqamlar, havolalar. Chiroyli iboralar baholanmaydi, qilingan ish baholanadi.",
          "Qoralama avtomatik saqlanadi — formani yopib, keyinroq qaytishingiz mumkin.",
        ],
        start: "Arizani boshlash",
      },
      steps: [
        {
          kind: "fields",
          block: "1-blok · Siz kimsiz",
          title: "Ism va familiya",
          fields: [
            { key: "name", label: "Ism va familiya", placeholder: "Rahim Ahmedov" },
          ],
        },
        {
          kind: "fields",
          block: "1-blok · Siz kimsiz",
          title: "Telefon va Telegram",
          fields: [
            { key: "phone", label: "Telefon", placeholder: "+998 90 123 45 67", type: "tel" },
            { key: "telegram", label: "Telegram", placeholder: "@yourusername" },
          ],
        },
        {
          kind: "fields",
          block: "1-blok · Siz kimsiz",
          title: "Shahar",
          fields: [{ key: "city", label: "Shahar", placeholder: "Toshkent" }],
        },
        {
          kind: "textarea",
          block: "1-blok · Siz kimsiz",
          title: "Jamoa",
          optional: "Ixtiyoriy",
          sublabel:
            "Jamoada yana kim bor? Ism, rol, bandlik (to'liq/qisman). Yolg'iz bo'lsangiz — shunday yozing, bu minus emas.",
          placeholder:
            "Masalan: Alisa (dizayn, to'liq bandlik), Botir (marketing, qisman)",
        },
        {
          kind: "textarea",
          block: "2-blok · Nima qurayapsiz",
          title: "Startapni bitta jumlada",
          sublabel:
            "Nima qilasiz, kim uchun va nima uchun mavjudidan yaxshi? Bitta jumla.",
          placeholder:
            "Masalan: Taksi haydovchilari uchun buyurtmalarni avtomatlashtirish va real vaqtda hisob-kitob qiluvchi CRM.",
        },
        {
          kind: "textarea",
          block: "2-blok · Nima qurayapsiz",
          title: "Mijoz va unga kirish",
          sublabel:
            "Mijozingiz kim — aniq rol, segment? Va shu oyning o'zida birinchi 10 kishiga qanday yetib borasiz — kanallar, joylar, tanishlar?",
          placeholder:
            "Masalan: Mijoz: Toshkentdagi taksi haydovchilari (25-45 yosh, mustaqil ishlaydi). Kirish: Yandex Go forumi, mahalliy haydovchilar chatlari, amakim 3 ta haydovchini taniydi.",
        },
        {
          kind: "textarea",
          block: "2-blok · Nima qurayapsiz",
          title: "Allaqachon nima qilingan",
          sublabel:
            "Bu g'oya uchun nima qurdingiz, sarfladingiz yoki sotdingiz? Aniq: soatlar, pul, prototip havolasi, mijozlar yoki suhbatlar soni. «Hozircha hech narsa» — ham halol javob.",
          placeholder:
            "Masalan: Prototipga 60 soat sarfladim, Figma va hosting uchun 500 ming so'm. 8 ta haydovchiga ko'rsatdim, uchtasiga yoqdi.",
        },
        {
          kind: "textarea",
          block: "2-blok · Nima qurayapsiz",
          title: "Mijozlar bilan oxirgi uchta suhbat",
          sublabel:
            "Haqiqiy potensial mijozlar bilan oxirgi uchta suhbatni yozing: kim bilan gaplashdingiz (rol), ular aynan nima dedi, siz nimani tushundingiz. Suhbat bo'lmagan bo'lsa — halol yozing va shu hafta kim bilan gaplashishingizni tushuntiring.",
          placeholder:
            "Masalan:\n1. Akbar (haydovchi): «Hozir sayohatlarni hisobga olish uchun butun kunni yo'qotaman.» → Tushundim: muammo bor, avtomatlashtirish kerak.\n2. Samarbek: «Menda Excel jadvali bor, lekin unda xatolar bor.» → mijoz bo'lishi mumkin, lekin avval ko'rinish kerak.\n3. Hali suhbat qilmadim. Shu hafta Telegram orqali Nina bilan gaplashaman.",
        },
        {
          kind: "textarea",
          block: "2-blok · Nima qurayapsiz",
          title: "Birinchi daromad",
          sublabel:
            "Yaqin 6 oyda birinchi pul qayerdan keladi? Kim to'laydi, nima uchun, birinchi narx.",
          placeholder:
            "Haydovchilar avtomatlashtirish uchun oyiga $2 obuna to'laydi. Birinchi mijoz — mening tanishim Akbar (sentyabrda boshlanadi).",
        },
        {
          kind: "textarea",
          block: "2-blok · Nima qurayapsiz",
          title: "Agar rad etsak",
          sublabel: "Agar biz sizga rad javobini bersak, nima qilasiz?",
          placeholder:
            "Baribir quraman. Sentyabr uchun hosting bilan allaqachon kelishdim, marketing uchun $1500 yig'dim, yozga 20 ta suhbat rejalashtirdim.",
        },
        {
          kind: "checklist",
          block: "3-blok · Shartlar",
          title: "Ishtirok shartlari",
          options: [
            "Tushunaman: 40 kun — bu oflayn to'liq bandlik, parallel ish va o'qishsiz.",
            "Ommaviy reyting va halol raqamlar qoidasini qilaman: bo'rttirilgan ko'rsatkichlar — ban, takrorlansa — chetlatish.",
            "Tushunaman: dasturning birinchi kunigacha — pre-work, shablon bo'yicha mijozlar bilan 5 ta suhbat.",
            "Tushunaman: $10-100K sarmoya — yakunda va natija uchun, kafolatlanmagan va avans berilmaydi.",
          ],
          note:
            "Har bir checkbox — psixologik va yuridik tasdiq. Tayyor bo'lmaganlar shu yerda, intervyudan oldin ajraladi.",
        },
        {
          kind: "video",
          block: "4-blok · Video",
          title: "Video · 2 daqiqa",
          sublabel:
            "Montajsiz 2 daqiqa yozing, telefon kamerasi yetarli, uchta tildan istalganida. Ikkita savol: nega bu muammoni aynan siz hal qilishingiz kerak? Oxirgi 30 kunda yechimga yaqinlashish uchun nima qildingiz?",
          video: {
            label: "Video",
            dropTitle: "Faylni tanlang yoki bu yerga tashlang",
            dropHint: "MP4, MOV (maks. 500MB)",
            uploadBtn: "Yuklash",
            or: "Yoki",
            linkLabel: "Yoki havola joylashtiring",
            linkPlaceholder: "YouTube (unlisted) yoki Google Drive — havola",
          },
        },
        {
          kind: "links",
          block: "5-blok · Havolalar",
          title: "Havolalar",
          optional: "Ixtiyoriy",
          fields: [
            { key: "link_proto", label: "Prototip yoki lending", placeholder: "https://..." },
            { key: "link_pitch", label: "Pitch-dek", placeholder: "https://..." },
            { key: "link_metrics", label: "Metrikalar skrinshoti yoki repozitoriy", placeholder: "https://..." },
          ],
        },
      ],
      nav: { back: "Orqaga", next: "Keyingisi", submit: "Arizani yuborish" },
      success: {
        title: "Ariza qabul qilindi",
        body: "Rahmat! Arizangizni qabul qildik. Arizangiz hozirda ko'rib chiqilmoqda. Tekshiruv yakunlangach, natija haqida sizga xabar beramiz.",
        close: "Yopish",
      },
    },
  },

  ru: {
    nav: { program: "Программа", terms: "Условия" },
    menu: { program: "ПРОГРАММА", terms: "УСЛОВИЯ" },
    hero: {
      titleTop: "Мы не учим стартапы",
      titleBottom: "Мы строим их вместе с вами.",
      body: "За 40 дней вы доведёте проект до MVP и первых продаж. Лучшие получают инвестиции от 10 000 до 100 000 долларов.",
      cta: "Подать заявку",
      note: "Участие — бесплатно. Срок — 22.22.2026.",
    },
    stats: [
      { value: "40 дней", label: "Офлайн, полная занятость" },
      { value: "$10–100K", label: "Инвестиции по результату" },
      { value: "0 сум", label: "Никаких платежей нам" },
      { value: "20", label: "Команд — и ничего лишнего" },
    ],
    features: [
      {
        index: "01",
        title: "Операторы внутри команды",
        body: "Не лекции. Свои трекеры и менторы — они сами строили и продавали, работают с вами каждую неделю: воркшопы, личные office hours, разбор ваших цифр. Плюс офис, специалисты и юристы — бесплатно.",
      },
      {
        index: "02",
        title: "Открытый рейтинг",
        body: "Каждую пятницу цифры всех команд видят все. Трекшн весит вдвое больше остального. Красивые слайды — ноль. Завышенные цифры — бан, повтор — исключение.",
      },
      {
        index: "03",
        title: "Инвестиции по результату",
        body: "За 40 дней от 10 000 до 100 000 долларов — командам, дошедшим до выручки и клиентов. Решение принимается по цифрам. Команда без результата не получает ничего.",
      },
    ],
    timeline: [
      { index: "01", title: "Идея", meta: "1-й день" },
      { index: "02", title: "MVP запущен", meta: "3-я неделя" },
      { index: "03", title: "Первая выручка", meta: "4-я неделя" },
      { index: "04", title: "Демо-день и инвестиции", meta: "6-я неделя" },
    ],
    notACourse: {
      heading: "Это не курс.",
      forYouTitle: "Подойдёт, если",
      forYou: [
        {
          index: "01",
          body: "Вы уже вложили в идею своё время или деньги — и построите её с нами или без нас.",
        },
        {
          index: "02",
          body: "Вы готовы к 40 дням полной занятости и к тому, что ваши цифры каждую неделю видят все.",
        },
        {
          index: "03",
          body: "Вам нужны партнёры, которые критикуют, но не раздувают.",
        },
      ],
      notForYouTitle: "Не подойдёт, если",
      notForYou: [
        {
          index: "01",
          body: "Вы пришли за бесплатным офисом, менторством или сертификатом.",
        },
        {
          index: "02",
          body: "Ваша идея — презентация, и вы ждёте разрешения начать.",
        },
        {
          index: "03",
          body: "Вы рассчитываете на аванс. Здесь инвестиции зарабатываются.",
        },
      ],
      verdictLead: "Почти у всех отказов одна причина: ",
      verdictAccent:
        "фаундер хотел программу больше, чем свою компанию.",
      verdictTail: " Покажите нам обратное.",
    },
    cta: {
      titleTop: "Вы построите это в любом случае",
      titleBottom: "Мы лишь ускоряем.",
      body: "Заявка занимает 2–3 часа. Покажите, что вы уже сделали и что узнали от клиентов. Это первый фильтр.",
      button: "Начать заявку",
    },
    footer: {
      tagline: "Самая простая идея — самая сильная",
      telegram: "Telegram",
      instagram: "Instagram",
      rights: "© 2026 Zero to One",
    },
    apply: {
      modalTitle: "Подать заявку",
      intro: {
        badge: "Перед началом",
        body: [
          "Заявка занимает 2–3 часа. Это сделано намеренно: это первый фильтр программы. Отвечайте конкретно — имена, цифры, ссылки. Красивые формулировки не оцениваются, оценивается сделанная работа.",
          "Черновик сохраняется автоматически — можно закрыть форму и вернуться позже.",
        ],
        start: "Начать заявку",
      },
      steps: [
        {
          kind: "fields",
          block: "Блок 1 · Кто вы",
          title: "Имя и фамилия",
          fields: [
            { key: "name", label: "Имя и фамилия", placeholder: "Рахим Ахмедов" },
          ],
        },
        {
          kind: "fields",
          block: "Блок 1 · Кто вы",
          title: "Телефон и Telegram",
          fields: [
            { key: "phone", label: "Телефон", placeholder: "+998 90 123 45 67", type: "tel" },
            { key: "telegram", label: "Telegram", placeholder: "@yourusername" },
          ],
        },
        {
          kind: "fields",
          block: "Блок 1 · Кто вы",
          title: "Город",
          fields: [{ key: "city", label: "Город", placeholder: "Ташкент" }],
        },
        {
          kind: "textarea",
          block: "Блок 1 · Кто вы",
          title: "Команда",
          optional: "Необязательно",
          sublabel:
            "Кто ещё в команде? Имя, роль, занятость (полная/частичная). Если вы один — так и напишите, это не минус.",
          placeholder:
            "Например: Алиса (дизайн, полная занятость), Ботир (маркетинг, частичная)",
        },
        {
          kind: "textarea",
          block: "Блок 2 · Что вы строите",
          title: "Стартап в одном предложении",
          sublabel:
            "Что вы делаете, для кого и почему это лучше существующего? Одно предложение.",
          placeholder:
            "Например: CRM для таксистов, которая автоматизирует заказы и ведёт учёт в реальном времени.",
        },
        {
          kind: "textarea",
          block: "Блок 2 · Что вы строите",
          title: "Клиент и доступ к нему",
          sublabel:
            "Кто ваш клиент — конкретная роль, сегмент? И как вы дойдёте до первых 10 человек уже в этом месяце — каналы, места, знакомые?",
          placeholder:
            "Например: Клиент: таксисты Ташкента (25–45 лет, работают сами). Доступ: форум Yandex Go, местные чаты водителей, мой дядя знает 3 водителей.",
        },
        {
          kind: "textarea",
          block: "Блок 2 · Что вы строите",
          title: "Что уже сделано",
          sublabel:
            "Что вы построили, потратили или продали ради этой идеи? Конкретно: часы, деньги, ссылка на прототип, число клиентов или разговоров. «Пока ничего» — тоже честный ответ.",
          placeholder:
            "Например: Потратил на прототип 60 часов, 500 тыс. сум на Figma и хостинг. Показал 8 водителям, троим понравилось.",
        },
        {
          kind: "textarea",
          block: "Блок 2 · Что вы строите",
          title: "Три последних разговора с клиентами",
          sublabel:
            "Запишите три последних разговора с реальными потенциальными клиентами: с кем говорили (роль), что именно они сказали, что вы поняли. Если разговоров не было — напишите честно и объясните, с кем поговорите на этой неделе.",
          placeholder:
            "Например:\n1. Акбар (водитель): «Сейчас теряю целый день на учёт поездок.» → Понял: проблема есть, нужна автоматизация.\n2. Самарбек: «У меня есть таблица в Excel, но в ней ошибки.» → может стать клиентом, но сначала нужен вид.\n3. Ещё не говорил. На этой неделе свяжусь с Ниной через Telegram.",
        },
        {
          kind: "textarea",
          block: "Блок 2 · Что вы строите",
          title: "Первая выручка",
          sublabel:
            "Откуда придут первые деньги в ближайшие 6 месяцев? Кто платит, за что, первая цена.",
          placeholder:
            "Водители платят $2 в месяц за автоматизацию. Первый клиент — мой знакомый Акбар (начинает в сентябре).",
        },
        {
          kind: "textarea",
          block: "Блок 2 · Что вы строите",
          title: "Если мы откажем",
          sublabel: "Если мы вам откажем, что вы будете делать?",
          placeholder:
            "Всё равно построю. На сентябрь уже договорился о хостинге, собрал $1500 на маркетинг, запланировал 20 разговоров на лето.",
        },
        {
          kind: "checklist",
          block: "Блок 3 · Условия",
          title: "Условия участия",
          options: [
            "Понимаю: 40 дней — это офлайн полная занятость, без параллельной работы и учёбы.",
            "Соблюдаю правило открытого рейтинга и честных цифр: завышенные показатели — бан, повтор — исключение.",
            "Понимаю: до первого дня программы — pre-work, 5 разговоров с клиентами по шаблону.",
            "Понимаю: инвестиции $10–100K — в конце и по результату, не гарантированы и без аванса.",
          ],
          note:
            "Каждый чекбокс — психологическое и юридическое подтверждение. Неготовые отсеиваются здесь, до интервью.",
        },
        {
          kind: "video",
          block: "Блок 4 · Видео",
          title: "Видео · 2 минуты",
          sublabel:
            "Запишите 2 минуты без монтажа, хватит камеры телефона, на любом из трёх языков. Два вопроса: почему именно вы должны решить эту проблему? Что вы сделали за последние 30 дней, чтобы приблизиться к решению?",
          video: {
            label: "Видео",
            dropTitle: "Выберите файл или перетащите сюда",
            dropHint: "MP4, MOV (макс. 500MB)",
            uploadBtn: "Загрузить",
            or: "Или",
            linkLabel: "Или вставьте ссылку",
            linkPlaceholder: "YouTube (unlisted) или Google Drive — ссылка",
          },
        },
        {
          kind: "links",
          block: "Блок 5 · Ссылки",
          title: "Ссылки",
          optional: "Необязательно",
          fields: [
            { key: "link_proto", label: "Прототип или лендинг", placeholder: "https://..." },
            { key: "link_pitch", label: "Питч-дек", placeholder: "https://..." },
            { key: "link_metrics", label: "Скриншот метрик или репозиторий", placeholder: "https://..." },
          ],
        },
      ],
      nav: { back: "Назад", next: "Далее", submit: "Отправить заявку" },
      success: {
        title: "Заявка получена",
        body: "Спасибо! Мы получили вашу заявку. Сейчас она на рассмотрении. Как только проверка завершится, мы сообщим вам результат.",
        close: "Закрыть",
      },
    },
  },

  en: {
    nav: { program: "Program", terms: "Terms" },
    menu: { program: "PROGRAM", terms: "TERMS" },
    hero: {
      titleTop: "We don't teach startups",
      titleBottom: "We build them with you.",
      body: "In 40 days you'll take your project to an MVP and first sales. The best receive investment from $10,000 to $100,000.",
      cta: "Apply now",
      note: "Participation is free. Deadline — 22.22.2026.",
    },
    stats: [
      { value: "40 days", label: "Offline, full-time" },
      { value: "$10–100K", label: "Investment based on results" },
      { value: "$0", label: "No payments to us" },
      { value: "20", label: "Teams — and nothing extra" },
    ],
    features: [
      {
        index: "01",
        title: "Operators inside the team",
        body: "Not lectures. Trackers and mentors who built and sold themselves, working with you every week: workshops, personal office hours, a breakdown of your numbers. Plus office, specialists and lawyers — free.",
      },
      {
        index: "02",
        title: "Open leaderboard",
        body: "Every Friday every team's numbers are visible to all. Traction weighs twice as much as everything else. Pretty slides — zero. Inflated numbers get a ban, repeats get you removed.",
      },
      {
        index: "03",
        title: "Investment based on results",
        body: "Over 40 days, $10,000 to $100,000 — for teams that reach revenue and customers. Decisions are made on the numbers. A team with no result gets nothing.",
      },
    ],
    timeline: [
      { index: "01", title: "Idea", meta: "Day 1" },
      { index: "02", title: "MVP launched", meta: "Week 3" },
      { index: "03", title: "First revenue", meta: "Week 4" },
      { index: "04", title: "Demo day & investment", meta: "Week 6" },
    ],
    notACourse: {
      heading: "This is not a course.",
      forYouTitle: "Apply if",
      forYou: [
        {
          index: "01",
          body: "You've already spent your own time or money on the idea — and you'll build it with us or without us.",
        },
        {
          index: "02",
          body: "You're ready for 40 days full-time and for your numbers to be seen by everyone every week.",
        },
        {
          index: "03",
          body: "You want partners who criticize but don't hype.",
        },
      ],
      notForYouTitle: "Don't apply if",
      notForYou: [
        {
          index: "01",
          body: "You came for a free office, mentorship or a certificate.",
        },
        {
          index: "02",
          body: "Your idea is a presentation and you're waiting for permission to start.",
        },
        {
          index: "03",
          body: "You're counting on an advance. Here investment is earned.",
        },
      ],
      verdictLead: "Almost every rejection has one reason: ",
      verdictAccent:
        "the founder wanted the program more than their own company.",
      verdictTail: " Show us the opposite.",
    },
    cta: {
      titleTop: "You'll build this anyway",
      titleBottom: "We only accelerate.",
      body: "The application takes 2–3 hours. Show what you've already done and what you learned from customers. This is the first filter.",
      button: "Start application",
    },
    footer: {
      tagline: "The simplest idea is the strongest",
      telegram: "Telegram",
      instagram: "Instagram",
      rights: "© 2026 Zero to One",
    },
    apply: {
      modalTitle: "Apply now",
      intro: {
        badge: "Before you start",
        body: [
          "The application takes 2–3 hours. That's on purpose: it's the program's first filter. Answer concretely — names, numbers, links. Pretty phrasing isn't scored, the work you've done is.",
          "Your draft is saved automatically — you can close the form and come back later.",
        ],
        start: "Start application",
      },
      steps: [
        {
          kind: "fields",
          block: "Block 1 · Who you are",
          title: "Full name",
          fields: [
            { key: "name", label: "Full name", placeholder: "Rahim Ahmedov" },
          ],
        },
        {
          kind: "fields",
          block: "Block 1 · Who you are",
          title: "Phone and Telegram",
          fields: [
            { key: "phone", label: "Phone", placeholder: "+998 90 123 45 67", type: "tel" },
            { key: "telegram", label: "Telegram", placeholder: "@yourusername" },
          ],
        },
        {
          kind: "fields",
          block: "Block 1 · Who you are",
          title: "City",
          fields: [{ key: "city", label: "City", placeholder: "Tashkent" }],
        },
        {
          kind: "textarea",
          block: "Block 1 · Who you are",
          title: "Team",
          optional: "Optional",
          sublabel:
            "Who else is on the team? Name, role, commitment (full/part-time). If you're solo — just say so, it's not a minus.",
          placeholder:
            "For example: Alisa (design, full-time), Botir (marketing, part-time)",
        },
        {
          kind: "textarea",
          block: "Block 2 · What you're building",
          title: "Your startup in one sentence",
          sublabel:
            "What do you do, for whom, and why is it better than what exists? One sentence.",
          placeholder:
            "For example: A CRM for taxi drivers that automates orders and keeps real-time accounting.",
        },
        {
          kind: "textarea",
          block: "Block 2 · What you're building",
          title: "Customer and access to them",
          sublabel:
            "Who is your customer — a specific role, segment? And how will you reach the first 10 people this very month — channels, places, contacts?",
          placeholder:
            "For example: Customer: Tashkent taxi drivers (25–45, self-employed). Access: Yandex Go forum, local driver chats, my uncle knows 3 drivers.",
        },
        {
          kind: "textarea",
          block: "Block 2 · What you're building",
          title: "What's already done",
          sublabel:
            "What have you built, spent or sold for this idea? Be specific: hours, money, a prototype link, number of customers or conversations. \"Nothing yet\" is an honest answer too.",
          placeholder:
            "For example: Spent 60 hours on a prototype, 500k soum on Figma and hosting. Showed it to 8 drivers, three liked it.",
        },
        {
          kind: "textarea",
          block: "Block 2 · What you're building",
          title: "Last three conversations with customers",
          sublabel:
            "Write your last three conversations with real potential customers: who you spoke to (role), what exactly they said, what you understood. If there were none — say so honestly and explain who you'll talk to this week.",
          placeholder:
            "For example:\n1. Akbar (driver): \"I lose a whole day tracking trips right now.\" → Understood: there's a real problem, automation is needed.\n2. Samarbek: \"I have an Excel sheet, but it has errors.\" → could be a customer, but needs to see it first.\n3. Haven't spoken yet. I'll reach Nina via Telegram this week.",
        },
        {
          kind: "textarea",
          block: "Block 2 · What you're building",
          title: "First revenue",
          sublabel:
            "Where does the first money come from in the next 6 months? Who pays, why, first price.",
          placeholder:
            "Drivers pay $2/month for automation. First customer — my acquaintance Akbar (starts in September).",
        },
        {
          kind: "textarea",
          block: "Block 2 · What you're building",
          title: "If we reject you",
          sublabel: "If we reject you, what will you do?",
          placeholder:
            "I'll build it anyway. I've already arranged hosting for September, raised $1,500 for marketing, and scheduled 20 conversations for the summer.",
        },
        {
          kind: "checklist",
          block: "Block 3 · Terms",
          title: "Terms of participation",
          options: [
            "I understand: 40 days is offline full-time, with no parallel work or study.",
            "I follow the open-leaderboard and honest-numbers rule: inflated metrics — ban, repeat — removal.",
            "I understand: before day one — pre-work, 5 customer conversations by template.",
            "I understand: the $10–100K investment is at the end and by result, not guaranteed and with no advance.",
          ],
          note:
            "Each checkbox is a psychological and legal confirmation. Those who aren't ready drop off here, before the interview.",
        },
        {
          kind: "video",
          block: "Block 4 · Video",
          title: "Video · 2 minutes",
          sublabel:
            "Record 2 minutes with no editing, a phone camera is enough, in any of the three languages. Two questions: why should you specifically solve this problem? What have you done in the last 30 days to get closer to a solution?",
          video: {
            label: "Video",
            dropTitle: "Choose a file or drop it here",
            dropHint: "MP4, MOV (max. 500MB)",
            uploadBtn: "Upload",
            or: "Or",
            linkLabel: "Or paste a link",
            linkPlaceholder: "YouTube (unlisted) or Google Drive — link",
          },
        },
        {
          kind: "links",
          block: "Block 5 · Links",
          title: "Links",
          optional: "Optional",
          fields: [
            { key: "link_proto", label: "Prototype or landing", placeholder: "https://..." },
            { key: "link_pitch", label: "Pitch deck", placeholder: "https://..." },
            { key: "link_metrics", label: "Metrics screenshot or repository", placeholder: "https://..." },
          ],
        },
      ],
      nav: { back: "Back", next: "Next", submit: "Submit application" },
      success: {
        title: "Application received",
        body: "Thank you! We've received your application. It's now under review. Once the review is complete, we'll let you know the result.",
        close: "Close",
      },
    },
  },
};
