import { useAuth } from '../auth/useAuth';
import { signIn, signUp, logOut } from '../auth/authFunctions';

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = '123456';


const Header = () => {
    const { user } = useAuth();

    const handleSignIn = async () => {
    try {
        await signIn(TEST_EMAIL, TEST_PASSWORD);
    } catch (e) {
        alert(e.message);
    }
    };

    const handleSignUp = async () => {
    try {
        await signUp(TEST_EMAIL, TEST_PASSWORD);
    } catch (e) {
        alert(e.message);
    }
    };

    const handleSignOut = async () => {
    await logOut();
    };




    return (
    <header className='header'>
        <h2>Wayfinder</h2>
        <div className='auth-buttons'>
        {user ? (
            <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleSignOut}>Sign Out</button>
            </>
        ) : (
            <>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignUp}>Sign Up</button>
            </>
        )}
        </div>
    </header>
    );
};

export default Header;