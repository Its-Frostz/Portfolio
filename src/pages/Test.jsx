import React from "react";
import Potion from "@/components/Toons/Potion/Potion.jsx";
import Hexo from "@/components/Toons/Hexo/Hexo.jsx";
import Monsier from "@/components/Toons/Monsier/Monsier.jsx";
import Shrimp from "@/components/Toons/Shrimp/Shrimp.jsx";

export default function Test() {
  return (
    <>
      <Potion isPlaying={true} />
      <Hexo isPlaying={true} />
      <Monsier isPlaying={true} />
      <Shrimp isPlaying={true} />
    </>
  );
}
