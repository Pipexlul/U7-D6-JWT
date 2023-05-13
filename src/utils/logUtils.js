const timelog = (...args) => {
  const time = new Date();

  console.log(`[${time.toLocaleTimeString()}]`, ...args);
};

export { timelog };
