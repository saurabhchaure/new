const select = document.querySelector("#main-activity");

let mainActivityName = "";

let data = "";
getApiData("http://localhost:8080/config.json").then((res) => {
  data = res;
});
console.log(data);

select.addEventListener("change", () => {
  const mainActivity = document.querySelector("#main-activity");
  mainActivityName = mainActivity.value;
  console.log(mainActivity.value);
  console.log("clicked");
});
