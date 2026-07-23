const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${checked ? "bg-green-500" : "bg-gray-300"
                }`}
        >
            <span
                className={`h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${checked ? "translate-x-8" : "translate-x-1"
                    }`}
            />
        </button>
    );
};

export default ToggleSwitch;