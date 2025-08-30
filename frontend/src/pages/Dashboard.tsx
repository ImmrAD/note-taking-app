import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm4.356 1.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.636 4.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM5.636 14.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM4.356 5.636a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    </div>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const Dashboard = () => {
    const [notes, setNotes] = useState<string[]>(['Note 1', 'Note 2']);
    const navigate = useNavigate();

    const handleCreateNote = () => {
        const newNote = `New Note ${notes.length + 1}`;
        setNotes([...notes, newNote]);
    };

    const handleDeleteNote = (indexToDelete: number) => {
        setNotes(notes.filter((_, index) => index !== indexToDelete));
    };
    
    const handleSignOut = () => {
        console.log("Signing out...");
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm w-full">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <LogoIcon />
                            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="text-sm font-medium text-blue-600 hover:underline focus:outline-none"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

         
            <main className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
              
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1 break-words">
                        Welcome, Jonas Kahnwald !
                    </h2>
                    <p className="text-gray-600 break-words">Email: xxxxxx@xxxx.com</p>
                </div>

                <button
                    onClick={handleCreateNote}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200 mb-8"
                >
                    Create Note
                </button>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Notes</h3>
                    <div className="space-y-4">
                        {notes.length > 0 ? (
                            notes.map((note, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-md"
                                >
                                    <p className="text-gray-800 min-w-0 break-words">{note}</p>
                                    <button onClick={() => handleDeleteNote(index)} className="flex-shrink-0">
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 bg-white py-8 px-4 rounded-lg shadow-md">
                                <p>No notes yet. Create one!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;