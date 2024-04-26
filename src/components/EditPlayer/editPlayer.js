import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../TeamPorfile/navbar";
import FormInput from "../form-input/form-input.component";
import { FormButtonYellow } from "../form-button/formButton";
import Select from "react-select";

import './editPlayer.css'
const EditPlayer = ({loadUser,user}) => {
    const {teamName} = useParams()
  
    const [playerSelect, setPlayerSelect] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [lineup, setLineup] = useState(false)
    const [goals, setGoals] = useState(0)
    const [assists, setAssists] = useState(0)

    const navigate = useNavigate()


    const [values, setValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() =>{
        if(user.username === '')
            navigate('/')

        let data = [{value:1, label:'select player',id:false}];
        user.players.map((player,i) => data = [...data, {values:player.name,label:player.name,id:player._id,index:i}])
        setValues(data);
        setSelectedValues(data[0]);
    },[user])

      const onOptionChange = (options) => {
        // Selected options...
        if(options.value === 1)
        {
            setPlayerSelect('')
            setName('')
            setAge(0)
            setLineup(false)
            setGoals(0)
            setAssists(0)
        }
        else
        {
            setPlayerSelect(options.value)
            const player = user.players[options.index]
            setName(player.name)
            setAge(player.age)
            setLineup(player.lineup)
            setGoals(player.goals)
            setAssists(player.assists)
        }

        
        setSelectedValues(options);
      };

    const onChangeValue = (e, setStateFunction) => {
        if(e.target.name === 'lineup')
            setStateFunction(e.target.checked)
        else 
            setStateFunction(e.target.value)
        
    }
    const handleEditPlayer = (e) => {
        e.preventDefault();
        if(selectedValues.id === false)
            return alert('not selected player')
        if(user.lineup >=11 && lineup) {
            alert('cant add player have more the 11')
            return
        }
        fetch('http://localhost:3001/editplayer',
            {
                method:'put',
                headers: {'content-Type':'application/json'},
                body: JSON.stringify({
                    username: user.username,
                    player: {
                        '_id' : selectedValues.id,
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
                    setPlayerSelect('')
                    setName('')
                    setAge(0)
                    setLineup(false)
                    setGoals(0)
                    setAssists(0)
                }
            })

    }

    return (
        <form onSubmit={handleEditPlayer} className='container'>
            <NavBar loadUser ={loadUser}/>
            <div className='teamContainer editPlayerContainer'>
                 <h1 className='teamTitle'> {teamName}</h1>
                 <Select 
                    className="playersSelect"
                    closeMenuOnSelect={true}
                    value={selectedValues}
                    options={values}
                    getOptionValue={(option) => option.values} // changes here!!!
                    onChange={onOptionChange}           
                    />
                
            
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
                   
                    <FormInput 
                        type ='checkbox' 
                        name='lineup' 
                        checked = {lineup}
                        onChange={(e) => onChangeValue(e, setLineup)}
                    />
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
                 <div className="EditPlayerButton">
                    <FormButtonYellow type='submit'> Edit Player</FormButtonYellow>
                 </div>
            </div>
        </form>
    )
}
export default EditPlayer;