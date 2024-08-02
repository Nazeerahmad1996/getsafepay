import { useEffect, useState } from 'react'
import Loader from '../loader/loader.component'
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/data.utils';
import { API_BASE_URL } from '../../constant/appConstant';
import { Student } from '../../types/user'
import './view.style.css'
import Cardview from '../cardView/cardview.component';

export default function View() {
    const { id } = useParams();
    const [student, setStudent] = useState<Student>();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const getStudent = async () => {
            const student: Student = await fetchData(`${API_BASE_URL}/student/${id}`);
            setStudent(student)
            setIsLoading(false)
        }
        getStudent()
    }, []);
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {student ?
                <Cardview student={student} />
                :
                <div>Not Found</div>
            }

        </>
    )
}