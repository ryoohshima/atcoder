const main = (input) => {
  // ========================================
  // 入力全体を改行で分割して、1行ずつの配列にする
  // 例: ["5", "5 3", "5 2", "4 1", "5 1", "3 2", "8", "retro", "chris", ...]
  // ========================================
  const lines = input.split("\n").filter(Boolean);

  // idx は「今どの行を読んでいるか」を表すカーソル
  // idx++ で「現在の行を読み取り、次の行に進む」
  let idx = 0;

  // ========================================
  // 1) 入力の読み取り
  // ========================================

  // 1行目: 肋骨の本数N（これは脊椎に書く文字列の長さでもある）
  // 例: N = 5
  // idx++ は 「まず現在の値（0）を返してから、その後に1を足す」 という動きをする。
  const N = Number(lines[idx++]);

  // 続くN行: 各肋骨の条件 (A_i, B_i)
  //   A_i = 肋骨iに書く文字列の長さ
  //   B_i = 肋骨iの文字列のうち、脊椎のi文字目と一致しなければならない位置
  // 例: ribs = [{a:5, b:3}, {a:5, b:2}, {a:4, b:1}, {a:5, b:1}, {a:3, b:2}]
  const ribs = [];
  for (let i = 0; i < N; i++) {
    const [a, b] = lines[idx++].split(" ").map(Number);
    ribs.push({ a, b });
  }

  // 次の1行: 候補文字列の数M
  // 例: M = 8
  const M = Number(lines[idx++]);

  // 続くM行: 候補文字列 S_1, S_2, ..., S_M
  // 例: strings = ["retro", "chris", "itchy", "tuna", "crab", "rock", "cod", "ash"]
  const strings = [];
  for (let j = 0; j < M; j++) {
    strings.push(lines[idx++]);
  }

  // ========================================
  // 2) 前処理: 「どの長さ・どの位置に・どの文字があるか」のテーブルを作る
  //
  // has[長さ][位置] = その条件に該当する文字のSet
  //
  // 具体例（input1の場合）:
  //   "retro" (長さ5) → has[5][1]に'r', has[5][2]に'e', has[5][3]に't', ...
  //   "tuna"  (長さ4) → has[4][1]に't', has[4][2]に'u', has[4][3]に'n', ...
  //   "cod"   (長さ3) → has[3][1]に'c', has[3][2]に'o', has[3][3]に'd'
  //   ...全文字列について同様に登録
  //
  // 長さ5の文字列: retro, chris, itchy
  // has[5][1] = {'r', 'c', 'i'}   ← retro の r, chris の c, itchy の i
  // has[5][2] = {'e', 'h', 't'}   ← retro の e, chris の h, itchy の t
  // has[5][3] = {'t', 'r', 'c'}   ← retro の t, chris の r, itchy の c
  // has[5][4] = {'r', 'i', 'h'}   ← retro の r, chris の i, itchy の h
  // has[5][5] = {'o', 's', 'y'}   ← retro の o, chris の s, itchy の y
  //
  // これにより「長さ5で3文字目が'r'の文字列は存在するか？」を
  // has[5][3].has('r') で一瞬で判定できるようになる
  // ========================================
  const has = {};
  for (const s of strings) {
    const len = s.length;
    // この長さのエントリがなければ作る
    if (!has[len]) has[len] = {};
    // 文字列の各位置の文字をテーブルに登録
    for (let p = 1; p <= len; p++) {
      if (!has[len][p]) has[len][p] = new Set();
      // s[p-1] は文字列sのp文字目（0始まりなのでp-1）
      has[len][p].add(s[p - 1]);
    }
  }

  // ========================================
  // 3) 各候補文字列について「脊椎になれるか？」を判定
  //
  // 脊椎になるための条件:
  //   ① 文字列の長さがNであること
  //   ② すべての肋骨i (i=1..N) について、
  //      「長さA_iの文字列で、B_i文字目が脊椎のi文字目と同じもの」が
  //      候補の中に存在すること
  //
  // 具体例: "retro" が脊椎になれるか？ (N=5)
  //   肋骨1: A=5, B=3 → 長さ5で3文字目が'r'の文字列ある？ → has[5][3].has('r') → Yes（"chris"）
  //   肋骨2: A=5, B=2 → 長さ5で2文字目が'e'の文字列ある？ → has[5][2].has('e') → Yes（"retro"）
  //   肋骨3: A=4, B=1 → 長さ4で1文字目が't'の文字列ある？ → has[4][1].has('t') → Yes（"tuna"）
  //   肋骨4: A=5, B=1 → 長さ5で1文字目が'r'の文字列ある？ → has[5][1].has('r') → Yes（"retro"）
  //   肋骨5: A=3, B=2 → 長さ3で2文字目が'o'の文字列ある？ → has[3][2].has('o') → Yes（"cod"）
  //   → 全部OK → "Yes"
  // ========================================
  const results = [];
  for (const s of strings) {
    // 条件①: 脊椎の長さはNでなければならない
    if (s.length !== N) {
      results.push("No");
      continue; // 長さが違うので次の文字列へスキップ
    }

    // 条件②: 各肋骨の条件を1つずつチェック
    let ok = true;
    for (let i = 0; i < N; i++) {
      const { a, b } = ribs[i]; // 肋骨iの条件: 長さa, 位置b
      const c = s[i]; // 脊椎のi文字目（0始まり）

      // 「長さaの文字列で、b文字目がcであるもの」が存在するか？
      if (!has[a] || !has[a][b] || !has[a][b].has(c)) {
        ok = false; // 条件を満たす文字列がない → この脊椎はダメ
        break; // 1つでもダメなら残りはチェック不要
      }
    }
    results.push(ok ? "Yes" : "No");
  }

  // 全候補の判定結果を改行区切りで出力
  console.log(results.join("\n"));
};

main(require("fs").readFileSync("/dev/stdin", "utf8"));
