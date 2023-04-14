const isBookshopOpen = false

const willIgetNewBook = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (isBookshopOpen) {
      const book = {
        title: 'TestTitle',
        author: 'TestAuthor',
      }
      resolve(book) // fulfilled
    } else {
      const reason = new Error('Kitob dokoni yopiq')
      reject(reason) // rejected
    }
  }, 1000)
})
willIgetNewBook
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
