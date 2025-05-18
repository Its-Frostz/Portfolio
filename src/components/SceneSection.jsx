// SCSS
import "../css/Components/SceneSection.scss";

export default function SceneSection({ children, container }) {
  return (
    <section className="scene">
      <div className="static-container">
        {children}
      </div>
      <div className="container">
        {container}
      </div>
    </section>
  );
}
