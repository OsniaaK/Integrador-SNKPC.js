export const select = (selector) => document.querySelector(selector)
export const selectAll = (selector) => document.querySelectorAll(selector) 

export const read = (key) => JSON.parse(localStorage.getItem(key));

export const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  return read(key);
};

export const create = (element="", content="", attributes={}) => {
  const tag = document.createElement(element)
  tag.innerHTML=content;
  Object.keys(attributes).forEach((attribute) => tag.setAttribute(attribute, attributes[attribute]));
  return tag;
}