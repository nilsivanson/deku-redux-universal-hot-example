export default function (req) {
  return new Promise(function (resolve) {
    resolve({
      message: 'Hello from the API server',
      time: Date.now()
    });
  });
};
