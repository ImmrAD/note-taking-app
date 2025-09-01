import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext'; // To handle signing out
import apiClient from '../../api'; // To make API calls

// --- Interfaces ---
interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

// --- Your SVG Icons ---
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
    // --- State Management ---
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNoteContent, setNewNoteContent] = useState('');
    const { setToken } = useUser();

    // --- Data Fetching ---
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                
                const response = await apiClient.get('/api/notes', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotes(response.data);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };
        fetchNotes();
    }, []);

    // --- API Handlers ---
    const handleCreateNote = async () => {
        if (!newNoteContent.trim()) return;
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.post('/api/notes', 
                { content: newNoteContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNotes([response.data, ...notes]);
            setNewNoteContent(''); // Clear the input field
        } catch (error) {
            console.error("Failed to create note:", error);
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            const token = localStorage.getItem('token');
            await apiClient.delete(`/api/notes/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(notes.filter(note => note._id !== noteId));
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };
    
    const handleSignOut = () => {
        setToken(null); // This clears the token and triggers the redirect
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Your Navbar JSX is perfect, no changes needed */}
            <nav className="bg-white shadow-sm w-full">
                {/* ... Navbar code ... */}
            </nav>
            
            <main className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Your "Welcome" card is great, no changes needed */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    {/* ... Welcome card code ... */}
                </div>

                {/* --- Updated Create Note Form --- */}
                <div className="mb-8">
                    <textarea
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        rows={3}
                    />
                    <button
                        onClick={handleCreateNote}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-200"
                    >
                        Create Note
                    </button>
                </div>
                
                {/* --- Updated Notes List --- */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Notes</h3>
                    <div className="space-y-4">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div
                                    key={note._id}
                                    className="flex justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-md"
                                >
                                    <p className="text-gray-800 min-w-0 break-words">{note.content}</p>
                                    <button onClick={() => handleDeleteNote(note._id)} className="flex-shrink-0">
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