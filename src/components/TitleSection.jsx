// Scss
import "../css/Components/TitleSection.scss";

export default function TitleSection({name, children}) {
  return (
    <section className="scene" id={`${name}`}>
      <div className="title-container">
        {children}
      </div>
    </section>
  );
}
