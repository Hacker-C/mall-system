let foo = (a, b) => {
  return a.id - b.id
}
let arr = [
  {
    id: 2,
    age: 3
  },
  {
    id: 1,
    age: 4
  },
  {
    id: 3,
    age: 1
  }
]
arr.sort(foo)
console.log(arr)
