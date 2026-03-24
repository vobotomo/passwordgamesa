import { useState, useEffect } from "react";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import CharacterSequenceValidator from "./CharacterSequenceValidator";
import PasswordTimeValidator from "./PasswordTimeValidator";
import CountryFlagValidator from "./CountryFlagValidator";
import "./App.css";

function evaluatePassword(password: string): string {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const score = (hasMinLength ? 1 : 0)
        + (hasUpperCase ? 1 : 0)
        + (hasNumber ? 1 : 0)
        + (hasSpecialChar ? 1 : 0);

    if (score >= 4) return "Strong";
    if (score >= 2) return "Medium";
    return "Weak";
}

function App() {

    const [password, setPassword] = useState("");
    const [createdAt, setCreatedAt] = useState(Date.now());
    const [passwordStrength, setPasswordStrength] = useState("—");

    useEffect(() => {
        const strength = evaluatePassword(password);
        setPasswordStrength(strength);
    }, [password]);

    useEffect(() => {
        document.title = `Password strength: ${passwordStrength}`;
    }, [passwordStrength]);

    useEffect(() => {
        const emojis = ["😜", "🔥", "💀", "👻", "🤡", "💥", "🎃", "⚡"];

        const sabotageInterval = setInterval(() => {
            setPassword(prevPassword => {
                if (prevPassword.length === 0) return prevPassword;

                const action = Math.random() < 0.5 ? "add" : "remove";

                if (action === "add") {
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    return prevPassword + randomEmoji;
                } else {
                    const chars = [...prevPassword];
                    if (chars.length === 0) return prevPassword;
                    const index = Math.floor(Math.random() * chars.length);
                    chars.splice(index, 1);
                    return chars.join("");
                }
            });
        }, 10000);

        return () => clearInterval(sabotageInterval);
    }, []);

    const handlePasswordChange = (newPassword: string) => {
        if (password === "") setCreatedAt(Date.now());
        setPassword(newPassword);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 px-3">
            <div className="card card-custom p-4" style={{ width: "100%", maxWidth: "420px" }}>

                <h2 className="app-title text-center mb-1">Password Checker</h2>
                <p className="text-center mb-4" style={{ color: "var(--muted-text)", fontSize: "0.85rem" }}>
                    Check the strength of your password
                </p>

                <PasswordInput
                    password={password}
                    setPassword={handlePasswordChange}
                />

                <hr style={{ borderColor: "var(--border-color)", margin: "20px 0" }} />

                <PasswordStrength password={password} strength={passwordStrength} />

                <hr style={{ borderColor: "var(--border-color)", margin: "16px 0 12px" }} />

                <CharacterSequenceValidator password={password} />
                <PasswordTimeValidator password={password} createdAt={createdAt} />
                <CountryFlagValidator password={password} />

            </div>
        </div>
    );
}

export default App;