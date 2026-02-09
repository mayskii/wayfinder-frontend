import { useState } from 'react';
import { signUp } from '../auth/authFunctions';
import './Modal.css';

const SignUpModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signUp(email, password);
        onClose();
    } catch (error) {
        alert(error.message);
    }
    };

    return (
    <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
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
            <button type="submit">Sign Up</button>
        </form>
        </div>
    </div>
    );
};

export default SignUpModal;
