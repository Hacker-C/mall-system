import request from '@/utils/request'

const getAllproduct = () => {
  return request.get('/product/all')
}

export const getDiscountProduct = () => {
  return getAllproduct().then(res => {
    let temp = res.filter(p => [2, 5].includes(p.categoryId))
    if (temp.length > 5) {
      return temp.slice(0, 5)
    }
    return temp
  })
}

export const getHotProduct = () => {
  return getAllproduct().then(res => {
    return res.filter(p => [3].includes(p.categoryId))
  })
}

export const getHotBook = () => {
  return getAllproduct().then(res => {
    return res.filter(p => [2].includes(p.categoryId))
  })
}

export const getTopBook = () => {
  return getAllproduct().then(res => {
    return res.filter(p => [2].includes(p.categoryId)).slice(0, 4)
  })
}
