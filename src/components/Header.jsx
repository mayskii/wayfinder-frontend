import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { logOut } from '../auth/authFunctions';
import SignInModal from './SingInModal';
import SignUpModal from './SingUpModal';
import './Header.css';

const Header = () => {
    const { user } = useAuth();
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    return (
    <header className='header'>
        <h2 className="logo">Wayfinder</h2>
        <div className='auth-buttons'>
        {!user ? (
            <>
            <button onClick={() => setShowSignIn(true)}>Sign In</button>
            <button onClick={() => setShowSignUp(true)}>Sign Up</button>
            </>
        ) : (
            <>
            <span>Welcome, {user.email}</span>
            <button onClick={logOut}>Sign Out</button>
            </>
        )}
        </div>

        {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
        {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </header>
    );
};

export default Header;