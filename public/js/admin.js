async function toggleState(user){
  user.state = user.state === "pending" ? "active" : "pending";
  await axios.put(`/users/${user.id}`, user);
  $(".user-row").remove();
  getUsers();
}

async function getUsers(){
  let resp = await axios.get("/users");
  let table = $("#user-data");
  for (let user of resp.data) {
    let row = $('<tr class="user-row">').appendTo(table);
    for (let key of ["id", "email", "firstName", "lastName", "state"]) {
      let cell = $(`<td class="cell cell-${key}">`).appendTo(row);
      if(key === "id"){
        cell.attr("scope", "row");
        $(`<a href="/users/${user.id}" class="id-link">`)
          .appendTo(cell)
          .text(user.id);
      } else if(key === "state"){
        let btnclass = user.state === "pending" ? "warning" : "success";
        $(`<button class="btn btn-${btnclass}">`)
          .appendTo(cell)
          .text(user.state)
          .on("click", () => toggleState(user));
      } else {
        cell.text(user[key]);
      }
    }
  }
}

$(() => getUsers());