import './narbar.style.css';
import logoName from '../../assets/nameLogo/Safepay-logo-01_navy.svg'
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div onClick={() => navigate(`/`)} className="navbar-logo">
        <img src={logoName} alt="Logo" />
      </div>
      <Link className="navbar-link" to="/lookup" relative="path">
        Lookup
      </Link>
      <p className='title'>SCHOOL</p>
    </nav>
  );
};

export default Navbar;
