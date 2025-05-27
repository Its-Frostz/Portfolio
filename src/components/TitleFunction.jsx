// Utility Component
import TextBlock from "./TextBlock";

export default function TitleFunction({purple, params, subtitle, children}) {
  function purp() {
    if (purple != null) {
      return (
        <>
          <span className="func">{purple}(</span>
          <span className="params">{params}</span>
          <span className="func">)</span>
        </>
      );
    } else {
      return (
        <>
          (<span className="params">{params}</span>)
        </>
      );
    }
  }
  return (
    <div>
      <h1 className="title">
        {children}
        {params && <span>{purp()}</span>}
      </h1>
      {subtitle && (
        <TextBlock>
          <p className="-gray">{subtitle}</p>
        </TextBlock>
      )}
    </div>
  );
}
