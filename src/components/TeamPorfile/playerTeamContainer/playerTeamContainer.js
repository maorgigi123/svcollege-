import { nanoid } from 'nanoid';
const PlayerTeamContainer = ({players}) => {
    return(
        <>
            {
                 players.map((player) => {
                    
                    return (
                        <div key = {nanoid()} className='PlayerTeamContainer'>
                            <p>{player.name}</p>
                            <p>Age:{player.age}</p>
                            <p>{player.lineup ? 'in lineup' : 'on bench'}</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default PlayerTeamContainer;