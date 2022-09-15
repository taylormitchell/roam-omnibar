import { useEffect, useState } from "react";
import OmniBar from "./OmniBar";

// Set up uninstaller
window.extensions = window.extensions || {};
window.extensions.roamOmnibar = window.extensions.roamOmnibar || {};
window.extensions.roamOmnibar.listenerRemovers = [];
window.extensions.roamOmnibar.uninstall = () => {
  window.extensions.roamOmnibar.listenerRemovers.forEach((listenerRemover) => listenerRemover());
  window.extensions.roamOmnibar.listenerRemovers = [];
  console.log("uninstalled");
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Open the omnibar when the user presses the hotkey
  useEffect(() => {
    if (isOpen) {
        return;
    }
    const hotkeyHandler = (e) => {
      if (e.shiftKey && e.metaKey && e.key == "u") {
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", hotkeyHandler);
    const removeHotkeyListener = () => {
      document.removeEventListener("keydown", hotkeyHandler);
    };
    window.extensions.roamOmnibar.listenerRemovers.push(removeHotkeyListener);
    return removeHotkeyListener;
  }, [isOpen]);

  // Close the omnibar when the user clicks outside of it
  useEffect(() => {
    const clickAwayHandler = (e) => {
      if (!e.target.closest("#omnibar")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", clickAwayHandler);
    const removeClickAwayListener = () => {
      document.removeEventListener("click", clickAwayHandler);
    };
    window.extensions.roamOmnibar.listenerRemovers.push(removeClickAwayListener);
    return removeClickAwayListener;
  }, [isOpen]);

  // Close the omnibar when the user presses escape
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const escapeHandler = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", escapeHandler);
    const removeEventListener = () => {
      document.removeEventListener("keydown", escapeHandler);
    };
    window.extensions.roamOmnibar.listenerRemovers.push(removeEventListener);
    return removeEventListener;
  }, [isOpen]);

  return <div id="omnibar-app">{isOpen && <OmniBar close={() => setIsOpen(false)} />}</div>;
};

export default App;
