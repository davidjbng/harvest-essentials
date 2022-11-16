console.log("Content script loaded");

/** @type {HTMLElement[]} */
const timeEntries = Array.from(
  document.querySelectorAll("#day-view-entries > tbody tr")
);

console.log("Entries count: ", timeEntries.length);
console.log("Entries: ", timeEntries);

const noNotesMarker = document.createElement("div");
noNotesMarker.style.height = "1rem";
noNotesMarker.style.color = "red";
noNotesMarker.style.fontSize = "2rem";
noNotesMarker.textContent = "No Notes";

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.", mutation);
    } else if (mutation.type === "attributes") {
      console.log(
        `The ${mutation.attributeName} attribute was modified.`,
        mutation
      );
    } else {
      console.log("The element was modified", mutation);
    }
  }
});

// @ts-ignore
observer.observe(document.getElementById("day-view-entries"), {
  attributes: true,
  childList: true,
  subtree: true,
});

highlightMissingNotes();

function highlightMissingNotes() {
  const withoutNotes = getMissingNoteEntries(timeEntries);
  console.log("Entries without notes: ", withoutNotes);
  withoutNotes.forEach((e) => {
    e.style.outline = "4px solid red";
    // e.textContent = "Hello";
    // e.parentNode?.insertBefore(noNotesMarker, e.nextSibling);
  });
}

/** @param {HTMLElement[]} entries */
function getMissingNoteEntries(entries) {
  return entries.filter((e) => !e.querySelector(".notes")?.textContent);
}
