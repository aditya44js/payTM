export function Appbar({user}){
    return <div>
        <div className="shadow h-14 flex justify-between items-center px-6">
            
            <div className="text-xl font-bold">
                PayTM App
            </div>

            <div className="flex items-center gap-3">
                
                <div className="text-sm font-medium">
                    Hello, {user}
                </div>

                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center">
                    <div className="text-lg">
                        {user[0].toUpperCase()}
                    </div>
                </div>

            </div>
        </div>
    </div>
}