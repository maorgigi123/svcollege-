import './Signin.css';
import { useNavigate  } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import {FormButtonYellow, FormButtonBlue} from '../form-button/formButton';
const SignIn = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }
    const handleSubmit = () => {
        console.log('submit');
    }
    return (
        <form onSubmit={handleSubmit} className='container__signin'>
            <h1 className="title__signin"> Football Club Svcollega </h1>
            <div className='inputParent__signin'>
                <FormInput required type="text" placeholder='username' />
                    
                <FormInput required type="password" placeholder='password' />
            </div>

            <div className="parentButton__signin">
                    <FormButtonYellow type='submit'>Login</FormButtonYellow>
                    <FormButtonBlue  onClick= {handleRegister}>Register</FormButtonBlue>
            </div>

        </form>
    );
}

export default SignIn;