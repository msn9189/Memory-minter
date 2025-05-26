import { useState } from "react";
import { useAccount, useWriteContract } from 'wagmi';
//import miniApp from './farcaster';
import { wagmiConfig } from "./wagmiConfig";

function App() {
    const [memory, setMemory] = useState('');
    const { isConnected } = useAccount({ config: wagmiConfig });
    const { data: txHash } = useWriteContract();

    const handleSubmit = async (e) => {
        e.prevenDefault();
        try {
            await writeContract({
              address: "0xA3C83D214eb74A41f144048294e9790131908198",
              abi: [
                {
                  name: "mintMemory",
                  type: "function",
                  inputs: [{ name: "_memory", type: "string" }],
                  outputs: [],
                  stateMutability: "nonpayable",
                },
              ],
              functionName: "mintMemory",
              args: [memory],
            });
        } catch (error) {
            console.error('Error minting memory:', error);
        }
    };

    if (txHash) {
        return (
            <div>
                <p>Transaction Hash: {txHash}</p>
            </div>
        );
    }

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