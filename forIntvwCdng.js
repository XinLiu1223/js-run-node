// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
  let temp = {};
  temp = ar.reduce(function (rv, x) {
    (rv[x] = rv[x] || []).push(x);
    return rv;
  }, {});
  let result = 0;
  Object.keys(temp).map((tmpKy) => {
    if(temp[tmpKy].length >= 2) {
      result += parseInt(temp[tmpKy].length / 2);
    }
  });
  return result;
}

console.log(sockMerchant(18, [8, 8, 8, 8, 8, 8, 5, 1, 2, 3, 3, 3, 3, 6, 6, 6, 6, 6]));
