import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ItemPage() {
  let { ItemId } = useParams();
  console.log(ItemId);
  return (
    <div>
      <Navbar />
    </div>
  );
}
