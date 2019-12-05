function createNewTask() {
    var newTaskBody = $("#newTaskBody").val();
    var selectedUserId = $("#selectedUserName").children("option:selected").val();
    $.ajax({
        url: "https://grillberc2.azurewebsites.net/api/v1/Tasks",
        method: "POST",
        data: {
            "UserId": selectedUserId,
            "TaskBody": newTaskBody
        }

    }).done(function (data) {
        renderTaskstoPage();
    }).fail(function (xhr) {
        alert(xhr.responseJSON.Message)
    })
}

function usernameOption() {
    $.ajax("https://grillberc2.azurewebsites.net/api/v1/Users")
        .done(function (Users) {
            var userElem = $("#selectedUserName");
            for (let user of Users) {
                let userOption = $("<option>")
                userOption.val(user.Id)
                userOption.text(user.Username)

                userElem.append(userOption)
            }
        })
}

function renderTaskstoPage() {
    $.ajax("https://grillberc2.azurewebsites.net/api/v1/Tasks")
        .done(function (data) {
            var dataDropLocElem = $("#dataDropLoc");
            dataDropLocElem.children().fadeOut("slow");
            for (let task of data) {
                let pElem = $("<p>")
                pElem.text(task.TaskBody)
                dataDropLocElem.append(pElem);


                $.ajax(`https://grillberc2.azurewebsites.net/api/v1/Users/${task.UserId}`)
                    .done(function (userData) {
                        pElem.append(" for " + userData.FirstName + " " + userData.LastName);

                    })

            }
            //clickremove(task)
        })
}

$(function () {
    $("#newTaskBtn").click(createNewTask)
    renderTaskstoPage();
    usernameOption();
})



// function clickRemove(nameValue){
//     //removeitem(nameArray, nameValue);
//     var elem = document.getElementById(nameValue);
//     elem.parentNode.removeChild(elem);

//   }