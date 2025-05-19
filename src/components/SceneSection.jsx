// SCSS
import "../css/Components/SceneSection.scss";

export default function SceneSection({ children, container, id }) {
  return (
    <section className="scene" id={id}>
      <div className="static-container">
        {children}
      </div>
      <div className="container">
        {container}
      </div>
    </section>
  );
}
