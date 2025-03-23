# 📚 Kitap Dünyası Pro

## 🚀 Proje Hakkında
Kitap Dünyası Pro, kullanıcıların kitapları görüntüleyip inceleyebileceği, yorum yapabileceği, puanlayabileceği, sepete ekleyebileceği ve favorilerine alabileceği gelişmiş bir kitap yönetim uygulamasıdır. Vue 3, Vuex, Vue Router, Tailwind CSS ve çeşitli modern kütüphaneler kullanılarak geliştirilmiştir.

## 🛠️ Kullanılan Teknolojiler ve Kütüphaneler
- **Vue.js (v3)**
- **Vuex** (State Yönetimi)
- **Vue Router** (Sayfa Yönetimi)
- **Vite** (Build Aracı)
- **Axios** (HTTP İstekleri)
- **Vue I18n** (Çok Dilli Destek)
- **Tailwind CSS** (CSS Kütüphanesi)
- **Vuelidate** (Form Validasyonu)
- **vue3-carousel** (Carousel Bileşeni)
- **IndexedDB** (Veri Saklama)
- **Docker** (Container Yönetimi)

## 📦 Proje Kurulumu

1. Projeyi klonlayın:
```bash
git clone https://github.com/SedatAy1/K-tapDunyas-Pro
```

2. Proje dizinine gidin:
```bash
cd kitap-dunyasi-pro
```

3. Gerekli paketleri yükleyin:
```bash
npm install
```

## 🖥️ Projenin Çalıştırılması

### Yerel geliştirme sunucusunu başlatma:
```bash
npm run dev
```
Proje aşağıdaki adreste çalışacaktır:
```
http://localhost:5173
```

### Docker ile çalıştırma:
Docker imajını oluşturun:
```bash
docker build -t kitap-dunyasi-pro .
```

Docker konteynerını başlatın:
```bash
docker run -d -p 5173:5173 kitap-dunyasi-pro
```

## 📂 Proje Yapısı
```
kitap-dunyasi-pro/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── store/
│   ├── router/
│   ├── utils/
│   ├── i18n/
│   ├── directives/
│   └── App.vue
│   └── main.js
├── Dockerfile
├── README.md
├── ARCHITECTURE.md
└── package.json
```

## 💡 Mimari Kararlar
- Vuex ile merkezi state yönetimi tercih edilerek, veri akışı düzenli ve yönetilebilir hale getirildi.
- Vue Router ile SPA (Single Page Application) mimarisi kullanıldı.
- IndexedDB tercih edilerek offline veri saklama ve performanslı yerel depolama sağlandı.
- Tailwind CSS ile hızlı ve modern tasarım yapıldı.
- Çok dilli destek (Türkçe ve İngilizce) için Vue I18n kütüphanesi entegre edildi.

## 🚧 Karşılaşılan Zorluklar ve Çözüm Yolları
- **Dil Değişiminde Çeviri Sorunu:** Vue I18n kütüphanesinde çeviri dosyalarının düzgün yapılandırılması ve anahtarların tutarlı kullanılması gerekti. Modüler yapı ve düzenli anahtar kullanımıyla çözüldü.
- **State Yönetimi Karmaşıklığı:** Büyük çaplı uygulamalarda state yönetimi karmaşıklaştı. Vuex modülleri kullanılarak bu karmaşıklık azaltıldı.
- **Form Validasyonları:** Kullanıcı girişlerinin doğruluğunu sağlamak için Vuelidate ile kapsamlı doğrulamalar sağlandı.


