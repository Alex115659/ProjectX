import { useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { getDocs, collection } from "firebase/firestore";
import "../styles/board.css"

function Board() {
    const [senders, setSenders] = useState([]); 
    const [input, setInput] = useState(""); 
    const [filteredSenders, setFilteredSenders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchSenders() {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, "senders"));
                const sendersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                sendersList.sort((a, b) => b.amount - a.amount);
                setSenders(sendersList);
                setFilteredSenders(sendersList); 
            } catch (error) {
                console.error("Error durring claiming the data:", error);
            } finally {
                setLoading(false);
            }
            
        }

        fetchSenders();
    }, []);

    useEffect(() => {
        if (!input.trim()) {
            setFilteredSenders(senders); 
            return;
        }

        const searchValue = input.toLowerCase();
        const results = senders.filter((sender) =>
            sender.nickname.toLowerCase().includes(searchValue)
        );

        setFilteredSenders(results);
    }, [input, senders]);

    return (
        <div className="board">
            <h2>Senders List</h2>
            <div className="searching-system">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search by nickname..."
            />

            </div>

            <div className="description">
                <h2>
                    Nickname
                </h2>
                <h2>
                    Amount
                </h2>
            </div>

            {loading && <p>Loading...</p>}

            <ol type="number">
                {filteredSenders.length > 0 ? (
                    filteredSenders.map((sender) => (
                        <li key={sender.id}>{sender.nickname}  <span> {sender.amount} </span></li>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </ol>
        </div>
    );
}

export default Board;

