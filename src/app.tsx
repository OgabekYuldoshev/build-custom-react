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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="hidden sm:inline font-medium">GitHub</span>
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