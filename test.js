const user = {
  email: 'test@gmail.com',
  password: '123456',
}
const getData1 = (user) => {
  return user.email
}
const getData2 = ({ email }) => {
  return email
}
const res1 = getData1(user)
const res2 = getData2(user)
console.log('result1: ', res1)
console.log('result2: ', res2)

// ---------------------
const arr = ['test', 'sdafas']
const [first, second] = arr
console.log(first, second)

// ---------------------
const sum = (x, y, z) => {
  return x + y + z
}
const numbers = [1, 2, 3]
const num_res = sum(...numbers)
console.log(num_res)
console.log({ ...numbers })
