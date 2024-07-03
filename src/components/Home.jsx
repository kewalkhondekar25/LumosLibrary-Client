import React from 'react'

const Home = () => {
  const booksData = [
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      image: "https://res.cloudinary.com/kewalkhondekar/image/upload/v1719758753/books/hp1_lnlnpy.webp",
      description: "The book that started it all...",
      featured: false
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      image: "https://res.cloudinary.com/kewalkhondekar/image/upload/v1719970898/books/sapiens_vtcgub.png",
      description: "A Brief History of Humankind",
      featured: true
    },
    {
      id: 3,
      title: "Crimes of Grindelwald",
      author: "J.K. Rowling",
      image: "https://res.cloudinary.com/kewalkhondekar/image/upload/v1719760333/books/fb2_shdf2d.webp",
      description: "The adventure continues in the Chamber of Secrets...",
      featured: false
    },
    {
      id: 4,
      title: "Secrets of Dumbledore",
      author: "J.K. Rowling",
      image: "https://res.cloudinary.com/kewalkhondekar/image/upload/v1719760336/books/fb3_awxquy.webp",
      description: "The adventure continues in the Chamber of Secrets...",
      featured: false
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Lumos Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {booksData.map((book) => (
          <div key={book.id} className="relative">
            <div className={`border rounded-lg overflow-hidden shadow-md ${book.featured ? 'border-yellow-500' : 'border-gray-300'}`}>
              <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                <p className="text-sm">{book.description}</p>
              </div>
            </div>
            {book.featured && (
              <div className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 rounded-br-lg">
                Featured
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home