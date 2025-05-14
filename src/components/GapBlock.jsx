import React from 'react'
import '../css/Components/Gapblock.scss'

export default function GapBlock(props) {
  return (
    <div className={`gap${props.isFull? ' full':''}`}></div>
  )
}
