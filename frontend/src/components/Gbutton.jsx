export function Gbutton({ label, onClick }) {
    return (
        <div className="w-full pt-4">
            <button
                onClick={onClick}
                type="button"
                className="w-full text-white bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
            >
                {label}
            </button>
        </div>
    )
}