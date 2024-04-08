import './formButton.css'
const FormButtonYellow = ({ ...otherProps}) => {
    return(
        <button className='yellow' {...otherProps} />
    );
}
const FormButtonBlue = ({ ...otherProps}) => {
    return(
        <button className='blue' {...otherProps} />
    );
}


export { FormButtonYellow ,FormButtonBlue}
