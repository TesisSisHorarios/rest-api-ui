import {
  useState,
  useEffect
} from 'react'

import axios from 'axios'

const useUsers = () => {
  const [usersTotal, setUsers] = useState([])

  /** GET USERS */
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_USERS_URL)
        setUsers(data)
      } catch (err) {
        console.log('KO::USERS', err)
      }
    }

    getUsers()
  }, [])

  return {
    usersTotal
  }
}

export default useUsers
