var currentActiveTaskIndex = 0
var currentActiveTask = tasks[currentActiveTaskIndex]

function showTask(index){ // displays task from tasks array
    var task = tasks[index]

    var section = document.createElement("div")
    section.setAttribute('class', 'w3-panel button')
    section.id = "TaskSection" + index
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
    xbtn.title = "Mark as done"
    xbtn.setAttribute('class', 'x x1')
    var pinbtn = document.createElement('button')
    pinbtn.innerHTML = "🖈"
    pinbtn.id = "pinbtn" + index
    pinbtn.title = "Pin"
    pinbtn.setAttribute('class', 'x x2')
    var openbtn = document.createElement('button')
    openbtn.title = "Open and edit"
    openbtn.innerHTML = "☰"
    openbtn.setAttribute('class', 'x x3')

    inside.addEventListener('click', (e) => { // open and update on click 
        openTaskInModal(index)
        currentActiveTaskIndex = index
        currentActiveTask = tasks[currentActiveTaskIndex]
    })

    xbtn.addEventListener('click', (e) => {  // toggle task done/checked
        //const id = (e.currentTarget.id.charAt(e.currentTarget.id.length - 1))
        const id = index
        tasks[id].done = !tasks[id].done
        if(tasks[id].done && tasks[id].pinned){
            tasks[id].pinned = false
        }
        setcolor(id)
        //localStorage.setItem("tasks", JSON.stringify(tasks))
        storeTodoData("tasks", JSON.stringify(tasks))
        reloadList()
    })

    pinbtn.addEventListener('click', (e) => { // toggle task pinned
        //const id = (e.currentTarget.id.charAt(e.currentTarget.id.length - 1))
        const id = index
        tasks[id].pinned = !tasks[id].pinned
        if(tasks[id].done && tasks[id].pinned){
            tasks[id].done = false
        }
        setcolor(id)
        //localStorage.setItem("tasks", JSON.stringify(tasks))
        storeTodoData("tasks", JSON.stringify(tasks))
        reloadList()
    })

    section.appendChild(xbtn)
    inside.appendChild(title)
    inside.appendChild(duetext)
    inside.appendChild(content)
    inside.appendChild(openbtn)
    section.appendChild(inside)
    section.appendChild(pinbtn)
    document.getElementById('list').prepend(section)
    setcolor(index)
}

var taskPopupDuedate

$("#taskPopupDatepicker").datepicker({
    dateFormat: 'yy-m-d',
    inline: true,

    onSelect: function(dateText, inst) { // update duedate on change
        var date = $(this).datepicker('getDate')
        
        taskPopupDuedate = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            dayofweek: date.getUTCDay(),
            dateobj: date
        }

        currentActiveTask.due = taskPopupDuedate
        $('#taskPopupDuetext').text(currentActiveTask.getDueText())
    }
})

function deleteCurrentTask(){
    const index = tasks.indexOf(currentActiveTask)
    if (index > -1) {
        tasks.splice(index, 1);
    }
    hideTaskModal()
    reloadList()
    //localStorage.setItem("tasks", JSON.stringify(tasks))
    storeTodoData("tasks", JSON.stringify(tasks))
}

function openTaskInModal(index){ // displays editor for selected task
    const task = tasks[index]

    $('#taskPopupTitle').val(task.title)
    $('#taskPopupDuetext').text(task.getDueText())
    $('#taskPopupDesc').val(task.description)
    $('#taskPopupCategory').val(task.category)

    if(task.due != undefined){
        $('#taskPopupDatepicker').val(task.due.year + "-" + task.due.month + "-" + task.due.day)
    } else{
        $('#taskPopupDatepicker').val("")
    }

    $('#modalTask').show()
}

window.onclick = function(e) { // hide modal and save when clicked outside box
    if(e.target.id == "modalTask"){
        hideTaskModal()
    }

    if(e.target.id == "modalCategory"){
        hideCategoryModal()
    }
}

function hideTaskModal(){
    $('#modalTask').hide()

    currentActiveTask.title = $('#taskPopupTitle').val()
    $('#Task' + currentActiveTaskIndex).children()[0].innerText = currentActiveTask.title.slice(0, 50)

    currentActiveTask.description = $('#taskPopupDesc').val()
    $('#Task' + currentActiveTaskIndex).children()[2].innerText = currentActiveTask.description.slice(0, 100)

    currentActiveTask.category = $('#taskPopupCategory').val()

    $('#Task' + currentActiveTaskIndex).children()[1].innerText = currentActiveTask.getDueText()

    reloadList()
    //localStorage.setItem("tasks", JSON.stringify(tasks))
    storeTodoData("tasks", JSON.stringify(tasks))
}

function hideCategoryModal(){
    $('#modalCategory').hide()
    saveCategories()
}

function setcolor(id){ // sets color of task according to if pinned or checked off
    const task = tasks[id]
    var color = 'black'

    if(task.done){
        color = 'rgb(200, 200, 200)'
    } else if(task.pinned){
        color = 'rgba(21, 116, 34, 1)'
    }

    $('#TaskSection' + id).css('background-color', color)
}