let focusedBlock;
const omnibarId = "omnibar"
    
const openOmnibar = () => {
  let omnibar = document.getElementById(omnibarId);
  if (omnibar) {
    return omnibar
  }

  focusedBlock = roamAlphaAPI.ui.getFocusedBlock()
  
  // Create omnibar
  omnibar = document.createElement("div");
  omnibar.id = "omnibar"
  let form = document.createElement("form")
  let input = document.createElement("input")
  form.appendChild(input)
  omnibar.appendChild(form)

  // Add to DOM
  let roamApp = document.querySelector(".roam-app")
  roamApp.appendChild(omnibar)
  input.focus();

  // Add handlers
  form.addEventListener("submit", submitHandler, {once: true})
  omnibar.addEventListener("keydown", escapeHandler);
  document.addEventListener("click", clickAwayHandler);
  
  return omnibar;
}

const closeOmnibar = () => {
  let omnibar = document.getElementById(omnibarId);
  if (!omnibar) {
    return false
  }
  omnibar.remove()
  document.removeEventListener("click", clickAwayHandler);
  if (focusedBlock) {
    roamAlphaAPI.ui.setBlockFocusAndSelection({location: focusedBlock})
  }
  return true;
}

const submitHandler = (e) => {
  e.preventDefault();
  let input = e.target.querySelector("input")
  let command = input.value;
  console.log(input.value);
  input.value = "";
  closeOmnibar()
  let result = eval(command);
}

const clickAwayHandler = (e) => {
  let omnibar = document.getElementById(omnibarId);
  if(!omnibar.contains(e.target)) {
    closeOmnibar()
  }
}

const escapeHandler = (e) => {
  if (e.key === "Escape") {
    closeOmnibar()
  } else if (e.key === 'Backspace') {
    let input = document.querySelector(`#${omnibarId} input`)
    if (input && input.value === "") {
      closeOmnibar()
    }
  }
}

const hotkeyHandler = (e) => {
  if (e.shiftKey && e.metaKey && e.key == "u") {
    openOmnibar()
  }
}

var omnibar = {
  install: () => {
    closeOmnibar();
    document.addEventListener("keydown", hotkeyHandler);
  },
  uninstall: () => {
    closeOmnibar();
    document.removeEventListener("keydown", hotkeyHandler);
  }
}
omnibar.uninstall();
omnibar.install();
