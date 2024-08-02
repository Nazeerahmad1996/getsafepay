import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/loader.component'
import Grid from '../grid/grid.component';
import { getData } from '../../utils/data.utils'
import { API_BASE_URL } from '../../constant/appConstant'
import { Student } from '../../types/user'
import Box from '@mui/material/Box';
import './student-list.style.css'

import {
    GridRowModesModel,
    GridRowParams,
} from '@mui/x-data-grid';



const StudentList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [studentList, setStudentList] = useState<Student[]>()
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const navigate = useNavigate();


    const handleRowClick = (params: GridRowParams) => {
        navigate(`/view/${params.id}`);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            const students: Student[] = await getData<Student[]>(`${API_BASE_URL}/students`);
            setStudentList(students)
            setIsLoading(false)
        }
        fetchStudents();
    }, [])
    if (isLoading) {
        return <Loader />
    }

    return (
        <div style={{ margin: 40 }}>

            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <Grid
                    setRowModesModel={setRowModesModel}
                    rowModesModel={rowModesModel}
                    setStudentList={setStudentList}
                    studentList={studentList}
                    setIsLoading={setIsLoading}
                    handleRowClick={handleRowClick}
                />
            </Box>
        </div>
    );
}

export default StudentList
