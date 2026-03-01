import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50">
                <h1 className="text-xl font-semibold text-slate-700">Loading...</h1>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                {/* Logo / Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">CareerNova AI</h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        Login to continue your AI-powered career journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-sm text-center text-slate-600 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login