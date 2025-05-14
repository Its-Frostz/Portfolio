import React from 'react'
import TextBlock from './TextBlock'
export default function TitleFunction(props) {
  return (
    <div>
      <h1 className="title">
        {props.children}
        {props.params&&(
          <span>
            (<span className="params">{props.params}</span>)
          </span>
        )}
      </h1>
      {props.subtitle&&(
        
        <TextBlock>
          <p className="-gray">{props.subtitle}</p>
        </TextBlock>
      )}
    </div>
  )
}
