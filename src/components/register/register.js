import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import {FormButtonBlue,FormButtonYellow} from "../form-button/formButton";

import './register.css';



const Register = () => {

    let [username, setUsername] = useState('');
    let [teamName, setTeamName] = useState('')
    let [password, setPassword] = useState('');
    let [rePassword, setRePassword] = useState(''); 
    

    let navigate = useNavigate();
    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onTeamNameChange = (event) => {
        setTeamName(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onRePasswordChange = (event) => {
        setRePassword(event.target.value)
    }
    const  onSubmitRegister = (e) => {
        e.preventDefault();
        const english = /^[A-Za-z]*$/;
        if(!username || !password || !teamName)
            return alert('incorrect form submission');

        // ------- check TeamName -------
        let teamNameSplit = teamName.split(' ');

        for( let i =0; i < teamNameSplit.length; i++) {
            if(!english.exec(teamNameSplit[i]))
            {
                // the word not in english
                return alert('The name must contain only English letters');
            }
            for (let j =1; j < teamNameSplit[i].length; j++)
            {
                if(teamNameSplit[i][j] == teamNameSplit[i][j].toUpperCase())
                {   
                    return alert('A capital letter is not allowed in the middle of the Team name');
                }
            }
        }

        // ------- check password -------
        
        if(password.length < 8 || password.length > 20)
            return alert('password length must be between 8 OR 20 letters')  
        
        if(password.search(/[a-z]/i) < 0  || password.search(/[0-9]/) < 0 || password.search(/[A-Z]/) < 0 || password.search(/[!@#$%^&*]/) < 0)
            return alert('password must include uppercase letter lowercase letter number and special letter')
        
        if(password.localeCompare(rePassword) > 0)
            return alert('Passwords do not match')
        
        fetch('http://localhost:3001/register', {
                method:'post',
                headers: {'content-Type':'application/json'},
                body:JSON.stringify({
                    username: username,
                    teamName: teamName,
                    password:password,
                })
            }).then(res => res.json())
            .then(data => {
                if(data === "this username is alerdy in used")
                    return alert('this username is alerdy in used');
                navigate('/')
            })
            
        }
    const handleLogin = () => {
        navigate('/')
    }
    
    return (
            
        <form onSubmit={onSubmitRegister}>
            <h1 className='title'>Football Club Svcollega</h1>
            <div className="container_register">
                <div className='container_form'>
                <FormInput
                    type="text"
                    placeholder = 'username'
                    onChange={onUsernameChange} 
                    required 
                    name="username"
                    // value={displayName}
                />
                <FormInput
                    type="text"
                    placeholder = 'Team name'
                    onChange={onTeamNameChange} 
                    required 
                    name="TeamName" 
                    // value={displayName}
                />
                <FormInput
                    type="password"
                    placeholder = 'Password'
                    onChange={onPasswordChange} 
                    required 
                    name="Password" 
                    // value={displayName}
                />
                <FormInput
                    type="password"
                    placeholder = 'Confirm password'
                    onChange={onRePasswordChange} 
                    required 
                    name="Confirm password" 
                    // value={displayName}
                />
                </div>
                
            </div>
            <div className='formInput'>
                <FormButtonBlue type='submit'>Register</FormButtonBlue>
                <FormButtonYellow onClick = {handleLogin}>Login</FormButtonYellow>
            </div>
        </form>
    )
}
export default Register;