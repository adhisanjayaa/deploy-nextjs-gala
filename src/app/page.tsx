import Navbar from "@/components/navbar";
import ProductShow from "@/components/products";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <main className="m-2">
        <ProductShow></ProductShow>
      </main>
    </div>
  );
}
