import { useParams } from 'react-router-dom';
import './teamProfile.css'

const TeamProfile = () => {
    const {teamName} = useParams()
    return (
        <h1>{teamName}</h1>
    )
}

export default TeamProfile;