import axios from  'axios';
import { useEffect, useState } from 'react';

export interface UserData {
    name: string,
    email: string
}

export const useUserData = () => {
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try{    
                const token = await sessionStorage.getItem('token');
                const response = await axios.get<UserData>("http://localhost:4200/users", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const {name, email} = response.data;
                setUserName(name);
                setUserEmail(email);
            }catch(error) {
                console.log("Error: " + error);
            }
        };
        fetchData();
    }, []);
    return {userName, userEmail};
}