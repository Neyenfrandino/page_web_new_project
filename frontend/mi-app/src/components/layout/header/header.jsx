
import './header.scss';

const Header = ({ children }) => {
    return (
        <header className='header__container'>
            <div className='header__content'>
                { children }
            </div>
        </header>
    );
};

export default Header;