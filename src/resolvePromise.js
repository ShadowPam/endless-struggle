export function resolvePromise(prms, promiseState) {

  function dataACB(result) {
    if (promiseState.promise == prms) {
      promiseState.data = result;
    }
  }

  function errorACB(err) {
    promiseState.error = err;
  }

  if (prms == undefined) {
    return;
  }
  promiseState.promise = prms;
  promiseState.data = null;
  promiseState.error = null;

  prms.then(dataACB).catch(errorACB);
}
