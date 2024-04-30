import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const clickHandle = () => {
    navigate(`/`);
  };

  return (
    <header>
      <button onClick={clickHandle}>Home</button>
      <h1>Huddle Utilities</h1>
    </header>
  );
}
