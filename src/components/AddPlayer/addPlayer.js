import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import NavBar from "../TeamPorfile/navbar";
import FormInput from "../form-input/form-input.component";
import { FormButtonYellow } from "../form-button/formButton";


import './addPlayer.css';


const AddPlayer = ({loadUser,user}) => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [lineup, setLineup] = useState(false)
    const [goals, setGoals] = useState(0)
    const [assists, setAssists] = useState(0)

    const {teamName} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        if(user.username === '')
            navigate('/')
    },[user])
    
    const onChangeValue = (e, setStateFunction) => {
        if(e.target.name === 'lineup')
            setStateFunction(e.target.checked)
        else 
            setStateFunction(e.target.value)
    }

    const handleAddPlayer = (e) => {
        e.preventDefault();
        if(user.lineup >=11 && lineup) {
            alert('cant add player have more the 11')
            return
        }
        fetch('http://localhost:3001/addplayer',
            {
                method:'post',
                headers: {'content-Type':'application/json'},
                body: JSON.stringify({
                    username: user.username,
                    player: {
                        'name': name,
                        'age':age,
                        'lineup':lineup,
                        'goals':goals,
                        'assists':assists
                    }
                })
            }).then(data => data.json())
            .then(user => {
                if(user === 'user not found')
                    return alert('user not found')
                else
                {
                    loadUser(user)
                    setName('')
                    setAge(0)
                    setLineup(false)
                    setGoals(0)
                    setAssists(0)
                }
            })
    }
    return (
        <form onSubmit={handleAddPlayer} className='container'>
            <NavBar loadUser ={loadUser}/>
            <div className='teamContainer addPlayerContainer'>
                 <h1 className='teamTitle'> {teamName}</h1>
                 <FormInput 
                    required
                    placeholder ='Name'
                    value = {name}
                    onChange = {(e) => onChangeValue(e, setName)}
                 />
                 <FormInput 
                    required
                    name='age'
                    type = 'number'
                    min = '16'
                    max = '120'
                    placeholder ='Age'
                    value = {age}
                    onChange={(e) => onChangeValue(e, setAge)}
                 />
                 <div className="lineupContainer">
                    <p> in lineup?</p>
                    <FormInput checked = {lineup} type ='checkbox' name='lineup' onChange={(e) => onChangeValue(e, setLineup)}/>
                 </div>
                 <FormInput 
                     required
                     name='goals'
                     type = 'number'
                     placeholder ='Goals'
                     value = {goals}
                     onChange = {(e) => onChangeValue(e, setGoals)}
                 />
                 <FormInput 
                    required
                    name='assists'
                    type = 'number'
                    placeholder ='Assists'
                    value = {assists}
                    onChange = {(e) => onChangeValue(e, setAssists)}
                 />
                 <div className="addPlayerButton">
                    <FormButtonYellow type='submit'> Add Player</FormButtonYellow>
                 </div>
            </div>
        </form>
    )
}

export default AddPlayer;