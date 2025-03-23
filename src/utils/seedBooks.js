// seedBooks.js
export const seedBooks = () => {
  const rawData = `
Tutunamayanlar – Oğuz Atay
Saatleri Ayarlama Enstitüsü – Ahmet Hamdi Tanpınar
İnce Mehmed – Yaşar Kemal
Kürk Mantolu Madonna – Sabahattin Ali
Aylak Adam – Yusuf Atılgan
Anayurt Oteli – Yusuf Atılgan
Yaban – Yakup Kadri Karaosmanoğlu
Çalıkuşu – Reşat Nuri Güntekin
Tehlikeli Oyunlar – Oğuz Atay
Bir Düğün Gecesi – Adalet Ağaoğlu
Serenad – Zülfü Livaneli
Tutkulu Perçem – Sevim Burak
Mahur Beste – Ahmet Hamdi Tanpınar
Fikrimin İnce Gülü – Adalet Ağaoğlu
Yeni Hayat – Orhan Pamuk
Baba Evi – Orhan Kemal
Bereketli Topraklar Üzerinde – Orhan Kemal
Benim Adım Kırmızı – Orhan Pamuk
Aganta Burina Burinata – Halikarnas Balıkçısı
Sinekli Bakkal – Halide Edib Adıvar 
Sherlock Holmes: Bütün Hikâyeler – Arthur Conan Doyle
Cinayet ve Ceza (Crime and Punishment) – Fyodor Dostoyevski
Doğu Ekspresinde Cinayet – Agatha Christie
Roger Ackroyd Cinayeti – Agatha Christie
On Küçük Zenci (Ve Sonra Hiç Kalmadı) – Agatha Christie
Kuzuların Sessizliği – Thomas Harris
Ejderha Dövmeli Kız – Stieg Larsson
Da Vinci Şifresi – Dan Brown
Kayıp Sembol – Dan Brown
Gece Yarısı Kütüphanesi – Matt Haig
Kavim – Ahmet Ümit
Beyoğlu Rapsodisi – Ahmet Ümit
Sis ve Gece – Ahmet Ümit
Aşk Köpekliktir – Ahmet Ümit
Başkomser Nevzat – Tapınak Fahişeleri – Ahmet Ümit
Son Hafriyat – Celil Oker
Kramponlu Ceset – Emrah Serbes
Her Temas İz Bırakır – Emrah Serbes
Beyaz Eldiven Siyah Kalp – Mehmet Murat Somer
Bir Şapka Bir Tabanca – Cemil Kavukçu
`.trim().split('\n')

  const categories = ['Roman', 'Klasik', 'Polisiye', 'Gerilim', 'Modern', 'Psikolojik']
  
  return rawData.map((line, i) => {
    const [title, author] = line.split(' – ')
    return {
      id: Date.now() + i,
      title: title.trim(),
      author: author.trim(),
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 150 + 50), // 50 - 200 arası
      cover: `https://picsum.photos/200/300?random=${i}`,
      tags: []
    }
  })
}