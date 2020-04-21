const input = document.querySelector("#fileInput");
const content = document.querySelector("#content");
input.addEventListener("change", handleFile);

function handleFile(event) {
  console.log(event.target.files);
  const file = event.target.files[0];
  Papa.parse(file, { header: true, complete: handleResult });
}

function handleResult(results) {
  console.log(results);
  const projectsByNames = results.data.map((result) => ({
    nom: result["Noms "],
    group: result["Groupe"],
    link: result["Lien ennoncé du projet"],
  }));
  console.log(projectsByNames);
  renderData(projectsByNames);
  //   const sortedData = [...projectsByNames].sort(compare);
  //   console.log(sortedData);
  const links = projectsByNames.map((element) => element.link);
  const uniqueLinks = new Set(links);
  console.log(links);
  console.log(uniqueLinks);
}

function compare(firstElement, secondElement) {
  if (firstElement.link < secondElement.link) {
    return -1;
  }

  if (firstElement.link > secondElement.link) {
    return 1;
  }
  return 0;
}

function renderData(data) {
  //loop through data and append element to the content
  let el = "<ul>";
  data.forEach((element) => {
    el += `<li>${element.nom} | ${element.group} | ${element.link}</li>`;
  });
  el += "</ul>";

  content.innerHTML = el;
}
