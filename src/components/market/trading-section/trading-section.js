import tradingSectionHtml from "./trading-section.html?raw";

export default function TradingSection() {
  let html = tradingSectionHtml;

  html = html.replaceAll("", "");

  return html;
}
