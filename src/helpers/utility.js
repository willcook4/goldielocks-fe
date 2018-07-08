import { Map } from 'immutable'
import moment from 'moment'
moment.locale('gb')

export function clearToken () {
  localStorage.removeItem('token')
}

export function getToken () {
  try {
    const token = localStorage.getItem('token')
    return new Map({ token })
  } catch (err) {
    console.log('err', err)
    clearToken()
    return new Map()
  }
}

export function tokenExpired () {
  let tokenExpiry = moment(localStorage.getItem('tokenExpiry')).utc()
  // console.log('tokenExpired? ', !moment.utc().isBefore(tokenExpiry))
  // Thu Jun 14 2018 21:47:27 GMT+0000
  return !moment.utc().isBefore(tokenExpiry)

  // false if time earlier, expired
}

// export function _extractKey (selector, mode) {
//   if (!selector) return
//   if (mode === 'default') { // single
//     return selector.key
//   } else { // multiple
//     return selector.map((o) => {
//       return o.key
//     })
//   }
// }
