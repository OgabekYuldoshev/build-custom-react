/** @jsx CustomReact.createElement */
import CustomReact from "./custom-react"

export function App() {
    const handleSayHi = () => {
        alert("Hi")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
                    Hello, This is my own react version
                </h1>

                <button
                    onClick={handleSayHi}
                    className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                    Say hi
                </button>
            </div>
        </div>
    )
}