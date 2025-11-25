// Find all elements with data-import attribute
const componentElements = document.querySelectorAll("[data-import]");

// Main function to load components
function loadComponents(domElement) {
  const elementsArray = domElement.querySelectorAll("[data-import]");
  
  for (let element of elementsArray) {
    const dataImport = element.getAttribute("data-import");
    
    // Fetch the HTML file
    fetch(dataImport)
      .then((res) => {
        if (!res.ok) {
          throw "Not found";
        }
        return res.text();
      })
      .then((content) => {
        const component = handleContentUpdate(content, element.innerHTML);
        element.innerHTML = component;
        loadComponentScripts(element);
        loadComponents(element); // Load nested components
      })
      .catch(() => {
        element.innerHTML = `<h4>Component not found</h4>`;
      });
  }
}

// Start loading components when page loads
loadComponents(document);

// Load any scripts inside components
function loadComponentScripts(element) {
  const scripts = element.querySelectorAll("script");
  for (let script of scripts) {
    const newScript = document.createElement("script");
    if (script.src) {
      newScript.src = script.src;
    }
    if (script.textContent) {
      newScript.textContent = script.textContent;
    }
    script.remove();
    document.body.appendChild(newScript);
  }
}

// Handle slot content (placeholders)
function handleContentUpdate(componentContent, slotInnerContent) {
  const slotRegex = /{{\s*slot\s*}}/g;
  const slotMatches = componentContent.match(slotRegex);
  if(slotMatches){
    const slotContent = componentContent.replace(slotRegex, slotInnerContent);
    return slotContent;
  }
  return componentContent;
}