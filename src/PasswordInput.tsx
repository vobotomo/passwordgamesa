import { useState } from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (newPassword: string) => void;
}

function PasswordInput({ password, setPassword }: PasswordInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group">
            <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="btn primary-btn"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    );
}

export default PasswordInput;