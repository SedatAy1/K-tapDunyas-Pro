export default {
  namespaced: true,
  state: () => ({
    books: JSON.parse(localStorage.getItem('books')) || [
      {
        id: 1,
        title: "Vue.js ile Uygulama Geliştirme",
        author: "John Doe",
        cover: "https://picsum.photos/150/200?random=46",
        price: 100,
        currency: "TRY",
        category: "Web Development"
      },
      {
        id: 2,
        title: "JavaScript'in Derinlikleri",
        author: "Jane Smith",
        cover: "https://picsum.photos/150/200?random=45",
        price: 150,
        currency: "TRY",
        category: "Programming"
      },
      {
        id: 3,
        title: "Modern CSS Teknikleri",
        author: "Emily Brown",
        cover: "https://picsum.photos/150/200?random=48",
        price: 120,
        currency: "TRY",
        category: "Design"
      },
      // 📚 Yeni kitaplar (fiyat, kategori rastgele; görseller lorem picsum'dan)
      { id: 4, title: "Tutunamayanlar", author: "Oğuz Atay", cover: "https://picsum.photos/150/200?random=4", price: 80, currency: "TRY", category: "Roman" },
      { id: 5, title: "Saatleri Ayarlama Enstitüsü", author: "Ahmet Hamdi Tanpınar", cover: "https://picsum.photos/150/200?random=5", price: 95, currency: "TRY", category: "Edebiyat" },
      { id: 6, title: "İnce Mehmed", author: "Yaşar Kemal", cover: "https://picsum.photos/150/200?random=6", price: 110, currency: "TRY", category: "Destan" },
      { id: 7, title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", cover: "https://picsum.photos/150/200?random=7", price: 85, currency: "TRY", category: "Roman" },
      { id: 8, title: "Aylak Adam", author: "Yusuf Atılgan", cover: "https://picsum.photos/150/200?random=8", price: 70, currency: "TRY", category: "Psikoloji" },
      { id: 9, title: "Anayurt Oteli", author: "Yusuf Atılgan", cover: "https://picsum.photos/150/200?random=9", price: 75, currency: "TRY", category: "Roman" },
      { id: 10, title: "Yaban", author: "Yakup Kadri Karaosmanoğlu", cover: "https://picsum.photos/150/200?random=10", price: 90, currency: "TRY", category: "Klasik" },
      { id: 11, title: "Çalıkuşu", author: "Reşat Nuri Güntekin", cover: "https://picsum.photos/150/200?random=11", price: 65, currency: "TRY", category: "Roman" },
      { id: 12, title: "Tehlikeli Oyunlar", author: "Oğuz Atay", cover: "https://picsum.photos/150/200?random=12", price: 95, currency: "TRY", category: "Modern" },
      { id: 13, title: "Bir Düğün Gecesi", author: "Adalet Ağaoğlu", cover: "https://picsum.photos/150/200?random=13", price: 85, currency: "TRY", category: "Edebiyat" },
      { id: 14, title: "Serenad", author: "Zülfü Livaneli", cover: "https://picsum.photos/150/200?random=14", price: 105, currency: "TRY", category: "Tarihsel" },
      { id: 15, title: "Tutkulu Perçem", author: "Sevim Burak", cover: "https://picsum.photos/150/200?random=15", price: 70, currency: "TRY", category: "Öykü" },
      { id: 16, title: "Mahur Beste", author: "Ahmet Hamdi Tanpınar", cover: "https://picsum.photos/150/200?random=16", price: 95, currency: "TRY", category: "Klasik" },
      { id: 17, title: "Fikrimin İnce Gülü", author: "Adalet Ağaoğlu", cover: "https://picsum.photos/150/200?random=17", price: 100, currency: "TRY", category: "Psikolojik Roman" },
      { id: 18, title: "Yeni Hayat", author: "Orhan Pamuk", cover: "https://picsum.photos/150/200?random=18", price: 90, currency: "TRY", category: "Modern" },
      { id: 19, title: "Baba Evi", author: "Orhan Kemal", cover: "https://picsum.photos/150/200?random=19", price: 80, currency: "TRY", category: "Toplumcu" },
      { id: 20, title: "Bereketli Topraklar Üzerinde", author: "Orhan Kemal", cover: "https://picsum.photos/150/200?random=20", price: 85, currency: "TRY", category: "Toplumcu" },
      { id: 21, title: "Benim Adım Kırmızı", author: "Orhan Pamuk", cover: "https://picsum.photos/150/200?random=21", price: 115, currency: "TRY", category: "Tarihsel" },
      { id: 22, title: "Aganta Burina Burinata", author: "Halikarnas Balıkçısı", cover: "https://picsum.photos/150/200?random=22", price: 70, currency: "TRY", category: "Deniz Hikayesi" },
      { id: 23, title: "Sinekli Bakkal", author: "Halide Edib Adıvar", cover: "https://picsum.photos/150/200?random=23", price: 90, currency: "TRY", category: "Klasik" },
      { id: 24, title: "Sherlock Holmes: Bütün Hikâyeler", author: "Arthur Conan Doyle", cover: "https://picsum.photos/150/200?random=24", price: 120, currency: "TRY", category: "Polisiye" },
      { id: 25, title: "Cinayet ve Ceza", author: "Fyodor Dostoyevski", cover: "https://picsum.photos/150/200?random=25", price: 100, currency: "TRY", category: "Klasik" },
      { id: 26, title: "Doğu Ekspresinde Cinayet", author: "Agatha Christie", cover: "https://picsum.photos/150/200?random=26", price: 95, currency: "TRY", category: "Polisiye" },
      { id: 27, title: "Roger Ackroyd Cinayeti", author: "Agatha Christie", cover: "https://picsum.photos/150/200?random=27", price: 90, currency: "TRY", category: "Polisiye" },
      { id: 28, title: "On Küçük Zenci", author: "Agatha Christie", cover: "https://picsum.photos/150/200?random=28", price: 85, currency: "TRY", category: "Polisiye" },
      { id: 29, title: "Kuzuların Sessizliği", author: "Thomas Harris", cover: "https://picsum.photos/150/200?random=29", price: 110, currency: "TRY", category: "Gerilim" },
      { id: 30, title: "Ejderha Dövmeli Kız", author: "Stieg Larsson", cover: "https://picsum.photos/150/200?random=30", price: 105, currency: "TRY", category: "Gerilim" },
      { id: 31, title: "Da Vinci Şifresi", author: "Dan Brown", cover: "https://picsum.photos/150/200?random=31", price: 115, currency: "TRY", category: "Macera" },
      { id: 32, title: "Kayıp Sembol", author: "Dan Brown", cover: "https://picsum.photos/150/200?random=32", price: 110, currency: "TRY", category: "Macera" },
      { id: 33, title: "Gece Yarısı Kütüphanesi", author: "Matt Haig", cover: "https://picsum.photos/150/200?random=33", price: 95, currency: "TRY", category: "Psikolojik" },
      { id: 34, title: "Kavim", author: "Ahmet Ümit", cover: "https://picsum.photos/150/200?random=34", price: 100, currency: "TRY", category: "Polisiye" },
      { id: 35, title: "Beyoğlu Rapsodisi", author: "Ahmet Ümit", cover: "https://picsum.photos/150/200?random=35", price: 90, currency: "TRY", category: "Polisiye" },
      { id: 36, title: "Sis ve Gece", author: "Ahmet Ümit", cover: "https://picsum.photos/150/200?random=36", price: 100, currency: "TRY", category: "Polisiye" },
      { id: 37, title: "Aşk Köpekliktir", author: "Ahmet Ümit", cover: "https://picsum.photos/150/200?random=37", price: 85, currency: "TRY", category: "Öykü" },
      { id: 38, title: "Başkomser Nevzat – Tapınak Fahişeleri", author: "Ahmet Ümit", cover: "https://picsum.photos/150/200?random=38", price: 90, currency: "TRY", category: "Polisiye" },
      { id: 39, title: "Son Hafriyat", author: "Celil Oker", cover: "https://picsum.photos/150/200?random=39", price: 80, currency: "TRY", category: "Polisiye" },
      { id: 40, title: "Kramponlu Ceset", author: "Emrah Serbes", cover: "https://picsum.photos/150/200?random=40", price: 75, currency: "TRY", category: "Gerilim" },
      { id: 41, title: "Her Temas İz Bırakır", author: "Emrah Serbes", cover: "https://picsum.photos/150/200?random=41", price: 85, currency: "TRY", category: "Gerilim" },
      { id: 42, title: "Beyaz Eldiven Siyah Kalp", author: "Mehmet Murat Somer", cover: "https://picsum.photos/150/200?random=42", price: 90, currency: "TRY", category: "Polisiye" },
      { id: 43, title: "Bir Şapka Bir Tabanca", author: "Cemil Kavukçu", cover: "https://picsum.photos/150/200?random=43", price: 70, currency: "TRY", category: "Öykü" }
    ]
  }),
  
  mutations: {
    addBook(state, book) {
      book.readCount = book.readCount || 0
      book.quantity = book.quantity || 1
      book.tags = book.tags || []
      state.books.push(book)
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    deleteBook(state, id) {
      state.books = state.books.filter(book => book.id !== id)
      localStorage.setItem('books', JSON.stringify(state.books))
    },

    incrementViewCount(state, id) {
      const book = state.books.find(b => b.id === id)
      if (book) {
        book.readCount = (book.readCount || 0) + 1
        localStorage.setItem('books', JSON.stringify(state.books))
      }
    },

    updateBook(state, updatedBook) {
      const index = state.books.findIndex(b => b.id === updatedBook.id)
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook }
        localStorage.setItem('books', JSON.stringify(state.books))
      }
    },

    clearBooks(state) {
      state.books = []
      localStorage.removeItem('books')
    }
  },

  getters: {
    getBooks: (state) => state.books,
    getBookById: (state) => (id) => state.books.find(book => book.id === id)
  }
}
