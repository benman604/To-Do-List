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
    xbtn.setAttribute('class', 'x x1')
    var pinbtn = document.createElement('button')
    pinbtn.innerHTML = "🖈"
    pinbtn.id = "pinbtn" + index
    pinbtn.setAttribute('class', 'x x2')

    inside.addEventListener('click', (e) => { // open and update on click 
        openTaskInModal(index)
        currentActiveTaskIndex = index
        currentActiveTask = tasks[currentActiveTaskIndex]
    })

    xbtn.addEventListener('click', (e) => {  // toggle task done/checked
        var id = (e.currentTarget.id.charAt(e.currentTarget.id.length - 1))
        tasks[id].done = !tasks[id].done
        if(tasks[id].done && tasks[id].pinned){
            tasks[id].pinned = false
        }
        setcolor(id)
        localStorage.setItem("tasks", JSON.stringify(tasks))

        $('#list').empty()
        tasks = reorder2()
        for(var i=0; i < tasks.length; i++){
            showTask(i)
        }
    })

    pinbtn.addEventListener('click', (e) => { // toggle task pinned
        var id = (e.currentTarget.id.charAt(e.currentTarget.id.length - 1))
        tasks[id].pinned = !tasks[id].pinned
        if(tasks[id].done && tasks[id].pinned){
            tasks[id].done = false
        }
        setcolor(id)
        localStorage.setItem("tasks", JSON.stringify(tasks))

        $('#list').empty()
        tasks = reorder2()
        for(var i=0; i < tasks.length; i++){
            showTask(i)
        }
    })

    section.appendChild(xbtn)
    inside.appendChild(title)
    inside.appendChild(duetext)
    inside.appendChild(content)
    section.appendChild(inside)
    section.appendChild(pinbtn)
    document.getElementById('list').prepend(section)
    setcolor(index)
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

function setcolor(id){
    const task = tasks[id]
    var color = 'black'

    if(task.done){
        color = 'rgb(200, 200, 200)'
    } else if(task.pinned){
        color = 'rgba(21, 116, 34, 1)'
    }

    $('#TaskSection' + id).css('background-color', color)
}

function reorder2(){
    var pinnedTasksPos = []
    var pinnedTasksNeg = []
    var regularTasksPos = []
    var regularTasksNeg = []
    var finishedTasksPos = []
    var finishedTasksNeg = []
    
    for (e=0; e<tasks.length; e++){
        let i = tasks[e]
        console.log(i)
        if(i.pinned){
            if(i.dueDaysDiff >= 0) {
                pinnedTasksPos.push(i)
            } else{
                pinnedTasksNeg.push(i)
            }
        } else if(i.done){
            if(i.dueDaysDiff >= 0) {
                finishedTasksPos.push(i)
            } else{
                finishedTasksNeg.push(i)
            }
        } else{
            if(i.dueDaysDiff >= 0) {
                regularTasksPos.push(i)
            } else{
                regularTasksNeg.push(i)
            }
        }
    }

    pinnedTasksPos.sort(compare2)
    pinnedTasksNeg.sort(compare2).reverse()
    regularTasksPos.sort(compare2)
    regularTasksNeg.sort(compare2).reverse()
    finishedTasksPos.sort(compare2)
    finishedTasksNeg.sort(compare2).reverse()

    var newarr = [...pinnedTasksPos, ...pinnedTasksNeg, ...regularTasksPos, ...regularTasksNeg, ...finishedTasksPos, ...finishedTasksNeg]
    return(newarr.reverse())
}

function compare2(a, b){
    if(a.dueDaysDiff < b.dueDaysDiff){
        return -1
    }
    if(a.dueDaysDiff > b.dueDaysDiff){
        return 1
    }
    return 0
}