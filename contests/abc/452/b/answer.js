const main = (input) => {
  const input_values = input.split("\n").filter(Boolean)[0];
  const row = Number(input_values.split(" ")[0]);
  const column = Number(input_values.split(" ")[1]);

  const array = Array.from({ length: row });

  array.map((v, i) => {
    if (i === 0 || i === row - 1) {
      console.log("#".repeat(column));
    } else {
      console.log("#" + ".".repeat(column - 2) + "#");
    }
  });
};

main(require("fs").readFileSync("/dev/stdin", "utf8"));
