import { useParams } from "react-router-dom";

export default function ProductDetail(props: object) {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <p>product details id is</p>
      {id}
    </div>
  );
}
