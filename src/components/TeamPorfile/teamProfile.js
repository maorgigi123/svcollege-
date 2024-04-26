import { useNavigate, useParams } from 'react-router-dom';
import PlayerTeamContainer from './playerTeamContainer/playerTeamContainer';
import { FormButtonBlue } from '../form-button/formButton';
import NavBar from './navbar';
import './teamProfile.css'
import { useEffect, useState } from 'react';

const TeamProfile = ({loadUser,user}) => {
    const navigate = useNavigate()
    
    const [searchPlayers, setSearchPlayers] = useState('')
    const [showAllPlayers, setShowAllPlayers] = useState(true)
   
    useEffect(() =>{
        if(user.username === '')
            navigate('/')
    },[user])

    const changeSearchFiled = (e) => {
        setSearchPlayers(e.target.value)
    }
    const handleShowAllPlayers= () => {
        setShowAllPlayers((preState) => !preState)
    }
    const {teamName} = useParams()

    const fillterPlayers = user.players.filter(player => {
        return player.name.toLowerCase().includes(searchPlayers.toLowerCase())
    })

    const fillterByLineUp = fillterPlayers.filter(player => {
        if(showAllPlayers)
        {
            return player.lineup === true
        }
        else {
            return player
        }   
    })
    return (
        <div className='container'>
            <NavBar loadUser={loadUser}/>
            <div className='teamContainer'>
                <h2 className='teamTitle'> {teamName} </h2>
                <div className='SearchPlayer'>
                    <input value={searchPlayers}  onChange={changeSearchFiled} type='text' placeholder='Search' />
                </div>
                <div className='PlayersContainer'>
                    <PlayerTeamContainer players = {fillterByLineUp} />
                    
                </div>
                {showAllPlayers ? <div className='ShowAllPlayersContainer' onClick = {handleShowAllPlayers}>
                    <FormButtonBlue> Show All Players</FormButtonBlue>
                </div> : 
                    <div className='ShowAllPlayersContainer' onClick = {handleShowAllPlayers}>
                    <FormButtonBlue> Show only lineup players</FormButtonBlue>
                </div>
                }
                
            </div>
        </div>
    )
}

export default TeamProfile;