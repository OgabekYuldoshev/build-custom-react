/** @jsx CustomReact.createElement */
import CustomReact from "./custom-react"

export function App() {
    const [state, setState] = CustomReact.useState(1)

    const handleCount = () => {
        setState((p) => p + 1)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="text-center space-y-8">
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-tight">
                    Hello, This is my own react version
                </h1>

                <button
                    onClick={handleCount}
                    className="px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                    Count: {state}
                </button>
            </div>
        </div>
    )
}