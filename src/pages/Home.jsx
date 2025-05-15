import React from 'react'
// Util components
import GapBlock from '../components/GapBlock.jsx'
import TitleFunction from '../components/TitleFunction.jsx'
import TitleSection from '../components/TitleSection.jsx'

// Home components
import Intro from '../components/Home/Intro.jsx'

import '../css/pages/Home.scss'

export default function Home() {
  return (
    <div id="home" className="wrapper">
      <Intro />
      <GapBlock />

      <TitleSection name="curriculum">
        <TitleFunction params="/_life/..." subtitle="<VitaeJournal>">Summarization</TitleFunction>
      </TitleSection>

      <TitleSection name="Scene1">
        <TitleFunction purple='.Wings' params="2007" subtitle="The journey begins... Enjoy ;)">Player</TitleFunction>
      </TitleSection>

    </div>
  )
}
