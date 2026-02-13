"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

interface Room {
    id: number;
    slug: string;
    createdAt: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    async function fetchRooms() {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/signin");
            return;
        }

        try {
            const res = await axios.get("http://localhost:3001/api/room/user/rooms", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRooms(res.data.rooms || []);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setError("Failed to load your boards");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCreateBoard() {
        if (!newBoardName.trim()) {
            setError("Please enter a board name");
            return;
        }

        setIsCreating(true);
        setError("");
        const token = localStorage.getItem("token");

        try {
            const res = await axios.post(
                "http://localhost:3001/api/room/createRoom",
                { slug: newBoardName.trim().toLowerCase().replace(/\s+/g, "-") },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const roomId = res.data.roomId;
            router.push(`/canvas/${roomId}`);
        } catch (err: any) {
            const message = err.response?.data?.msg || "Failed to create board";
            setError(message);
            setIsCreating(false);
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Draftly</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                router.push("/signin");
                            }}
                            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Boards</h1>
                        <p className="text-gray-500 mt-1">Create and manage your collaborative whiteboards</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg shadow-gray-900/20"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Board
                    </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <svg className="w-8 h-8 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && rooms.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No boards yet</h3>
                        <p className="text-gray-500 mb-6">Create your first collaborative whiteboard to get started</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Your First Board
                        </button>
                    </div>
                )}

                {/* Boards Grid */}
                {!isLoading && rooms.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Create New Card */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="group h-48 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600">Create New Board</span>
                        </button>

                        {/* Board Cards */}
                        {rooms.map((room) => (
                            <Link
                                key={room.id}
                                href={`/canvas/${room.id}`}
                                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                            >
                                {/* Preview Area */}
                                <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                                    {/* Decorative shapes */}
                                    <div className="absolute top-4 left-4 w-16 h-10 rounded border-2 border-blue-300 bg-blue-50/50"></div>
                                    <div className="absolute top-6 left-24 w-12 h-12 rounded-full border-2 border-purple-300 bg-purple-50/50"></div>
                                    <div className="absolute bottom-4 right-4 w-20 h-8 rounded border-2 border-green-300 bg-green-50/50"></div>
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg transition-opacity">
                                            Open Board
                                        </span>
                                    </div>
                                </div>
                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate">{room.slug}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Created {formatDate(room.createdAt)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            {/* Create Board Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => {
                            setShowModal(false);
                            setError("");
                            setNewBoardName("");
                        }}
                    ></div>

                    {/* Modal */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Create New Board</h2>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setError("");
                                    setNewBoardName("");
                                }}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Board Name
                                </label>
                                <input
                                    type="text"
                                    value={newBoardName}
                                    onChange={(e) => setNewBoardName(e.target.value)}
                                    placeholder="e.g., Project Brainstorm"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleCreateBoard();
                                    }}
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setError("");
                                        setNewBoardName("");
                                    }}
                                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateBoard}
                                    disabled={isCreating}
                                    className="flex-1 px-4 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isCreating ? (
                                        <>
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            Create Board
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


