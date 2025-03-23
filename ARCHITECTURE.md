# Proje Mimari Yapısı ve Önemli Kararlar

## Genel Bakış
Kitap Dünyası Pro uygulaması, modern web geliştirme standartlarını benimseyen modüler ve ölçeklenebilir bir yapıya sahiptir. Frontend, Vue 3 ve Composition API kullanılarak oluşturulmuştur. Backend bağlantıları için Axios tercih edilmiştir.

## Klasör Yapısı
```
src/
├── assets/         # Görsel ve diğer statik dosyalar
├── components/     # Tekrar kullanılabilir UI bileşenleri
├── composables/    # Tekrar kullanılabilir mantık ve fonksiyonlar
├── directives/     # Custom Vue direktifleri
├── i18n/           # Çoklu dil desteği (internationalization)
├── layouts/        # Sayfa düzeni bileşenleri
├── plugins/        # Global Vue eklentileri
├── router/         # Vue Router yapılandırmaları
├── store/          # Vuex Store modülleri
├── utils/          # Yardımcı fonksiyonlar ve hizmetler
└── views/          # Uygulamanın ana sayfaları ve görünümleri
```

## Kullanılan Teknolojiler ve Kararların Gerekçeleri

### Frontend
- **Vue 3 (Composition API)**: Esnekliği ve tekrar kullanılabilirliği artırmak, modüler yapıyı güçlendirmek için tercih edilmiştir.
- **Vue Router**: SPA için sayfa yönlendirmelerinde kullanılmıştır.
- **Vuex**: Merkezi state yönetimi için kullanılmış, uygulama genelinde veri tutarlılığı sağlamıştır.
- **Vite**: Hızlı geliştirme ve yüksek performans için tercih edilen build aracıdır.

### UI ve CSS
- **Tailwind CSS & Custom CSS**: Hızlı prototipleme ve modern görünüm için tercih edilmiştir.
- **vue3-carousel**: Kullanıcı deneyimini iyileştiren modern bir karusel bileşeni olarak kullanılmıştır.

### Veri Yönetimi
- **IndexedDB & localStorage**: Kullanıcı verileri ve durumlarının kalıcı olarak saklanması için kullanılmıştır.
- **Axios**: HTTP isteklerinin yönetimi ve hata ayıklama kolaylığı için tercih edilmiştir.

### Çoklu Dil Desteği
- **vue-i18n**: İngilizce ve Türkçe dil desteği sağlanmış, kolay genişletilebilir yapı oluşturulmuştur.

## Önemli Mimari Kararlar
- **Modüler Vuex Store Yapısı**: Her özellik (kitaplar, sepet, favoriler vs.) için ayrı modüller oluşturulmuş, böylece uygulamanın büyüdüğünde bakımı kolaylaşmıştır.
- **Composition API & Composables**: Tekrarlanabilir mantıkların composable fonksiyonlarla soyutlanarak component temizliğini sağlama.
- **Custom Directives (v-focus, v-uppercase)**: Tekrar eden küçük UI davranışlarını kapsüllemiş, okunabilirliği artırmıştır.
- **Localization (i18n)**: Modüler JSON dosyalarıyla farklı dil seçeneklerini esnek bir şekilde yönetme.

## Karşılaşılan Zorluklar ve Çözüm Yöntemleri

- **Çoklu Dil (i18n) Yapılandırması**: Başlangıçta anahtarların karışması gibi zorluklarla karşılaşıldı. Çözüm olarak JSON dosyaları modüler hale getirildi ve dil anahtarları mantıklı gruplar halinde kategorilendirildi.
- **Döviz Kuru API Entegrasyonu**: API üzerinden alınan verilerde oluşan 'NaN' hatalarıyla karşılaşıldı. Hesaplamalar ve API cevapları detaylı incelenerek hata kontrol mekanizmaları eklenerek çözüldü.
- **Sosyal Medya Paylaşımı Fonksiyonu**: Başlangıçta bileşen yerleşiminde karar vermekte zorlanıldı, kullanıcı deneyimi göz önüne alınarak kitap detay sayfasına eklenmesine karar verildi.

## Sonuç
Kitap Dünyası Pro uygulamasının mimarisi, gelecekteki ihtiyaçlara yönelik kolay genişletilebilir ve yönetilebilir olacak şekilde tasarlanmıştır. Kullanılan teknolojiler ve mimari kararlar uygulamanın performansını ve geliştirilebilirliğini maksimum düzeyde tutmaktadır.

