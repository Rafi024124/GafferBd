import Image from "next/image";
import ProductHighlights from "./productHighlights/page";
import Hero from "./components/Hero";

export default function Home() {
  return (
   <>
     <Hero></Hero>
    <ProductHighlights></ProductHighlights>
   </>
  );
}
