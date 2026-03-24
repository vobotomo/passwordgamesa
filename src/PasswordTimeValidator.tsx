import { useEffect, useState } from "react";

interface Props {
    password: string;
    createdAt: number;
}

function PasswordTimeValidator({ password, createdAt }: Props) {

    const [timeTaken, setTimeTaken] = useState(0);

    useEffect(() => {
        if (!password) return;
        setTimeTaken((Date.now() - createdAt) / 1000);
    }, [password, createdAt]);

    const valid = timeTaken >= 5;

    return (
        <p
            className={`validator-item mb-0 ${valid ? "valid" : ""}`}
            style={!valid ? { color: "var(--warning-color)" } : {}}
        >
            {valid ? "✓" : "⚠"} Input time: {timeTaken.toFixed(2)}s
            {!valid && " — type more carefully"}
        </p>
    );
}

export default PasswordTimeValidator;