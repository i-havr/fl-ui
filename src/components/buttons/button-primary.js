export function ButtonPrimary(
  children,
  classes = "",
  link = "",
  id = "",
  clickAction = ""
) {
  if (!link) {
    return `    
    <button ${id ? `id=${id}` : ""} type="button" class="shrink-0 flex justify-center items-center hover:opacity-85 active:opacity-75 transition-opacity ${classes}" @click.stop=${clickAction}>    
      ${children}
    </button>`;
  } else {
    return `    
    <a ${id ? `id=${id}` : ""} href="${link}" data-link class="shrink-0 flex justify-center items-center hover:opacity-85 active:opacity-75 transition-opacity ${classes}" @click.stop=${clickAction}>    
      ${children}
    </a>`;
  }
}
