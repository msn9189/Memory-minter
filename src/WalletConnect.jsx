import { useConnect } from "wagmi";
import { wagmiConfig } from './wagmiConfig';

function WalletConnect() {
    const { connect, connectors, error, isLoading } = useConnect({ config: wagmiConfig });

    return (
        <div>
            {connectors.map((connector) => (
                <button
                key={connector.id}
                onClick={() => connect({ connector })}
                disabled={isLoading}
                style={{ padding: '10px', margin: '5px'}}
                >
                    {isLoading && connector.id === connectors[0].id ? 'Connecting' : `Connect with ${connector.name}`}
                </button>
            ))}
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    );
}

export default WalletConnect;