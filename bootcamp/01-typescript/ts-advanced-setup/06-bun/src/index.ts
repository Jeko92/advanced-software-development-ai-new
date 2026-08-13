const message = `Bun demo running — last restart at ${new Date().toLocaleTimeString()}`;

console.log(message);

if (typeof document !== 'undefined') {
  const output = document.querySelector<HTMLParagraphElement>('#output');

  if (output) {
    output.textContent = message;
  }
}
