import { useState } from 'react';
import { signIn } from '../auth/authFunctions';
import './Modal.css';

const SignInModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signIn(email, password);
        onClose();
    } catch (error) {
        alert(error.message);
    }
    };

    return (
    <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
        </form>
        </div>
    </div>
    );
};

export default SignInModal;