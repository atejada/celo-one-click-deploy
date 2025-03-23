import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SendCelo from "./components/SendCelo";
import NFT from "./components/NFT";
import Gallery from "./components/Gallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<SendCelo />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/mint" element={<NFT />} />
          </Routes>
        </Router>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default App;
