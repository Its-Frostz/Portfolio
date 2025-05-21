// Icons for icon mapping
import Github from "./components/Icons/Github.jsx";
import Instagram from "./components/Icons/Instagram.jsx";
import CV from "./components/Icons/CV.jsx";

export async function fetchData() {
  try {
    const response = await fetch("./Data/Data.json");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(new Error(error));
    return {};
  }
}

// Maps icon components to thier respective string names in data.json
export const iconMap = {
  Github: Github,
  Instagram: Instagram,
  CV: CV,
};


export function getNodes(parentSelector, root = document) {
  const el = DOM.get(parentSelector, root);

  if (!el) return {};

  const allowedNodes = ['div', 'span', 'svg', 'g', 'ellipse', 'path'].map(
    (node) => `${parentSelector} ${node}`
  );

  const children = DOM.getAll(allowedNodes.join(','), root);

  children.forEach((child) => {
    if (child.classList && child.classList[0]) {
      const childClass = child.classList[0].trim();
      el[camelCase(childClass)] = child || `.${childClass}`;
    }
  });

  return el;
}