import { toast } from 'react-toastify'

const createNotification = (message) => {
  console.log('createNotification message: ', message)
  return toast(message)
}

export default createNotification