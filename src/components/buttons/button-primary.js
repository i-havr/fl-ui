export function ButtonPrimary(children, classes = "", link = "", id = "") {
  if (!link) {
    return `    
    <button ${id ? `id="${id}` : ""} type="button" class="shrink-0 flex justify-center items-center hover:opacity-85 active:opacity-75 transition-opacity ${classes}">    
      ${children}
    </button>`;
  } else {
    return `    
    <a ${id ? `id="${id}` : ""} href="${link}" data-link class="shrink-0 flex justify-center items-center hover:opacity-85 active:opacity-75 transition-opacity ${classes}">    
      ${children}
    </a>`;
  }
}
