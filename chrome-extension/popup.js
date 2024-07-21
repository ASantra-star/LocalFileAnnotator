document.getElementById('file-input').addEventListener('change', handleFileSelect);
document.getElementById('annotate-button').addEventListener('click', annotateText);

let fileContentElement = document.getElementById('file-content');

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fileContentElement.textContent = e.target.result;
    };
    reader.readAsText(file);
  }
}

function annotateText() {
  let selection = window.getSelection();
  if (selection.rangeCount) {
    let range = selection.getRangeAt(0);
    let span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    span.title = prompt("Enter your annotation:");
    range.surroundContents(span);

    // Send annotation to backend
    fetch('http://localhost:5000/api/annotations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: selection.toString(),
        annotation: span.title
      })
    });
  }
}

   