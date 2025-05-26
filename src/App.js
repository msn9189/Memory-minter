import { useState } from "react";
import { useAccount, useWriteContract } from 'wagmi';
import miniApp from './farcaster';
import { wagmiConfig } from "./wagmiConfig";

function App() {
    const [memory, setMemory] = useState('');
    const { address, isConnected } = useAccount({ config: wagmiConfig });

    const handleSubmit = async (e) => {
        e.prevenDefault();
    };

    return (
        <div>
            <h1>Memory App</h1>
            {isConnected ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="Write your memory..."
                    rows='5'
                    cols='50'
                    />
                    <br />
                    <button type="submit">Mint Memory</button>
                </form>
            ) : (
                <p>Please connect your wallet</p>
            )}
        </div>
    );
}
export default App;