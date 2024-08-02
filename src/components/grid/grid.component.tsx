import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowEditStopReasons,
    GridSlots,
} from '@mui/x-data-grid';

import { Student, UpdateResponse } from '../../types/user'
import { API_BASE_URL } from '../../constant/appConstant';
import { createData, updateData, deleteData } from '../../utils/data.utils';

interface EditToolbarProps {
    setStudentList: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

export default function Grid({ setRowModesModel, rowModesModel, setStudentList, studentList, setIsLoading, handleRowClick }: any) {

    function EditToolbar(props: EditToolbarProps) {
        const { setStudentList, setRowModesModel } = props;
    
        const handleClick = () => {
            const uuid = studentList[studentList.length - 1]?.uuid + 1;
            setStudentList((oldRows) => [...oldRows, { uuid, name: '', age: '', isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [uuid]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
            }));
        };
    
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon color="primary" />} onClick={handleClick}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }
    

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId, row: Student) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        await deleteData(`${API_BASE_URL}/student/${id}`)
        setStudentList(studentList?.filter((row: Student) => row.uuid !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = studentList?.find((row: Student) => row.uuid === id);
        if (editedRow!.isNew) {
            setStudentList(studentList?.filter((row: Student) => row.uuid !== id));
        }
    };

    const processRowUpdate = async (newRow: Student) => {
        if (newRow.age && newRow.class && newRow.gpa && newRow.name && newRow.sex && newRow.siblings) {
            setIsLoading(true)
            const updatedRow = { ...newRow, isNew: false };
            const res = await newRow.isNew ?
                createData<UpdateResponse, Student>(`${API_BASE_URL}/student`, newRow)
                :
                updateData<UpdateResponse, Student>(`${API_BASE_URL}/student/${newRow.uuid} `, newRow)
            if (!res) {
                alert("We are facing issue!");
                return updatedRow
            }
            setStudentList(studentList?.map((row: Student) => (row.uuid === newRow.uuid ? updatedRow : row)));
            alert("Successful");
            setIsLoading(false)
            return updatedRow;
        } else {
            alert('Please fill the form!');
            return newRow
        }
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'gpa',
            headerName: 'GPA',
            type: 'number',
            width: 180,
            editable: true,
        },
        {
            field: 'class',
            headerName: 'Class',
            width: 220,
            editable: true,
            type: 'number'
        },
        {
            field: 'sex',
            headerName: 'Sex',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Male', 'Female'],
        },
        {
            field: 'siblings',
            headerName: 'Siblings',
            width: 220,
            editable: true,
            type: 'number'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon color="primary" />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id, row)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon color="primary" />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon color="primary" />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <DataGrid
            getRowId={(row: Student) => row.uuid ?? 0}
            rows={studentList}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onRowClick={handleRowClick}
            slots={{
                toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
                toolbar: { setStudentList, setRowModesModel },
            }}
        />
    )
}
