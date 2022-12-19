const checkBox = document.querySelectorAll(".checkbox");
const delButton = document.querySelector(".deleteTeam");

console.log(delButton);

checkBox.forEach((box) => {
    box.addEventListener("click", checkTeams);
});

function checkTeams() {
    let count = 0;
    for (let box of checkBox) {
        if (box.checked) {
            count++;
        }
    }

    delButton.toggleAttribute("disabled", count == 0);
    console.log(count);
}
