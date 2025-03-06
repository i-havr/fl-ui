import { createPopper } from "@popperjs/core";

class TooltipManager {
  constructor() {
    this.popperInstances = new Map();
    this.tooltipContainer = null;
    this.timeoutIds = new Map(); // timers for closing
    this.tooltips = new Map(); // tooltips refs
    this.scrollHandler = null;
    this.parentScrollableElementSelector = null;
  }

  createTooltipContainer(parentElement) {
    if (!this.tooltipContainer) {
      this.tooltipContainer = document.createElement("div");
      this.tooltipContainer.className =
        "tooltip-container fixed inset-0 z-50 pointer-events-none";
      parentElement.appendChild(this.tooltipContainer);
    }
    return this.tooltipContainer;
  }

  destroyTooltips() {
    this.popperInstances.forEach((instance) => instance.destroy());
    this.popperInstances.clear();
    this.timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeoutIds.clear();
    if (this.tooltipContainer) {
      this.tooltipContainer.innerHTML = "";
    }

    if (this.scrollHandler) {
      document
        .querySelector(this.parentScrollableElementSelector)
        ?.removeEventListener("scroll", this.scrollHandler);
      this.scrollHandler = null;
    }
  }

  initializeTooltips({
    tooltipSelector = ".market-state-tooltip",
    triggersSelector = ".market-state-tooltip-trigger",
    parentScrollableElementSelector = ".modal-assets-list",
    placement = "top",
    offset = [0, 8],
    autoCloseDelay = 2000,
    tooltipStyles = {},
    arrowStyles = {}
  } = {}) {
    // destroy old tooltips
    this.destroyTooltips();

    this.parentScrollableElementSelector = parentScrollableElementSelector;

    const triggers = document.querySelectorAll(triggersSelector);
    const tooltipContainer = this.createTooltipContainer(
      document.querySelector('div[x-data*="activeTabQuery"]')
    );

    triggers.forEach((trigger) => {
      const id = trigger.getAttribute("data-id");
      const tooltipText = trigger.getAttribute("data-tooltip-text");

      // create new tooltip
      let tooltip = document.createElement("div");
      tooltip.className = `${tooltipSelector} hidden absolute z-50 pointer-events-auto`;
      Object.assign(tooltip.style, {
        backgroundColor: "#F7F8F8",
        color: "#484C5C",
        borderRadius: "8px",
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "12px",
        fontWeight: 500,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        minWidth: "105px",
        ...tooltipStyles
      });
      tooltip.setAttribute("data-tooltip-id", id);

      // add arrow
      const arrow = document.createElement("div");
      arrow.className = "tooltip-arrow";
      Object.assign(arrow.style, {
        position: "absolute",
        width: "0",
        height: "0",
        top: "calc(100% - 2px)",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        borderTop: "8px solid #F7F8F8",
        ...arrowStyles
      });
      tooltip.appendChild(arrow);

      tooltip.innerHTML += tooltipText;
      tooltipContainer.appendChild(tooltip);

      this.tooltips.set(id, {
        element: tooltip,
        hide: () => hideTooltip({})
      });

      // init Popper
      const popperInstance = createPopper(trigger, tooltip, {
        placement,
        modifiers: [
          {
            name: "offset",
            options: { offset }
          },
          {
            name: "preventOverflow",
            options: { padding: 8 }
          },
          {
            name: "arrow",
            options: {
              element: arrow,
              padding: 8
            }
          },
          {
            name: "flip",
            options: { padding: 8 }
          }
        ]
      });
      this.popperInstances.set(id, popperInstance);

      // event handlers
      const showTooltip = (event) => {
        if (event && typeof event === "object" && event.type === "click") {
          event.stopPropagation();
        }
        tooltip.classList.remove("hidden");
        popperInstance.update();

        // clear previous timer if it exists
        if (this.timeoutIds.has(id)) {
          clearTimeout(this.timeoutIds.get(id));
        }

        const timeoutId = setTimeout(() => {
          tooltip.classList.add("hidden");
          this.timeoutIds.delete(id);
        }, autoCloseDelay);
        this.timeoutIds.set(id, timeoutId);
      };

      const hideTooltip = (event) => {
        if (event && typeof event === "object" && event.type === "click") {
          event.stopPropagation();
        }
        tooltip.classList.add("hidden");

        // clear timer if it exists
        if (this.timeoutIds.has(id)) {
          clearTimeout(this.timeoutIds.get(id));
          this.timeoutIds.delete(id);
        }
      };

      trigger.addEventListener("mouseover", showTooltip);
      trigger.addEventListener("mouseout", hideTooltip);
      trigger.addEventListener("click", showTooltip);
      tooltip.addEventListener("click", hideTooltip);
    });

    const scrollContainer = document.querySelector(
      parentScrollableElementSelector
    );
    if (scrollContainer) {
      this.scrollHandler = () => {
        this.tooltips.forEach(({ element, hide }) => {
          if (!element.classList.contains("hidden")) {
            hide();
          }
        });
      };
      scrollContainer.addEventListener("scroll", this.scrollHandler);
    }
  }

  destroy() {
    this.destroyTooltips();
    if (this.tooltipContainer) {
      this.tooltipContainer.remove();
      this.tooltipContainer = null;
    }
  }
}

export default new TooltipManager();
