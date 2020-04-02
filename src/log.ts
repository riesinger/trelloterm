
const debug = (process.env.TRELLO_DEBUG === "TRUE");

export function log(...msg: any[]) {
  if (debug) {
    console.error(...msg);
  }
}
