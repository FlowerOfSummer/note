function longestPalindrome(s) {
  let res = "";
  for (let i = 0; i < s.length; i++) {
    let res1 = getStr(s, i, i);
    let res2 = getStr(s, i, i + 1);
    res = res1.length > res.length ? res1 : res;
    res = res2.length > res.length ? res2 : res;
  }
  return res;
}
function getStr(s, l, r) {
  while (l >= 0 && r < s.length && s[r] === s[l]) {
    l--;
    r++;
  }
  return s.substr(l + 1, r - l - 1);
}
