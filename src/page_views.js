import { CounterAPI } from "https://cdn.jsdelivr.net/npm/counterapi@1.87.0/+esm";

const counter = new CounterAPI();
const namespace = "osbornecharlesgithubio";
const keyname = "pageviews";

export function incrementPageViews() {
  return counter.up(namespace, keyname).then((res) => {
    return res;
  });
};

export function getPageViews() {
  return counter.get(namespace, keyname).then((res) => {
    return res;
  });
};

export default {
  incrementPageViews,
  getPageViews
};
