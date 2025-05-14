import React from 'react'
import '../css/Components/TitleSection.scss'

export default function TitleSection(props) {
  return (
    <section className="scene" id={`${props.name}`}>
      <div className="title-container">
        {props.children}
      </div>
    </section>
  )
}
