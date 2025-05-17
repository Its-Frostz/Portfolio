// Utility Component
import TextBlock from "./TextBlock";

export default function TitleFunction(props) {
  function purp() {
    if (props.purple != null) {
      return (
        <>
          <span className="func">{props.purple}(</span>
          <span className="params">{props.params}</span>
          <span className="func">)</span>
        </>
      );
    } else {
      return (
        <>
          (<span className="params">{props.params}</span>)
        </>
      );
    }
  }
  return (
    <div>
      <h1 className="title">
        {props.children}
        {props.params && <span>{purp()}</span>}
      </h1>
      {props.subtitle && (
        <TextBlock>
          <p className="-gray">{props.subtitle}</p>
        </TextBlock>
      )}
    </div>
  );
}
