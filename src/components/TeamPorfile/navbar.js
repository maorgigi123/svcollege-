import { useNavigate, useParams } from "react-router-dom";

const NavBar = ({loadUser}) => {
    const navigate = useNavigate()
    const {teamName} = useParams()
    const handleAddPlayer = () => {
        navigate(`/team/${teamName}/addplayer`)
    }
    const handleTeamButton = () => {
        navigate(`/team/${teamName}`)
    }
    const handleEditPlayer = () => {
        navigate(`/team/${teamName}/editPlayer`)
    }
    const handleSignout = () => {
        loadUser({
            id: '',
            username: '',
            teamName: '',
            players: [],
            lineup:0
          })
    }
    return (
        <div className='navbarContainer'>
                <button type='button' onClick={handleTeamButton}> Team </button>
                <button type='button' onClick={handleAddPlayer}> Add Player </button>
                <button type='button' onClick={handleEditPlayer} > Edit Player </button>
                <button type='button' onClick={handleSignout}> Logout </button>
        </div>
    )
}

export default NavBar;