const main = (input) => {
  const input_values = input.split("\n").filter(Boolean);
  const month = Number(input_values[0].split(" ")[0]);
  const date = Number(input_values[0].split(" ")[1]);

  const match_days = [
    {
      month: 1,
      date: 7,
    },
    {
      month: 3,
      date: 3,
    },
    {
      month: 5,
      date: 5,
    },
    {
      month: 7,
      date: 7,
    },
    {
      month: 9,
      date: 9,
    },
  ];

  const is_included = match_days.some((v) => {
    return (
      JSON.stringify({
        month,
        date,
      }) === JSON.stringify({ month: v.month, date: v.date })
    );
  });

  is_included ? console.log("Yes") : console.log("No");
};

main(require("fs").readFileSync("/dev/stdin", "utf8"));
