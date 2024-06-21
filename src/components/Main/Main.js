import CharacterCard from "../CharacterCard/CharacterCard";
import "./Main.css";

const Main = ({ characters }) => {
  return (
    <main className="main">
      <section className="characters">
        {characters.map((char) => (
          <CharacterCard key={char.baseId} char={char} />
        ))}
      </section>
    </main>
  );
};

export default Main;
