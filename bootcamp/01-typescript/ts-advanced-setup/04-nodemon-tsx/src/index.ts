console.log(
  `nodemon + tsx demo running — GREETING="${process.env['GREETING'] ?? '(unset, copy .env.example to .env)'}" at ${new Date().toLocaleTimeString()}`,
);
