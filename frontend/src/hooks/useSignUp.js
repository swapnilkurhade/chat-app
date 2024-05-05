import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useSignUp = () =>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} =  useAuthContext();

    const signup = async({
        fullName ,
        username,
        password,
        confirmPassword,
        gender
    })=>{

        const success = handleInputErrors({
            fullName ,
            username,
            password,
            confirmPassword,
            gender
        })

        if(!success) return ;

        setLoading(false);

        try {
            const response = await fetch('/api/auth/signup',{
                method : 'POST',
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({
                    fullName ,
                    username,
                    password,
                    confirmPassword,
                    gender
                })
            })

            const data = await response.json();
            console.log(data);

            if(data.error){
                throw new Error(data.error)
            }

            // LocalStorage
            localStorage.setItem('chat-user', JSON.stringify(data))
            // Context
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    return { loading, signup };
}


function handleInputErrors({
    fullName ,
    username,
    password,
    confirmPassword,
    gender
}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Fill all the fields')
        return false;
    }

    if(password !== confirmPassword){
        toast.error('Password didnt match to confirm password...')
        return false;
    }

    if(password.length < 6){
        toast.error('Password is weak...')
        return false;
    }

    return true;
}