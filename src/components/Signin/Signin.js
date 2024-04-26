import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import {FormButtonYellow, FormButtonBlue} from '../form-button/formButton';
import './Signin.css';
const SignIn = ({loadUser}) => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username || !password)
            return alert('incorrect form submission');
        
        fetch('http://localhost:3001/signin',{
            method:'post',
            headers: {'content-Type': 'application/json'},
            body:JSON.stringify({
                username: username,
                password:password,
            })
        }).then(data => data.json())
        .then(user => {
            if(user === 'wrong credentials')
                return alert(user)
            loadUser(user)
            navigate(`team/${user.teamName}`)
        })
    }
    return (
        <form onSubmit={handleSubmit} className='container__signin'>
            <h1 className="title__signin"> Football Club Svcollega </h1>
            <div className='inputParent__signin'>
                <FormInput 
                    required
                    type="text"
                    placeholder='username' 
                    onChange = {onChangeUsername}
                />
                    
                <FormInput 
                    required
                    type="password"
                    placeholder='password' 
                    onChange = {onChangePassword}
                />
            </div>

            <div className="parentButton__signin">
                    <FormButtonYellow type='submit'>Login</FormButtonYellow>
                    <FormButtonBlue  onClick= {handleRegister}>Register</FormButtonBlue>
            </div>

        </form>
    );
}

export default SignIn;