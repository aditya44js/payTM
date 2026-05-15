export function Button({label,onClick}){
    return (
        <div className="w-full pt-4">
            <button
                onClick={onClick}
                type="button"
                className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
            >
                {label}
            </button>
        </div>
    )
}