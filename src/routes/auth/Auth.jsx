import './Auth.scss';
import { NavLink, Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="auth">
      <ul className="auth__list">
        <li className="auth__item">
          <NavLink to="auth"></NavLink>
          <Outlet />
        </li>
      </ul>
    </div>
  );
}

export default Auth