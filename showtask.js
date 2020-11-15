var currentActiveTaskIndex = 0
var currentActiveTask = tasks[currentActiveTaskIndex]

function showTask(index){ // displays task from tasks array
    const task = tasks[index]

    var section = document.createElement("div")
    section.setAttribute('class', 'w3-panel button')
    var inside = document.createElement("div")
    inside.setAttribute('id', 'Task' + index)
    var title = document.createElement("h3")
    title.innerText = task.title.slice(0, 50)
    var content = document.createElement('p')
    content.innerText = task.description.slice(0, 100)
    var duetext = document.createElement('p')
    duetext.innerText = task.getDueText()
    var xbtn = document.createElement('button')
    xbtn.innerHTML = "✔"
    xbtn.id = "xbtn" + index
    xbtn.setAttribute('class', 'x x1')
    var pinbtn = document.createElement('button')
    pinbtn.innerHTML = "🖈"
    pinbtn.id = "pinbtn" + index
    pinbtn.setAttribute('class', 'x x2')

    if(task.done){
        section.setAttribute('style', 'background-color: rgb(50, 50, 50)')
    }

    if(task.pinned){
        section.setAttribute('style', 'background-color: rgba(21, 116, 34, 1)')
    }

    inside.addEventListener('click', (e) => { // open and update on click 
        openTaskInModal(index)
        currentActiveTaskIndex = index
        currentActiveTask = tasks[currentActiveTaskIndex]
    })

    section.appendChild(xbtn)
    inside.appendChild(title)
    inside.appendChild(duetext)
    inside.appendChild(content)
    section.appendChild(inside)
    section.appendChild(pinbtn)
    document.getElementById('list').prepend(section)
}

function openTaskInModal(index){ // displays editor for selected task
    const task = tasks[index]

    $('#taskPopupTitle').val(task.title)
    $('#taskPopupDuetext').text(task.getDueText())
    $('#taskPopupDesc').val(task.description)

    $('#modalTask').show()
}


window.onclick = function(e) { // hide modal and save when clicked outside box
    if(e.target.id == "modalTask"){
        $('#modalTask').hide()

        currentActiveTask.title = $('#taskPopupTitle').val()
        $('#Task' + currentActiveTaskIndex).children()[0].innerText = currentActiveTask.title.slice(0, 50)

        currentActiveTask.description = $('#taskPopupDesc').val()
        $('#Task' + currentActiveTaskIndex).children()[2].innerText = currentActiveTask.description.slice(0, 100)

        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

function reorder(){

}