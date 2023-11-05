function Main(arg) {
  const input = arg.split('\n');
  const tmp = input[1].split(' ');

  console.log(input, tmp)
  return;
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
