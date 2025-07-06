/** @jsx CustomReact.createElement */
import { Counter } from "./counter"
import CustomReact from "./custom-react"

export function App() {
    CustomReact.useEffect(() => {
        console.log("useEffect is working")
    }, [])

    return (
        <section className="min-h-screen bg-white">
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                <div className="text-xl font-semibold text-gray-900">Build Custom React</div>
                <a href="https://github.com/OgabekYuldoshev/build-custom-react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <span className="font-medium">GitHub</span>
                </a>
            </nav>
            <main className="flex flex-col items-center justify-center px-8 py-12 text-center max-w-4xl mx-auto">
                <div className="mb-12">
                    <svg className="w-20 h-20 text-blue-500 spin-slow" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                        <path d="M12 1a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2" />
                        <path d="M2 12h20" stroke="currentColor" stroke-width="2" />
                        <path d="M12 2a15.3 15.3 0 0 0-10 4 15.3 15.3 0 0 0 10 4 15.3 15.3 0 0 0 10-4 15.3 15.3 0 0 0-10-4z" stroke="currentColor" stroke-width="2" />
                        <path d="M12 22a15.3 15.3 0 0 1-10-4 15.3 15.3 0 0 1 10-4 15.3 15.3 0 0 1 10 4 15.3 15.3 0 0 1-10 4z" stroke="currentColor" stroke-width="2" />
                    </svg>
                </div>

                <div className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight flex flex-col">
                    <span>This is my own</span>
                    <span className="font-semibold text-blue-500">React version</span>
                </div>

                <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
                    A minimal implementation built from scratch to understand the core concepts and inner workings of React.
                </p>

                <div className="flex flex-col items-center gap-6">
                    <Counter />
                </div>
            </main>
        </section>
    )
}