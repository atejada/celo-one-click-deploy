import React, { useState } from 'react';
import { useReadContract } from 'thirdweb/react';
import { getContract, createThirdwebClient } from 'thirdweb';
import { celoAlfajoresTestnet } from "thirdweb/chains";
import { getNFT } from "thirdweb/extensions/erc721";
import styles from '../styles/NFT.module.css';

const Gallery = () => {
  const [nftData, setNftData] = useState(null);
  const [selectedTokenId, setSelectedTokenId] = useState("0");

  const client = createThirdwebClient({ 
    clientId: import.meta.env.VITE_CLIENTID
  });
  
  const contract = getContract({
    client,
    address: import.meta.env.VITE_GALLERY_ADDRESS,
    chain: celoAlfajoresTestnet,
  });

  const availableTokens = [
    { value: "0", label: "Token #0" },
    { value: "1", label: "Token #1" },
    { value: "2", label: "Token #2" }
  ];

  const loadNFT = async (tokenId) => {
    try {
      const nft = await getNFT({
        contract,
        tokenId: tokenId,
      });
      setNftData(nft);
    } catch (error) {
      console.error('Error loading NFT:', error);
    }
  };

  const handleTokenChange = (selectedOption) => {
    setSelectedTokenId(selectedOption.value); 
    loadNFT(selectedOption);
  };

  React.useEffect(() => {
    loadNFT(selectedTokenId);
  }, []);

  return (
    <div>
    <br/><br/><br/><br/><br/>
	  <div className={styles.centered}>	
		<select 
			value={selectedTokenId}
			onChange={(e) => handleTokenChange(e.target.value)}
		>
			{availableTokens.map(token => (
			<option key={token.value} value={token.value}>
				{token.label}
			</option>
			))}
		</select>
      </div>

      {nftData && (
        <div>
          <br/><br/>
          <img 
            src={nftData.metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")} 
            width="500" 
            height="600" 
            alt={nftData.metadata.name}
          />
          <h2 className={styles.center}>{nftData.metadata.description}</h2>
        </div>
      )}
    </div>
  );
};

export default Gallery;

