// React and stuff
import { useEffect, useState } from "react";

/**
 * Icons used for mapping in the application.
 * These icons are imported from the components/Icons directory.
 */
import Github from "./components/Icons/Github.jsx";
import Instagram from "./components/Icons/Instagram.jsx";
import CV from "./components/Icons/CV.jsx";

// Progress bar
import NProgress from "nprogress";

/**
 * Fetches data from the Data.json file.
 * @returns {Promise<Object>} The parsed JSON data from Data.json
 * @throws {Error} If there's an error fetching or parsing the data
 */
export async function fetchData() {
  try {
    startProgress();
    const response = await fetch("./Data/Data.json");
    const json = await response.json();
    completeProgress();
    return json;
  } catch (error) {
    console.error(new Error(error));
    completeProgress();
    return {};
  }
}

/**
 * Maps icon component names to their respective React components.
 * Used to dynamically render icons based on string identifiers from data.
 */
export const iconMap = {
  Github: Github,
  Instagram: Instagram,
  CV: CV,
};

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 * @param {number} min - The minimum value (inclusive)
 * @param {number} max - The maximum value (inclusive)
 * @returns {number} A random integer between min and max
 */
export function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * DOM utility object providing methods for element selection.
 * Simplifies common DOM query operations.
 */
export const DOM = {
  get: (selector) => document.querySelector(selector),
  getAll: (selector) => [...document.querySelectorAll(selector)],
};

/**
 * Converts a string to camelCase format.
 * Handles spaces, hyphens, and underscores as word separators.
 * @param {string} str - The string to convert
 * @returns {string} The camelCased string
 */
export function camelCase(str) {
  return str
    .toLowerCase()
    .replace(/([-_\s][a-z])/g, (group) =>
      group.toUpperCase().replace(/[-_\s]/g, "")
    );
}

/**
 * Retrieves child nodes of a parent element and maps them to a structured object.
 * Only processes nodes with valid class names and specific HTML elements.
 * @param {string} parentSelector - CSS selector for the parent element
 * @param {Document|HTMLElement} [root=document] - The root element to search within
 * @returns {Object} An object with camelCased class names as keys and corresponding elements as values
 */
export function getNodes(parentSelector, root = document) {
  const el = DOM.get(parentSelector, root);

  if (!el) return {};

  const allowedNodes = ["div", "span", "svg", "g", "ellipse", "path", "circle"].map(
    (node) => `${parentSelector} ${node}`
  );

  const children = DOM.getAll(allowedNodes.join(","), root);

  children.forEach((child) => {
    if (child.classList && child.classList[0]) {
      const childClass = child.classList[0].trim();
      el[camelCase(childClass)] = child || `.${childClass}`;
    }
  });

  return el;
}

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  
  // Define breakpoints
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1024;
  const isDesktop = width > 1024;
  
  return { width, isMobile, isTablet, isDesktop };
};

export function isReverse(e) {
  return e.scrollDirection === "REVERSE";
}

export function isForward(e) {
  return e.scrollDirection === "FORWARD";
}

/**
 * NProgress utilities for showing loading bar during navigation
 * Configures and exposes methods to control the progress bar
 */

// Configure NProgress
NProgress.configure({
  minimum: 0.1,
  easing: 'ease',
  speed: 500,
  showSpinner: true,
  trickleSpeed: 200
});

/**
 * Starts the progress bar
 */
export const startProgress = () => {
  NProgress.start();
};

/**
 * Sets the progress to a specific value (0-1)
 * @param {number} progress - Value between 0 and 1
 */
export const setProgress = (progress) => {
  NProgress.set(progress);
};

/**
 * Completes the progress and hides the bar
 */
export const completeProgress = () => {
  NProgress.done();
};
