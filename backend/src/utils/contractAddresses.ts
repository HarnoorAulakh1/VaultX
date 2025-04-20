import { provider, provider_bsc ,provider_eth,provider_bsc1} from "../index.js";



  export function getProvider(network:string){
    if (network === "Ethereum") {
      return provider_eth;
    } else if (network === "BSC") {
      return provider_bsc1;
    } else {
      return null;
    }
  }