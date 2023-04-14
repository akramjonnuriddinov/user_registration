export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log('error getting data from localStorage', error)
    return null
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.log('error saving data in localStorage', error)
  }
}
