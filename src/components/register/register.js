import './register.css';
import FormInput from "../form-input/form-input.component";
import {FormButtonBlue} from "../form-button/formButton";
const Register = () => {

   
    return (
        <div>
            <h1 className='title'>Football Club Svcollega</h1>
            <div className="container_register">
                <div className='container_form'>
                <FormInput
                    type="text"
                    placeholder = 'username'
                    //  onChange={handleChange} 
                    required 
                    name="username" 
                    // value={displayName}
                />
                <FormInput
                    type="text"
                    placeholder = 'Team name'
                    //  onChange={handleChange} 
                    required 
                    name="TeamName" 
                    // value={displayName}
                />
                <FormInput
                    type="password"
                    placeholder = 'Password'
                    //  onChange={handleChange} 
                    required 
                    name="Password" 
                    // value={displayName}
                />
                <FormInput
                    type="Confirm password"
                    placeholder = 'Confirm password'
                    //  onChange={handleChange} 
                    required 
                    name="Confirm password" 
                    // value={displayName}
                />
                </div>
                
            </div>
            <div className='formInput'>
                <FormButtonBlue>Register</FormButtonBlue>
            </div>
        </div>
    )
}
export default Register;