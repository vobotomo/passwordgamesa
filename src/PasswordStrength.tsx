interface PasswordStrengthProps {
    password: string;
    strength: string;
}

function PasswordStrength({ password, strength }: PasswordStrengthProps) {

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const score = (hasMinLength ? 1 : 0)
        + (hasUpperCase ? 1 : 0)
        + (hasNumber ? 1 : 0)
        + (hasSpecialChar ? 1 : 0);

    let barColor = "var(--danger-color)";

    if (score >= 4) barColor = "var(--success-color)";
    else if (score >= 2) barColor = "var(--warning-color)";

    const criteria = [
        { met: hasMinLength,   text: "At least 8 characters" },
        { met: hasUpperCase,   text: "Uppercase letter" },
        { met: hasNumber,      text: "Number" },
        { met: hasSpecialChar, text: "Special character (!@#$%^&*)" },
    ];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="section-label">Password Strength</span>
                <span style={{ fontSize: "0.82rem", color: barColor, fontWeight: 600 }}>
                    {password ? strength : "—"}
                </span>
            </div>

            <div className="progress mb-3">
                <div
                    className="progress-bar"
                    style={{
                        width: `${(score / 4) * 100}%`,
                        backgroundColor: barColor,
                        transition: "width 0.3s ease, background-color 0.3s ease",
                    }}
                />
            </div>

            <ul className="list-unstyled mb-0">
                {criteria.map((c) => (
                    <li
                        key={c.text}
                        className={`validator-item ${c.met ? "valid" : "invalid"}`}
                    >
                        {c.met ? "✓" : "✗"} {c.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PasswordStrength;