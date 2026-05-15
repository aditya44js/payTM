export function Balance ({value}){
    return <div>
        <div className="flex items-center gap-2 p-4">
            <div className="font-bold text-lg">
                Your Balance
            </div>

            <div className="font-semibold text-lg">
                ₹ {value}
            </div>
        </div>
    </div>
}