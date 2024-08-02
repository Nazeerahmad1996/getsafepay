import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateRecent } from '../../redux/reducer/lookup.slice'
import { fetchData } from '../../utils/data.utils'
import './lookup.style.css'
import { API_BASE_URL } from '../../constant/appConstant'
import Cardview from '../cardView/cardview.component'
import { RootState, Student } from "../../types/user";

export default function Lookup() {
    const [uuid, setUuid] = useState("");
    const [isFound, setIsFound] = useState<boolean>(true);

    const dispatch = useDispatch();
    const student = useSelector((state: RootState) => {
        return state.lookupReducer.recent
    });

    const handleSearch = async () => {
        if (uuid) {
            const student: Student = await fetchData(`${API_BASE_URL}/student/${uuid}`);
            if(student){
                dispatch(updateRecent(student));
                setIsFound(true)
            } else {
                dispatch(updateRecent(null));
                setIsFound(false);
            }
        }
    };
    return (
        <div className="lookup-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter Student UUID"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            {isFound ? <Cardview student={student} /> : <h1>Not Found</h1>}
        </div>
    )
}
