export default function CreateGame() {
    return (
        <>
            <div className="flex text-3xl justify-center items-center font-bold text-gray-900">
                <button type="button" className="text-gray-900 text-3xl size-25 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:text-cyan-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    
                    <span className="material-symbols-outlined mx-auto text-center relative top-3" style={{fontSize: '45px'}}>stadia_controller</span>
                    <span className="material-symbols-outlined text-cyan-300 relative left-6 -top-17" style={{fontSize: '50px'}}>add</span>
                </button>
            </div>
        </>
    )
}