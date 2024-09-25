// useAuth.js
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
    const [user, setUser] = useState(() => {
        // Initialize user from localStorage if available
        return JSON.parse(localStorage.getItem('user'));
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
};

export default useAuth;
