/** @jsx CustomReact.createElement */
import CustomReact from "./custom-react"


export function Counter() {
    const [state, setState] = CustomReact.useState(1)

    return (
        <button
            onClick={() => setState(p => p + 1)}
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 active:scale-95">
            Click to Count: {state}
        </button>
    )
}
