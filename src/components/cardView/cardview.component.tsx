import logo from '../../assets/logo/Safepay-logo-02_navy.svg'
import logoName from '../../assets/nameLogo/Safepay-logo-01_navy.svg'
import { Student } from '../../types/user'

interface CardviewProps {
    student: Student | null; // Type the student prop
}

const Cardview: React.FC<CardviewProps> = ({ student }) => {
    if (!student?.name) {
        return null
    }
    return (
        <div className="card">
            <div className="header">
                <div className="logo">
                    <img src={logoName} alt="Profile" />
                </div>
                <div className="title">School</div>
            </div>
            <div className="content">
                <div className="profile-pic">
                    <img src={logo} alt="Profile" />
                </div>
                <div className="info">
                    <div className="item">
                        <strong>Name</strong>
                        <p>{student?.name}</p>
                    </div>
                    <div className="item">
                        <strong>Age</strong>
                        <p>{student?.age}</p>
                    </div>
                    <div className="item">
                        <strong>Class</strong>
                        <p>{student?.class}</p>
                    </div>
                    <div className="item">
                        <strong>Sex</strong>
                        <p>{student?.sex}</p>
                    </div>
                    <div className="item">
                        <strong>GPA</strong>
                        <p>{student?.gpa}</p>
                    </div>
                    <div className="item">
                        <strong>Siblings</strong>
                        <p>{student?.siblings}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cardview;