import { useState } from 'react'

export default function useUser() {
    const getUser = () => {
        return sessionStorage.getItem('user')
    }

    const [user, setUser] = useState(getUser);

    const saveUser = userobject => {
        sessionStorage.setItem('user', userobject.user)
        setUser(userobject.user)
    }

    return {
        setUser: saveUser(),
        user
    }
}