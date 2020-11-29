var dropTarget = document.querySelector(".wrapper");
var draggables = document.querySelectorAll(".task");
var sessionStorageList;
/*
 * What to Drag - ondragstart and setData() Then, specify what should happen
 * when the element is dragged.
 * 
 * In the example above, the ondragstart attribute calls a function,
 * drag(event), that specifies what data to be dragged.
 * 
 * The dataTransfer.setData() method sets the data type and the value of the
 * dragged data:
 */

for(let i = 0; i < draggables.length; i++) {
  draggables[i].addEventListener("dragstart", function (ev) {
     ev.dataTransfer.setData("srcId", ev.target.id);
  });
}

/*
 * Where to Drop - ondragover The ondragover event specifies where the dragged
 * data can be dropped.
 * 
 * By default, data/elements cannot be dropped in other elements. To allow a
 * drop, we must prevent the default handling of the element.
 * 
 * This is done by calling the event.preventDefault() method for the ondragover
 * event:
 */

dropTarget.addEventListener('dragover', function(ev) {
 
	ev.preventDefault();
});


var addOrRemoveBean =document.getElementById('myForm00:addOrRemove');
var srcIdBean =document.getElementById('myForm00:srcId');
var clickButtun = document.getElementById('myForm00:onclickDive');

dropTarget.addEventListener('drop', function(ev) {
 
  ev.preventDefault();
  let target = ev.target;
  let droppable  = target.classList.contains('dropBox');
  
  let droppableRollback  = target.classList.contains('box');
  let droppableRollbackTd  = target.tagName == 'TD';
  console.log(target.classList);
console.log(droppableRollbackTd);
console.log(target.tagName);  
  let srcId = ev.dataTransfer.getData("srcId");
  
  if (droppable) {
    ev.target.appendChild(document.getElementById(srcId));
    addOrRemoveBean.setAttribute('value' , "add");
    srcIdBean.setAttribute('value' , srcId);
    console.log(srcId);
    clickButtun.click();
    setAllDropedElementInSessionStorage();
  }
  
  if (droppableRollback || droppableRollbackTd) {
	    ev.target.appendChild(document.getElementById(srcId));
	    addOrRemoveBean.setAttribute('value' , "remove");
	    srcIdBean.setAttribute('value' , srcId);
	    console.log("remove " ,  srcId);
	    clickButtun.click();
	    setAllDropedElementInSessionStorage();
}
  
});

var prepareDataButtun = document.getElementById('myForm00:prepareDataId');
var dataToBean =document.getElementById('myForm00:elementsToSave');
var divContainer = document.querySelector('div[id="innerDive"]');
function setAllDropedElementInSessionStorage(){
//	sessionStorageList = {};
//	sessionStorage.clear();
	sessionStorageList = '';
	
	
	divContainer.querySelectorAll('div[id*="stage_id_"]').forEach( e =>
	{
		 var chiledElemId = e.id;
		 var parentElemId = e.parentElement.id;
		 sessionStorageList =sessionStorageList + parentElemId  + '|'+ chiledElemId +'}'  
		 
		 
//		 Object.assign(sessionStorage, {parentElemId: chiledElemId});
	});
	
	sessionStorageList =	sessionStorageList.substring(0, sessionStorageList.length - 1);
	dataToBean.setAttribute('value' , sessionStorageList);
	prepareDataButtun.click();
//	sessionStorage.session = JSON.stringify(sessionStorageList);
}



function clickDraw(width , heigth){
	try{
var widthInp = 	document.getElementById('mainForm:width');
var heigthInp = 	document.getElementById('mainForm:height');
var drawLayOutButtun = 	document.getElementById('mainForm:drawLayOut');
var restoreViewButtun = 	document.getElementById('mainForm:restoreViewId');
widthInp.setAttribute('value' , width);
heigthInp.setAttribute('value' , heigth);
drawLayOutButtun.click();
restoreViewButtun.click();
	}catch(e){
	console.log(e)
}

}

function restoreView(stage_id , target_id){
	try{
 			var myStId = 	document.getElementById(stage_id);
			var myTarId = 	document.getElementById(target_id);	
			myTarId.appendChild(myStId);
		}catch(e){
			console.log(e)
	}
}


