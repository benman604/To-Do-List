function reloadList(){ // clears, reorders, and creats all elements in list
    $('#list').empty()
    if($('#sortby').val() == 'assign'){
        tasks = reorder()
    } else{
        tasks = reorder2()
    }
    for(var i=0; i < tasks.length; i++){
        if(showCategories == "All"){
            showTask(i)
        } else if(tasks[i].category == showCategories){
            showTask(i)
        }
    }
}

function reorder(){ // sorts tasks array accoring to date created
    return tasks.sort(compare)
}
function compare(a, b){ 
    if(a.createdate < b.createdate){
        return -1
    }
    if(a.createdate > b.createdate){
        return 1
    }
    return 0
}

function reorder2(){ // sorts tasks array accoring to relevance
    var pinnedTasksPos = []
    var pinnedTasksNeg = []
    var regularTasksPos = []
    var regularTasksNeg = []
    var finishedTasksPos = []
    var finishedTasksNeg = []
    
    for (e=0; e<tasks.length; e++){
        let i = tasks[e]
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