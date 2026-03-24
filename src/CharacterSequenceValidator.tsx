interface Props {
    password: string;
}

function CharacterSequenceValidator({ password }: Props) {

    let sequenceCount = 0;

    for (let i = 0; i < password.length - 3; i++) {
        const part = password.substring(i, i + 4);
        const hasLower   = /[a-z]/.test(part);
        const hasUpper   = /[A-Z]/.test(part);
        const hasNumber  = /[0-9]/.test(part);
        const hasSpecial = /[!@#$%^&*]/.test(part);
        if (hasLower && hasUpper && hasNumber && hasSpecial) sequenceCount++;
    }

    const valid = sequenceCount > 0;

    return (
        <p className={`validator-item mb-1 ${valid ? "valid" : "invalid"}`}>
            {valid ? "✓" : "✗"} Character variety:{" "}
            {valid ? `Good (${sequenceCount} mixed sequences)` : "Needs more variety"}
        </p>
    );
}

export default CharacterSequenceValidator;