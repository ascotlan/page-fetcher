const request = require("request");
const fs = require("fs");

const fetcher = function(array) {
  const url = array[0];
  const file = array[1];

  request(url, (error, response, body) => {
    if (error) {
      return console.log("Unable to fetch file from server");
    }

    if (response.statusCode === 200) {
      fs.writeFile(file, body, (error) => {
        if (error) {
          return console.error(error);
        }
        console.log(
          `Downloaded and saved ${fs.statSync(file).size} bytes to ${file}`
        );
      });
    }
  });
};

fetcher(process.argv.slice(2));
