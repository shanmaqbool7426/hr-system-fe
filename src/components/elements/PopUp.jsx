export default function PopUp({ children, heading, closeHandler }) {
    return <div className="fixed bg-gray-700/90 h-screen w-screen top-0 left-0 flex justify-center items-center">
        <div className="w-full max-w-2xl p-6 rounded-lg bg-gray-200 border border-gray-300 relative">
            <span className="absolute cursor-pointer right-4 top-2" onClick={closeHandler}>&times;</span>
            <h2 className="text-3xl">{heading || ""}</h2>
            {children}
        </div>
    </div>
}