var aGlobal = null;
var anItem = null;
var aWall = null;
var aFloor = null;
var aCameraRange = null;
var gui = null;
var globalPropFolder = null;
var itemPropFolder = null;
var wallPropFolder = null;
var floorPropFolder = null;
var cameraPropFolder = null;
/*
 * Floorplanner controls
 */

var ViewerFloorplanner = function(blueprint3d) 
{
  var canvasWrapper = '#floorplanner';
  // buttons
  var move = '#move';
  var remove = '#delete';
  var draw = '#draw';

  var activeStlye = 'btn-primary disabled';
  this.floorplanner = blueprint3d.floorplanner;
  var scope = this;
  function init() 
  {
    $( window ).resize( scope.handleWindowResize );
    scope.handleWindowResize();
    
    scope.floorplanner.addEventListener(BP3DJS.EVENT_MODE_RESET, function(mode) 
    {
      $(draw).removeClass(activeStlye);
      $(remove).removeClass(activeStlye);
      $(move).removeClass(activeStlye);
      if (mode == BP3DJS.floorplannerModes.MOVE) 
      {
          $(move).addClass(activeStlye);
      } 
      else if (mode == BP3DJS.floorplannerModes.DRAW) 
      {
          $(draw).addClass(activeStlye);
      } 
      else if (mode == BP3DJS.floorplannerModes.DELETE) 
      {
          $(remove).addClass(activeStlye);
      }
      
      if (mode == BP3DJS.floorplannerModes.DRAW) 
      {
        $("#draw-walls-hint").show();
        scope.handleWindowResize();
      } 
      else 
      {
        $("#draw-walls-hint").hide();
      }
    });

    $(move).click(function()
    {
      scope.floorplanner.setMode(BP3DJS.floorplannerModes.MOVE);
    });

    $(draw).click(function()
    {
      scope.floorplanner.setMode(BP3DJS.floorplannerModes.DRAW);
    });

    $(remove).click(function()
    {
      scope.floorplanner.setMode(BP3DJS.floorplannerModes.DELETE);
    });
  }

  this.updateFloorplanView = function() {
    scope.floorplanner.reset();
  }

  this.handleWindowResize = function() {
    $(canvasWrapper).height(window.innerHeight - $(canvasWrapper).offset().top);
    scope.floorplanner.resizeView();
  };

  init();
};

var mainControls = function(blueprint3d) 
{
	  var blueprint3d = blueprint3d;

	  function newDesign() 
	  {
	    blueprint3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":-232.02900000000136,"y":235.20400000000032},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":235.3309999999999,"y":235.20400000000032},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":235.3309999999999,"y":-232.15600000000046},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":-232.02900000000136,"y":-232.15600000000046}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
	  }

	  function loadDesign() 
	  {
	    files = $("#loadFile").get(0).files;
	    var reader  = new FileReader();
	    reader.onload = function(event) {
	        var data = event.target.result;
	        blueprint3d.model.loadSerialized(data);
	    }
	    reader.readAsText(files[0]);
	  }

	  function saveDesign() {
	    var data = blueprint3d.model.exportSerialized();
	    var a = window.document.createElement('a');
	    var blob = new Blob([data], {type : 'text'});
	    a.href = window.URL.createObjectURL(blob);
	    a.download = 'design.blueprint3d';
	    document.body.appendChild(a)
	    a.click();
	    document.body.removeChild(a)
	  }
	  
	  function saveGLTF()
	  {
		  blueprint3d.three.exportForBlender();
	  }
	  
	  function saveGLTFCallback(o)
	  {
		var data = o.gltf;
		var a = window.document.createElement('a');
		var blob = new Blob([data], {type : 'text'});
		a.href = window.URL.createObjectURL(blob);
		a.download = 'design.gltf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	  }
	  
	  function saveMesh() {
		    var data = blueprint3d.model.exportMeshAsObj();
		    var a = window.document.createElement('a');
		    var blob = new Blob([data], {type : 'text'});
		    a.href = window.URL.createObjectURL(blob);
		    a.download = 'design.obj';
		    document.body.appendChild(a)
		    a.click();
		    document.body.removeChild(a)
		  }

	  function init() {
	    $("#new").click(newDesign);
	    $("#new2d").click(newDesign);
	    $("#loadFile").change(loadDesign);
	    $("#saveFile").click(saveDesign);
	    $("#saveMesh").click(saveMesh);
	    $("#saveGLTF").click(saveGLTF);
	    blueprint3d.three.addEventListener(BP3DJS.EVENT_GLTF_READY, saveGLTFCallback);
	  }

	  init();
}

var GlobalProperties = function()
{
	this.name = 'Global';
	//a - feet and inches, b = inches, c - cms, d - millimeters, e - meters
	this.units = {a:false, b:false, c:false, d:false, e:true};	
	this.unitslabel = {a:BP3DJS.dimFeetAndInch, b:BP3DJS.dimInch, c:BP3DJS.dimCentiMeter, d:BP3DJS.dimMilliMeter, e:BP3DJS.dimMeter};
	this.guiControllers = null;
	
	this.setUnit = function(unit)
	{
		for (let param in this.units)
		{
			this.units[param] = false;
		}
		this.units[unit] = true;
		
		BP3DJS.Configuration.setValue(BP3DJS.configDimUnit, this.unitslabel[unit]);
		
		console.log(this.units, this.unitslabel[unit], BP3DJS.Configuration.getStringValue(BP3DJS.configDimUnit));
		
		for (var i in this.guiControllers) // Iterate over gui controllers to update the values
		{
			this.guiControllers[i].updateDisplay();
	    }
	}
	
	this.setGUIControllers = function(guiControls)
	{
		this.guiControllers = guiControls;
	}
}

var CameraProperties = function()
{
	this.ratio = 1;
	this.ratio2 = 1;
	this.locked = false;
	this.three = null;
	
	this.change = function()
	{
		if(this.three)
		{
			this.three.changeClippingPlanes(this.ratio, this.ratio2);
		}
	}
	
	this.changeLock = function()
	{
		if(this.three)
		{
			this.three.lockView(!this.locked);
		}
	}
	
	this.reset = function()
	{
		if(this.three)
		{
			this.three.resetClipping();
		}
	}
}

var ItemProperties = function(gui)
{
	this.name = 'an item';
	this.time='0';
	this.width = 10;
	this.height = 10;
	this.depth = 10;
	this.format=null;
	this.fixed = false;
	this.currentItem = null;
	this.guiControllers = null;
	this.gui = gui;
	this.materialsfolder = null;
	this.materials = {};
	this.totalmaterials = -1;
	this.proportionalsize = false;
	this.changingdimension = 'w';
	
	this.setGUIControllers = function(guiControls)
	{
		this.guiControllers = guiControls;
	}
	
	this.setItem = function(item)
	{
		this.currentItem = item;
		if(this.materialsfolder)
		{
			this.gui.removeFolder(this.materialsfolder.name);
		}
		if(item)
		{
			console.log('set item >>>>>>>>>>>> '+item.metadata.format);
			var scope = this;
			var material = item.material;
			this.name = item.metadata.itemName;	
			this.time=	item.metadata.time;
			this.format=item.metadata.format;
			this.width = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
			this.height = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
			this.depth = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());			
			this.fixed = item.fixed;
			this.proportionalsize = item.getProportionalResize();
			
			for (var i in this.guiControllers) // Iterate over gui controllers to update the values
			{
				this.guiControllers[i].updateDisplay();
		    }
			
			this.materialsfolder =  this.gui.addFolder('Materials');
			this.materials = {};
			if(material.length)
			{
				this.totalmaterials = material.length;
				for (var i=0;i<material.length;i++)
				{
					this.materials['mat_'+i] = '#'+material[i].color.getHexString();
					var matname = (material[i].name) ? material[i].name : 'Material '+(i+1);
					var ccontrol = this.materialsfolder.addColor(this.materials, 'mat_'+i).name(matname).onChange(()=>{scope.dimensionsChanged()});
				}
				return;
			}
			this.totalmaterials = 1;
			var matname = (material.name) ? material.name : 'Material 1';
			this.materials['mat_0'] = '#'+material.color.getHexString();
			var ccontrol = this.materialsfolder.addColor(this.materials, 'mat_0').name(matname).onChange(()=>{scope.dimensionsChanged()});
			return;
		}
		this.name = 'None';
		return;
	}
	
	this.dimensionsChanged = function()
	{
		if(this.currentItem)
		{
			var item = this.currentItem;
			
			var ow = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
			var oh = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
			var od = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());
			
			var h = BP3DJS.Dimensioning.cmFromMeasureRaw(this.height);
			var w = BP3DJS.Dimensioning.cmFromMeasureRaw(this.width);
			var d = BP3DJS.Dimensioning.cmFromMeasureRaw(this.depth);		
			
			this.currentItem.resize(h,w,d);
			
			if( w != ow)
			{
				this.height = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
				this.depth = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());
			}
			
			if( h != oh)
			{
				this.width = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
				this.depth = BP3DJS.Dimensioning.cmToMeasureRaw(item.getDepth());
			}
			
			if( d != od)
			{
				this.width = BP3DJS.Dimensioning.cmToMeasureRaw(item.getWidth());
				this.height = BP3DJS.Dimensioning.cmToMeasureRaw(item.getHeight());
			}		
			for (var i=0;i<this.totalmaterials;i++)
			{
				this.currentItem.setMaterialColor(this.materials['mat_'+i], i);
			}
			
			this.guiControllers.forEach((control)=>{control.updateDisplay()}); // Iterate over gui controllers to update the values
		}
	}
	
	this.proportionFlagChange = function()
	{
		if(this.currentItem)
		{
			this.currentItem.setProportionalResize(this.proportionalsize);
		}	
	}
	
	this.lockFlagChanged = function()
	{
		if(this.currentItem)
		{
			this.currentItem.setFixed(this.fixed);
		}		
	}
	
	this.deleteItem = function()
	{
		if(this.currentItem)
		{
			
			
			
		var timeSec=parseFloat(this.currentItem.metadata.time);
		var oldStr=$("#added-items-card").text();
		var a = oldStr.split(':'); // split it at the colons

		// minutes are worth 60 seconds. Hours are worth 60 minutes.
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		var oldVal = isNaN(seconds) ? 0 : seconds;
		timeSec =isNaN(timeSec) ? 0 : timeSec;
		console.log("old Time "+oldVal+" new Val :"+timeSec)
		var totalTime=oldVal-timeSec;
		$("#added-items-card").text(new Date(totalTime * 1000).toISOString().substr(11, 8));
			
			
			
			
			
			console.log("deleted Item : "+this.currentItem.metadata.time);
			this.currentItem.remove();
			this.setItem(null);
		}
	}
}

var WallProperties = function()
{
	this.textures = [
		['rooms/textures/wallmap.png', true, 1], ['rooms/textures/wallmap_yellow.png', true, 1], 
		['rooms/textures/light_brick.jpg', false, 50], ['rooms/textures/marbletiles.jpg', false, 300], 
		['rooms/textures/light_brick.jpg', false, 100], ['rooms/textures/light_fine_wood.jpg', false, 300], 
		['rooms/textures/hardwood.png', false, 300]];
	
	this.floormaterialname = 0;
	this.wallmaterialname = 0;
	
	this.forAllWalls = false;
	
	this.currentWall = null;
	this.currentFloor = null;
	
	this.wchanged = function()
	{
		if(this.currentWall)
		{
			this.currentWall.setTexture(this.textures[this.wallmaterialname][0], this.textures[this.wallmaterialname][1], this.textures[this.wallmaterialname][2]);
		}
		if(this.currentFloor && this.forAllWalls)
		{
			this.currentFloor.setRoomWallsTexture(this.textures[this.wallmaterialname][0], this.textures[this.wallmaterialname][1], this.textures[this.wallmaterialname][2]);
		}		
	}
	
	this.fchanged = function()
	{
		if(this.currentFloor)
		{
			this.currentFloor.setTexture(this.textures[this.floormaterialname][0], this.textures[this.floormaterialname][1], this.textures[this.floormaterialname][2]);
		}
	}
	
	
	this.setWall = function(wall)
	{
		this.currentWall = wall;
	}
	
	this.setFloor = function(floor)
	{
		this.currentFloor = floor;
	}
}

function addBlueprintListeners(blueprint3d)
{
	var three = blueprint3d.three;
	
	function wallClicked(wall)
	{
		aWall.setWall(wall);
		aWall.setFloor(null);
		itemPropFolder.close();
		wallPropFolder.open();		
	}
	
	function floorClicked(floor)
	{
		aWall.setFloor(floor);
		aWall.setWall(null);
		itemPropFolder.close();
		wallPropFolder.open();
	}
	
	function itemSelected(item)
	{
		anItem.setItem(item);
		itemPropFolder.open();
		wallPropFolder.close();
	}
	function itemUnselected()
	{
		anItem.setItem(undefined);
		itemPropFolder.close();
	}
	
	three.addEventListener(BP3DJS.EVENT_ITEM_SELECTED, function(o){itemSelected(o.item);});
	three.addEventListener(BP3DJS.EVENT_ITEM_UNSELECTED, function(o){itemUnselected();});	
	three.addEventListener(BP3DJS.EVENT_WALL_CLICKED, (o)=>{wallClicked(o.item);});
    three.addEventListener(BP3DJS.EVENT_FLOOR_CLICKED, (o)=>{floorClicked(o.item);});
    three.addEventListener(BP3DJS.EVENT_FPS_EXIT, ()=>{$('#showDesign').trigger('click')});    
// three.skybox.toggleEnvironment(this.checked);
// currentTarget.setTexture(textureUrl, textureStretch, textureScale);
// three.skybox.setEnvironmentMap(textureUrl);
}


function getCameraRangePropertiesFolder(gui, camerarange)
{
	var f = gui.addFolder('Camera Limits');
	var ficontrol = f.add(camerarange, 'ratio', -1, 1).name("Range").step(0.01).onChange(function(){camerarange.change()});
	var ficontrol2 = f.add(camerarange, 'ratio2', -1, 1).name("Range 2").step(0.01).onChange(function(){camerarange.change()});
	var flockcontrol = f.add(camerarange, 'locked').name("Lock View").onChange(function(){camerarange.changeLock()});
	var resetControl = f.add(camerarange, 'reset').name('Reset');
	return f;
	
}

function getGlobalPropertiesFolder(gui, global)
{
	var f = gui.addFolder('Global');
	var ficontrol = f.add(global.units, 'a',).name("Feets'' Inches'").onChange(function(){global.setUnit("a")});
	var icontrol = f.add(global.units, 'b',).name("Inches'").onChange(function(){global.setUnit("b")});
	var ccontrol = f.add(global.units, 'c',).name('Cm').onChange(function(){global.setUnit("c")});
	var mmcontrol = f.add(global.units, 'd',).name('mm').onChange(function(){global.setUnit("d")});
	var mcontrol = f.add(global.units, 'e',).name('m').onChange(function(){global.setUnit("e")});
	global.setGUIControllers([ficontrol, icontrol, ccontrol, mmcontrol, mcontrol]);
	
	return f;
}

function getCarbonSheetPropertiesFolder(gui, carbonsheet, globalproperties)
{
	console.log('CARBON SHEET ', carbonsheet, carbonsheet.x);
	var f = gui.addFolder('Carbon Sheet');
	var url = f.add(carbonsheet, 'url').name('Url');
	var width = f.add(carbonsheet, 'width').name('Real Width').max(1000.0).step(0.01);
	var height = f.add(carbonsheet, 'height').name('Real Height').max(1000.0).step(0.01);
	var proportion = f.add(carbonsheet, 'maintainProportion').name('Maintain Proportion');
	var x = f.add(carbonsheet, 'x').name('Move in X');
	var y = f.add(carbonsheet, 'y').name('Move in Y');
	
	var ax = f.add(carbonsheet, 'anchorX').name('Anchor X');
	var ay = f.add(carbonsheet, 'anchorY').name('Anchor Y');
	var transparency = f.add(carbonsheet, 'transparency').name('Transparency').min(0).max(1.0).step(0.05);
	carbonsheet.addEventListener(BP3DJS.EVENT_UPDATED, function(){
		url.updateDisplay();
		width.updateDisplay();
		height.updateDisplay();
		x.updateDisplay();
		y.updateDisplay();
		ax.updateDisplay();
		ay.updateDisplay();
		transparency.updateDisplay(width);
	});
	
	globalproperties.guiControllers.push(width);
	globalproperties.guiControllers.push(height);
	return f;
}

function getItemPropertiesFolder(gui, anItem)
{
	var f = gui.addFolder('Current Item');
	var inamecontrol = f.add(anItem, 'name');
	var itimecontrol = f.add(anItem, 'time');
	var wcontrol = f.add(anItem, 'width', 0.1, 1000.1).step(0.1);
	var hcontrol = f.add(anItem, 'height', 0.1, 1000.1).step(0.1);
	var dcontrol = f.add(anItem, 'depth', 0.1, 1000.1).step(0.1);
	var pcontrol = f.add(anItem, 'proportionalsize').name('Maintain Size Ratio');
	var lockcontrol = f.add(anItem, 'fixed').name('Locked in place');
	var deleteItemControl = f.add(anItem, 'deleteItem').name('Delete Item');
	
	function changed()
	{
		anItem.dimensionsChanged();
	}	
	
	function lockChanged()
	{
		anItem.lockFlagChanged();
	}	
	
	function proportionFlagChanged()
	{
		anItem.proportionFlagChange();
	}
	
	wcontrol.onChange(changed);
	hcontrol.onChange(changed);
	dcontrol.onChange(changed);
	pcontrol.onChange(proportionFlagChanged);
	lockcontrol.onChange(lockChanged);
	
	
	anItem.setGUIControllers([inamecontrol,itimecontrol, wcontrol, hcontrol, dcontrol, pcontrol, lockcontrol, deleteItemControl]);
	
	return f;
}

function getWallAndFloorPropertiesFolder(gui, aWall)
{
	var f = gui.addFolder('Wall and Floor');	
	var wcontrol = f.add(aWall, 'wallmaterialname', {Grey: 0, Yellow: 1, Checker: 2, Marble: 3, Bricks: 4}).name('Wall');
	var fcontrol = f.add(aWall, 'floormaterialname', {'Fine Wood': 5, 'Hard Wood': 6}).name('Floor');
	var multicontrol = f.add(aWall, 'forAllWalls').name('All Walls In Room');
	function wchanged()
	{
		aWall.wchanged();
	}
	
	function fchanged()
	{
		aWall.fchanged();
	}	
	
	wcontrol.onChange(wchanged);
	fcontrol.onChange(fchanged);
	return f;
}

function datGUI(three, floorplanner)
{
	gui = new dat.GUI();
	aGlobal = new GlobalProperties();
	aCameraRange = new CameraProperties();
	aWall = new WallProperties();
	anItem = new ItemProperties(gui);
	
	aCameraRange.three = three;
	
	globalPropFolder = getGlobalPropertiesFolder(gui, aGlobal);
	carbonPropsFolder = getCarbonSheetPropertiesFolder(globalPropFolder, floorplanner.carbonSheet, aGlobal);
	
	cameraPropFolder = getCameraRangePropertiesFolder(gui, aCameraRange);
	wallPropFolder = getWallAndFloorPropertiesFolder(gui, aWall);
	itemPropFolder = getItemPropertiesFolder(gui, anItem);
}


$(document).ready(function() 
{
	dat.GUI.prototype.removeFolder = function(name) 
	{
		  var folder = this.__folders[name];
		  if (!folder) {
		    return;
		  }
		  folder.close();
		  this.__ul.removeChild(folder.domElement.parentNode);
		  delete this.__folders[name];
		  this.onResize();
	}
	// main setup
	var opts = 
	{
			floorplannerElement: 'floorplanner-canvas',
			threeElement: '#viewer',
			threeCanvasElement: 'three-canvas',
			textureDir: "models/textures/",
			widget: false
	}
	var blueprint3d = new BP3DJS.BlueprintJS(opts);  
	var viewerFloorplanner = new ViewerFloorplanner(blueprint3d);
	mainControls(blueprint3d);
	
	//var myhome = '{"floorplan":{"corners":{"16b020d0-fa1e-f198-bbc6-2ad1a59268d0":{"x":135.31850000000009,"y":-887.476},"8d92c038-8852-f4ea-e8bb-ac03f938f703":{"x":-44.06899999999996,"y":359.15600000000006},"5eee22b8-d773-5b93-c4c8-bf4286ac436d":{"x":-220.09100000000012,"y":-887.476},"4cd3d434-0921-ccfa-0e29-29d3778be8be":{"x":-220.09100000000012,"y":-105.15599999999995},"79dd4e37-0bc6-c662-2197-ec97c356a7d4":{"x":135.31850000000009,"y":-265.6840000000001},"e8c4dc18-0a85-92a9-85b2-37dee45f4a00":{"x":-220.09100000000012,"y":-403.85999999999984},"ea1bedfe-ca15-1744-4108-5450cc842661":{"x":-66.42100000000008,"y":-403.85999999999984},"b1c87f68-9c9e-99d2-859c-fb793355d90b":{"x":-66.42100000000008,"y":-265.6840000000001},"c8a304a1-b9bd-6b76-92e9-2321af0bd415":{"x":-44.06899999999996,"y":-105.15599999999995},"263a453c-9952-75d6-8810-8477a3265bc6":{"x":188.1505000000002,"y":-105.15599999999995},"483d787d-0016-0751-aeda-087bab3a0ed6":{"x":188.1505000000002,"y":-188.4679999999999},"e3e27b42-3226-3fe2-5153-1bbb7a498584":{"x":326.3265000000001,"y":-188.4679999999999},"22ad9451-b853-12b7-f471-9299192489e4":{"x":326.3265000000001,"y":-381.5079999999999},"3eb61572-0237-0254-1e1a-8526c2a71ec6":{"x":452.31050000000005,"y":-381.5079999999999},"1b0e7027-3dc4-12cb-0937-370a669217a5":{"x":604.52,"y":-887.476},"d326e87e-4117-7033-7844-e7486d249b1e":{"x":604.52,"y":-381.5079999999999},"4f68435b-ee33-c4cb-2b60-69945652cacd":{"x":326.3265000000001,"y":-499.36400000000003},"f0569ab9-d17a-cb83-cd6d-1ccff1b4025a":{"x":135.31850000000009,"y":-499.36400000000003},"56aa05eb-95de-2e11-d759-38814b8d9ce0":{"x":452.31050000000005,"y":-499.36400000000003},"a4c70aaa-7fcb-5c76-0308-50c45bbe10a0":{"x":604.52,"y":-499.36400000000003},"007d1f79-7d8f-827e-60ce-b3efb21444eb":{"x":604.52,"y":-105.15599999999995},"b8dc05af-4819-456f-63e1-6a975118bbb4":{"x":604.52,"y":359.15600000000006},"bf238f73-f50e-a2c6-d877-0c39e7c2c330":{"x":326.3265000000001,"y":-105.15599999999995}},"walls":[{"corner1":"4cd3d434-0921-ccfa-0e29-29d3778be8be","corner2":"c8a304a1-b9bd-6b76-92e9-2321af0bd415","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"5eee22b8-d773-5b93-c4c8-bf4286ac436d","corner2":"16b020d0-fa1e-f198-bbc6-2ad1a59268d0","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"16b020d0-fa1e-f198-bbc6-2ad1a59268d0","corner2":"1b0e7027-3dc4-12cb-0937-370a669217a5","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"16b020d0-fa1e-f198-bbc6-2ad1a59268d0","corner2":"f0569ab9-d17a-cb83-cd6d-1ccff1b4025a","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"8d92c038-8852-f4ea-e8bb-ac03f938f703","corner2":"c8a304a1-b9bd-6b76-92e9-2321af0bd415","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"8d92c038-8852-f4ea-e8bb-ac03f938f703","corner2":"b8dc05af-4819-456f-63e1-6a975118bbb4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"4cd3d434-0921-ccfa-0e29-29d3778be8be","corner2":"e8c4dc18-0a85-92a9-85b2-37dee45f4a00","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"e8c4dc18-0a85-92a9-85b2-37dee45f4a00","corner2":"5eee22b8-d773-5b93-c4c8-bf4286ac436d","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"e8c4dc18-0a85-92a9-85b2-37dee45f4a00","corner2":"ea1bedfe-ca15-1744-4108-5450cc842661","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"ea1bedfe-ca15-1744-4108-5450cc842661","corner2":"b1c87f68-9c9e-99d2-859c-fb793355d90b","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"b1c87f68-9c9e-99d2-859c-fb793355d90b","corner2":"79dd4e37-0bc6-c662-2197-ec97c356a7d4","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"c8a304a1-b9bd-6b76-92e9-2321af0bd415","corner2":"263a453c-9952-75d6-8810-8477a3265bc6","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"263a453c-9952-75d6-8810-8477a3265bc6","corner2":"bf238f73-f50e-a2c6-d877-0c39e7c2c330","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"263a453c-9952-75d6-8810-8477a3265bc6","corner2":"483d787d-0016-0751-aeda-087bab3a0ed6","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"483d787d-0016-0751-aeda-087bab3a0ed6","corner2":"e3e27b42-3226-3fe2-5153-1bbb7a498584","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"e3e27b42-3226-3fe2-5153-1bbb7a498584","corner2":"bf238f73-f50e-a2c6-d877-0c39e7c2c330","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"007d1f79-7d8f-827e-60ce-b3efb21444eb","corner2":"d326e87e-4117-7033-7844-e7486d249b1e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"d326e87e-4117-7033-7844-e7486d249b1e","corner2":"3eb61572-0237-0254-1e1a-8526c2a71ec6","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"22ad9451-b853-12b7-f471-9299192489e4","corner2":"e3e27b42-3226-3fe2-5153-1bbb7a498584","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"4f68435b-ee33-c4cb-2b60-69945652cacd","corner2":"22ad9451-b853-12b7-f471-9299192489e4","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"4f68435b-ee33-c4cb-2b60-69945652cacd","corner2":"56aa05eb-95de-2e11-d759-38814b8d9ce0","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"56aa05eb-95de-2e11-d759-38814b8d9ce0","corner2":"3eb61572-0237-0254-1e1a-8526c2a71ec6","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"3eb61572-0237-0254-1e1a-8526c2a71ec6","corner2":"22ad9451-b853-12b7-f471-9299192489e4","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"1b0e7027-3dc4-12cb-0937-370a669217a5","corner2":"a4c70aaa-7fcb-5c76-0308-50c45bbe10a0","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4f68435b-ee33-c4cb-2b60-69945652cacd","corner2":"f0569ab9-d17a-cb83-cd6d-1ccff1b4025a","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"f0569ab9-d17a-cb83-cd6d-1ccff1b4025a","corner2":"79dd4e37-0bc6-c662-2197-ec97c356a7d4","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"56aa05eb-95de-2e11-d759-38814b8d9ce0","corner2":"a4c70aaa-7fcb-5c76-0308-50c45bbe10a0","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"a4c70aaa-7fcb-5c76-0308-50c45bbe10a0","corner2":"d326e87e-4117-7033-7844-e7486d249b1e","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"bf238f73-f50e-a2c6-d877-0c39e7c2c330","corner2":"007d1f79-7d8f-827e-60ce-b3efb21444eb","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300}},{"corner1":"007d1f79-7d8f-827e-60ce-b3efb21444eb","corner2":"b8dc05af-4819-456f-63e1-6a975118bbb4","frontTexture":{"url":"rooms/textures/marbletiles.jpg","stretch":false,"scale":300},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":45.60973158833667,"ypos":110.5,"zpos":-265.1840000000001,"rotation":0,"scale_x":1.1771369721936153,"scale_y":0.997292171703541,"scale_z":0.9994150405405762,"fixed":true},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":226.19923363943076,"ypos":110.800000297771,"zpos":-499.86400000000003,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":71.15100000000002,"ypos":110.5,"zpos":-104.65599999999995,"rotation":0,"scale_x":1.5695159629248197,"scale_y":0.997292171703541,"scale_z":0.9994150405405762,"fixed":true},{"item_name":"Dresser - Dark Wood","item_type":1,"model_url":"models/js/DWR_MATERA_DRESSER2.js","xpos":549.2058844807959,"ypos":57.785001860754996,"zpos":329.7799662755366,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"NYC Poster","item_type":2,"model_url":"models/js/nyc-poster2.js","xpos":598.25,"ypos":183.62661902009813,"zpos":117.68045683694481,"rotation":-1.5707963267948966,"scale_x":0.7142842857142857,"scale_y":0.8421024709178014,"scale_z":1.0129608601270457,"fixed":true},{"item_name":"Blue Rug","item_type":8,"model_url":"models/js/cb-blue-block-60x96.js","xpos":184.68588061910788,"ypos":0.250005,"zpos":122.38666413809182,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Coffee Table - Wood","item_type":1,"model_url":"models/js/ik-stockholmcoffee-brown.js","xpos":272.6962787349586,"ypos":24.01483158034958,"zpos":126.73694950426048,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":512.6434934035085,"ypos":157.07894848817114,"zpos":-886.976,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":-120.92122752323827,"ypos":168.10483780571963,"zpos":-886.976,"rotation":0,"scale_x":0.6603999999996408,"scale_y":0.5810892360052958,"scale_z":1.0332383005354289,"fixed":true},{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":438.5412557798525,"ypos":159.40045156749102,"zpos":358.65600000000006,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":307.85036934553574,"ypos":159.1968280144008,"zpos":358.6560000000001,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Window","item_type":3,"model_url":"models/js/whitewindow.js","xpos":182.15084546678992,"ypos":159.0605552363389,"zpos":358.6560000000001,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":-103.81899999999992,"ypos":110.80000022010701,"zpos":-105.65599999999995,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":325.8265000000001,"ypos":110.5,"zpos":-280.9525143309595,"rotation":-1.5707963267948966,"scale_x":1.2294541709577755,"scale_y":0.9972921724026447,"scale_z":0.9482825135211149,"fixed":true},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":325.8265000000001,"ypos":110.80000022010701,"zpos":-439.4767618863214,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":250.42795654332926,"ypos":110.80000022010701,"zpos":-188.9679999999999,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":527.7045416935933,"ypos":110.80000022010701,"zpos":-499.86400000000003,"rotation":3.141592653589793,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Closed Door","item_type":7,"model_url":"models/js/closed-door28x80_baked.js","xpos":17.379725040490854,"ypos":110.5,"zpos":-886.976,"rotation":0,"scale_x":1.1771369721936145,"scale_y":0.9972921724026447,"scale_z":0.948282513521117,"fixed":true},{"item_name":"Media Console - White","item_type":9,"model_url":"models/js/cb-clapboard_baked.js","xpos":574.12,"ypos":67.89999754396,"zpos":131.42070309211852,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":12.257267191489404,"ypos":42.54509923821,"zpos":136.8119273061203,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true}]}';
	//var fs = require('fs');
	//var myhome =	fs.readFileSync('design.txt', 'utf8');
	// var myhome='{"floorplan":{"corners":{"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":-768.4770000000021,"y":-236.22000000000048},"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":-764.4130000000021,"y":377.44400000000064},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":1686.1790000000012,"y":379.4760000000006},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":1682.1150000000011,"y":-234.18800000000044}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{},"carbonSheet":{"url":"","transparency":1,"x":0,"y":0,"anchorX":0,"anchorY":0,"width":0.01,"height":0.01}},"items":[{"item_name":"sewingMachine2","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":-454.8489752987866,"ypos":76.79999999347086,"zpos":-69.9243782379665,"rotation":0,"scale_x":300,"scale_y":300,"scale_z":300,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"sewingMachine2","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":44.996436548868076,"ypos":76.79999999347086,"zpos":32.55462109831058,"rotation":0,"scale_x":300,"scale_y":300,"scale_z":300,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"sewingMachine2","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":458.85099999999954,"ypos":76.79999999347086,"zpos":71.62800000000007,"rotation":0,"scale_x":300,"scale_y":300,"scale_z":300,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"sewingMachine2","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":-146.95698786895835,"ypos":76.79999999347086,"zpos":199.21121824563113,"rotation":0,"scale_x":300,"scale_y":300,"scale_z":300,"fixed":false,"material_colors":["#ffffff"]}]}';
	//var myhome='{"floorplan":{"corners":{"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":2031.6190000000029,"y":-979.9320000000006},"f794bd2c-620c-9da0-43e6-27a8c236c7ff":{"x":1436.242999999999,"y":-979.9320000000006},"0ccbb26f-2d44-011a-7148-20ee38c65351":{"x":-1061.0850000000014,"y":-979.9320000000006},"042a4d6a-abac-5659-8f5b-6eb4523b1088":{"x":-1758.8230000000005,"y":-979.9320000000006},"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f":{"x":-1061.0850000000014,"y":662.29992},"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4":{"x":-1061.0850000000014,"y":1186.1800000000005},"cbdef25d-e5da-9eaf-1e5a-dba0302b5859":{"x":-488.82300000000055,"y":1186.1800000000005},"8092868d-4be8-4efb-5d08-9ebcd86bcf4b":{"x":1436.242999999999,"y":-154.56408},"49521afe-3b1c-38ed-c96e-9d15074cdda0":{"x":1436.242999999999,"y":662.29992},"5d3f909c-7aaa-47ef-029e-6be06727ebfa":{"x":2031.6190000000029,"y":662.29992},"84a819cc-b54c-4cb6-f9bc-ce64d9a39842":{"x":2031.6190000000029,"y":-154.56408},"eec6f875-703c-06a1-97cb-02fd85fdfd94":{"x":-488.82300000000055,"y":662.29992},"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92":{"x":-1758.8230000000005,"y":662.29992},"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3":{"x":-1683.6390000000006,"y":662.29992},"06c29957-dfb2-cd28-e578-bee3feef5dea":{"x":-1683.6390000000006,"y":1186.1800000000005}},"walls":[{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"0ccbb26f-2d44-011a-7148-20ee38c65351","corner2":"042a4d6a-abac-5659-8f5b-6eb4523b1088","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"0ccbb26f-2d44-011a-7148-20ee38c65351","corner2":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","corner2":"cbdef25d-e5da-9eaf-1e5a-dba0302b5859","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","corner2":"0ccbb26f-2d44-011a-7148-20ee38c65351","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","corner2":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","corner2":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"49521afe-3b1c-38ed-c96e-9d15074cdda0","corner2":"5d3f909c-7aaa-47ef-029e-6be06727ebfa","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"5d3f909c-7aaa-47ef-029e-6be06727ebfa","corner2":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","corner2":"eec6f875-703c-06a1-97cb-02fd85fdfd94","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"eec6f875-703c-06a1-97cb-02fd85fdfd94","corner2":"cbdef25d-e5da-9eaf-1e5a-dba0302b5859","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92","corner2":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92","corner2":"042a4d6a-abac-5659-8f5b-6eb4523b1088","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","corner2":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","corner2":"06c29957-dfb2-cd28-e578-bee3feef5dea","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"06c29957-dfb2-cd28-e578-bee3feef5dea","corner2":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","corner2":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","corner2":"49521afe-3b1c-38ed-c96e-9d15074cdda0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"49521afe-3b1c-38ed-c96e-9d15074cdda0","corner2":"eec6f875-703c-06a1-97cb-02fd85fdfd94","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{},"carbonSheet":{"url":"","transparency":1,"x":0,"y":0,"anchorX":0,"anchorY":0,"width":0.01,"height":0.01}},"items":[{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":102.6989807085413,"zpos":-872.2281843972733,"rotation":-1.5707963267948966,"scale_x":0.9268795056642608,"scale_y":0.9268795056642608,"scale_z":0.9268795056642608,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1006.5350000000014,"ypos":110.800000297771,"zpos":662.79992,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1629.0890000000006,"ypos":110.800000297771,"zpos":662.79992,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1060.5850000000014,"ypos":110.800000297771,"zpos":-524.0134231015958,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":110.800000297771,"zpos":-105.01407999999999,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":110.800000297771,"zpos":607.7499200000001,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":165.90928062698208,"ypos":110.800000297771,"zpos":-979.4320000000006,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1737.689066945179,"ypos":64.27615429321229,"zpos":-877.7236196726967,"rotation":0,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1964.1049866210496,"ypos":64.2761542932123,"zpos":-618.444703017302,"rotation":-1.5707963267948966,"scale_x":1.7139233419219941,"scale_y":1.7139233419219941,"scale_z":1.7139233419219941,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":13.643184534094502,"ypos":48195,"zpos":-31.025422166898814,"rotation":0,"scale_x":1285.1194408289841,"scale_y":1285.1194408289841,"scale_z":1285.1194408289841,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Dresser - Dark Wood","item_type":1,"model_url":"models/js/DWR_MATERA_DRESSER2.js","xpos":1950.52900413866,"ypos":57.785001860754996,"zpos":-361.5037581175612,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff","#a3a3a3"]},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":1756.877736217012,"ypos":68.55794076138812,"zpos":-67.13724082341834,"rotation":0,"scale_x":1.6114180478821365,"scale_y":1.6114180478821365,"scale_z":1.6114180478821365,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Dining table","item_type":1,"model_url":"models/js/BlakeAvenuejoshuatreecheftable.js","xpos":1711.3247495134967,"ypos":52.65881666666665,"zpos":240.75363453665167,"rotation":1.5707963267948966,"scale_x":1.3249999999999997,"scale_y":1.3249999999999997,"scale_z":1.3249999999999997,"fixed":false,"material_colors":["#a3a3a3","#a3a3a3"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1931.5235256186804,"ypos":64.27615429321229,"zpos":228.73606244230547,"rotation":-1.5707963267948966,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1725.921536361354,"ypos":64.27615429321229,"zpos":-325.9440673769389,"rotation":3.141592653589793,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Bedside table - White","item_type":1,"model_url":"models/js/cb-archnight-white_baked.js","xpos":1731.7816209349915,"ypos":76.6747692365103,"zpos":-587.3841881406494,"rotation":0,"scale_x":2.460726800267727,"scale_y":2.460726800267727,"scale_z":2.460726800267727,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":1772.1688824199364,"ypos":68.55794076138812,"zpos":557.1941275023952,"rotation":3.141592653589793,"scale_x":1.6114180478821365,"scale_y":1.6114180478821365,"scale_z":1.6114180478821365,"fixed":false,"material_colors":["#ffffff"]}]}';
	//var myhome= '{"floorplan":{"corners":{"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":2031.6190000000029,"y":-979.9320000000006},"f794bd2c-620c-9da0-43e6-27a8c236c7ff":{"x":1436.242999999999,"y":-979.9320000000006},"0ccbb26f-2d44-011a-7148-20ee38c65351":{"x":-1061.0850000000014,"y":-979.9320000000006},"042a4d6a-abac-5659-8f5b-6eb4523b1088":{"x":-1758.8230000000005,"y":-979.9320000000006},"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f":{"x":-1061.0850000000014,"y":662.29992},"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4":{"x":-1061.0850000000014,"y":1186.1800000000005},"cbdef25d-e5da-9eaf-1e5a-dba0302b5859":{"x":-488.82300000000055,"y":1186.1800000000005},"8092868d-4be8-4efb-5d08-9ebcd86bcf4b":{"x":1436.242999999999,"y":-154.56408},"49521afe-3b1c-38ed-c96e-9d15074cdda0":{"x":1436.242999999999,"y":662.29992},"5d3f909c-7aaa-47ef-029e-6be06727ebfa":{"x":2031.6190000000029,"y":662.29992},"84a819cc-b54c-4cb6-f9bc-ce64d9a39842":{"x":2031.6190000000029,"y":-154.56408},"eec6f875-703c-06a1-97cb-02fd85fdfd94":{"x":-488.82300000000055,"y":662.29992},"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92":{"x":-1758.8230000000005,"y":662.29992},"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3":{"x":-1683.6390000000006,"y":662.29992},"06c29957-dfb2-cd28-e578-bee3feef5dea":{"x":-1683.6390000000006,"y":1186.1800000000005}},"walls":[{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"0ccbb26f-2d44-011a-7148-20ee38c65351","corner2":"042a4d6a-abac-5659-8f5b-6eb4523b1088","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"0ccbb26f-2d44-011a-7148-20ee38c65351","corner2":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","corner2":"cbdef25d-e5da-9eaf-1e5a-dba0302b5859","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","corner2":"0ccbb26f-2d44-011a-7148-20ee38c65351","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","corner2":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","corner2":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"49521afe-3b1c-38ed-c96e-9d15074cdda0","corner2":"5d3f909c-7aaa-47ef-029e-6be06727ebfa","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"5d3f909c-7aaa-47ef-029e-6be06727ebfa","corner2":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","corner2":"eec6f875-703c-06a1-97cb-02fd85fdfd94","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"eec6f875-703c-06a1-97cb-02fd85fdfd94","corner2":"cbdef25d-e5da-9eaf-1e5a-dba0302b5859","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92","corner2":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92","corner2":"042a4d6a-abac-5659-8f5b-6eb4523b1088","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","corner2":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","corner2":"06c29957-dfb2-cd28-e578-bee3feef5dea","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"06c29957-dfb2-cd28-e578-bee3feef5dea","corner2":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","corner2":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","corner2":"49521afe-3b1c-38ed-c96e-9d15074cdda0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"49521afe-3b1c-38ed-c96e-9d15074cdda0","corner2":"eec6f875-703c-06a1-97cb-02fd85fdfd94","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{},"carbonSheet":{"url":"","transparency":1,"x":0,"y":0,"anchorX":0,"anchorY":0,"width":0.01,"height":0.01}},"items":[{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":102.6989807085413,"zpos":-872.2281843972733,"rotation":-1.5707963267948966,"scale_x":0.9268795056642608,"scale_y":0.9268795056642608,"scale_z":0.9268795056642608,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1006.5350000000014,"ypos":110.800000297771,"zpos":662.79992,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1629.0890000000006,"ypos":110.800000297771,"zpos":662.79992,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1060.5850000000014,"ypos":110.800000297771,"zpos":-524.0134231015958,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":110.800000297771,"zpos":-105.01407999999999,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":110.800000297771,"zpos":607.7499200000001,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":165.90928062698208,"ypos":110.800000297771,"zpos":-979.4320000000006,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Dresser - Dark Wood","item_type":1,"model_url":"models/js/DWR_MATERA_DRESSER2.js","xpos":1950.52900413866,"ypos":57.785001860754996,"zpos":-361.5037581175612,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff","#a3a3a3"]},{"item_name":"Dining table","item_type":1,"model_url":"models/js/BlakeAvenuejoshuatreecheftable.js","xpos":1711.3247495134967,"ypos":52.65881666666665,"zpos":240.75363453665167,"rotation":1.5707963267948966,"scale_x":1.3249999999999997,"scale_y":1.3249999999999997,"scale_z":1.3249999999999997,"fixed":false,"material_colors":["#a3a3a3","#a3a3a3"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1737.689066945179,"ypos":64.2761542932123,"zpos":-877.7236196726967,"rotation":0,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1964.1049866210496,"ypos":64.2761542932123,"zpos":-618.444703017302,"rotation":-1.5707963267948966,"scale_x":1.7139233419219941,"scale_y":1.7139233419219941,"scale_z":1.7139233419219941,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":13.643184534094502,"ypos":48195.000000002656,"zpos":-31.025422166898814,"rotation":0,"scale_x":1285.1194408289841,"scale_y":1285.1194408289841,"scale_z":1285.1194408289841,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1931.5235256186804,"ypos":64.2761542932123,"zpos":228.73606244230547,"rotation":-1.5707963267948966,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1725.921536361354,"ypos":64.2761542932123,"zpos":-325.9440673769389,"rotation":3.141592653589793,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Bedside table - White","item_type":1,"model_url":"models/js/cb-archnight-white_baked.js","xpos":1731.7816209349915,"ypos":76.67476923651029,"zpos":-587.3841881406494,"rotation":0,"scale_x":2.460726800267727,"scale_y":2.460726800267727,"scale_z":2.460726800267727,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":1756.877736217012,"ypos":68.55794076138812,"zpos":-67.13724082341834,"rotation":0,"scale_x":1.6114180478821365,"scale_y":1.6114180478821365,"scale_z":1.6114180478821365,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":1772.1688824199364,"ypos":68.55794076138812,"zpos":557.1941275023952,"rotation":3.141592653589793,"scale_x":1.6114180478821365,"scale_y":1.6114180478821365,"scale_z":1.6114180478821365,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"كتف -سنجر","model_time":"30","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":-193.646742028424,"ypos":51.45923254260269,"zpos":-224.72029012437724,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"رد كم-سنجر","model_time":"40","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":618.2146814121195,"ypos":51.45923254260269,"zpos":-210.26021110886313,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]}]}';
	var myhome='{"floorplan":{"corners":{"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":2031.6190000000029,"y":-979.9320000000006},"f794bd2c-620c-9da0-43e6-27a8c236c7ff":{"x":1436.242999999999,"y":-979.9320000000006},"0ccbb26f-2d44-011a-7148-20ee38c65351":{"x":-1061.0850000000014,"y":-979.9320000000006},"042a4d6a-abac-5659-8f5b-6eb4523b1088":{"x":-1758.8230000000005,"y":-979.9320000000006},"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f":{"x":-1061.0850000000014,"y":662.29992},"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4":{"x":-1061.0850000000014,"y":1186.1800000000005},"cbdef25d-e5da-9eaf-1e5a-dba0302b5859":{"x":-488.82300000000055,"y":1186.1800000000005},"8092868d-4be8-4efb-5d08-9ebcd86bcf4b":{"x":1436.242999999999,"y":-154.56408},"49521afe-3b1c-38ed-c96e-9d15074cdda0":{"x":1436.242999999999,"y":662.29992},"5d3f909c-7aaa-47ef-029e-6be06727ebfa":{"x":2031.6190000000029,"y":662.29992},"84a819cc-b54c-4cb6-f9bc-ce64d9a39842":{"x":2031.6190000000029,"y":-154.56408},"eec6f875-703c-06a1-97cb-02fd85fdfd94":{"x":-488.82300000000055,"y":662.29992},"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92":{"x":-1758.8230000000005,"y":662.29992},"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3":{"x":-1683.6390000000006,"y":662.29992},"06c29957-dfb2-cd28-e578-bee3feef5dea":{"x":-1683.6390000000006,"y":1186.1800000000005}},"walls":[{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"0ccbb26f-2d44-011a-7148-20ee38c65351","corner2":"042a4d6a-abac-5659-8f5b-6eb4523b1088","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"0ccbb26f-2d44-011a-7148-20ee38c65351","corner2":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","corner2":"cbdef25d-e5da-9eaf-1e5a-dba0302b5859","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","corner2":"0ccbb26f-2d44-011a-7148-20ee38c65351","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"f794bd2c-620c-9da0-43e6-27a8c236c7ff","corner2":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","corner2":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"49521afe-3b1c-38ed-c96e-9d15074cdda0","corner2":"5d3f909c-7aaa-47ef-029e-6be06727ebfa","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"5d3f909c-7aaa-47ef-029e-6be06727ebfa","corner2":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","corner2":"eec6f875-703c-06a1-97cb-02fd85fdfd94","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"eec6f875-703c-06a1-97cb-02fd85fdfd94","corner2":"cbdef25d-e5da-9eaf-1e5a-dba0302b5859","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92","corner2":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9803cbf0-3aa2-865a-7d49-2cef9f3c8d92","corner2":"042a4d6a-abac-5659-8f5b-6eb4523b1088","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","corner2":"c3e2193a-5a07-ce5f-4f1a-697191ddfe5f","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"9a47caa2-c1a3-5e9c-79f9-1079e5f3a8b3","corner2":"06c29957-dfb2-cd28-e578-bee3feef5dea","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"06c29957-dfb2-cd28-e578-bee3feef5dea","corner2":"6b1f46e2-6e05-1f18-a761-e1a9364fa8b4","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"84a819cc-b54c-4cb6-f9bc-ce64d9a39842","corner2":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"8092868d-4be8-4efb-5d08-9ebcd86bcf4b","corner2":"49521afe-3b1c-38ed-c96e-9d15074cdda0","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}},{"corner1":"49521afe-3b1c-38ed-c96e-9d15074cdda0","corner2":"eec6f875-703c-06a1-97cb-02fd85fdfd94","frontTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"rooms/textures/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{"0ccbb26f-2d44-011a-7148-20ee38c65351,49521afe-3b1c-38ed-c96e-9d15074cdda0,8092868d-4be8-4efb-5d08-9ebcd86bcf4b,c3e2193a-5a07-ce5f-4f1a-697191ddfe5f,eec6f875-703c-06a1-97cb-02fd85fdfd94,f794bd2c-620c-9da0-43e6-27a8c236c7ff":{"url":"rooms/textures/light_fine_wood.jpg","scale":300}},"carbonSheet":{"url":"","transparency":1,"x":0,"y":0,"anchorX":0,"anchorY":0,"width":0.01,"height":0.01}},"items":[{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":102.6989807085413,"zpos":-872.2281843972733,"rotation":-1.5707963267948966,"scale_x":0.9268795056642608,"scale_y":0.9268795056642608,"scale_z":0.9268795056642608,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1006.5350000000014,"ypos":110.800000297771,"zpos":662.79992,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1629.0890000000006,"ypos":110.800000297771,"zpos":662.79992,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":-1060.5850000000014,"ypos":110.800000297771,"zpos":-524.0134231015958,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":110.800000297771,"zpos":-105.01407999999999,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":1435.742999999999,"ypos":110.800000297771,"zpos":607.7499200000001,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Open Door","item_type":7,"model_url":"models/js/open_door.js","xpos":165.90928062698208,"ypos":110.800000297771,"zpos":-979.4320000000006,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1737.689066945179,"ypos":64.27615429321227,"zpos":-877.7236196726967,"rotation":0,"scale_x":1.7139233419219935,"scale_y":1.7139233419219935,"scale_z":1.7139233419219935,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Red Chair","item_type":1,"model_url":"models/js/ik-ekero-orange_baked.js","xpos":1964.1049866210496,"ypos":64.2761542932123,"zpos":-618.444703017302,"rotation":-1.5707963267948966,"scale_x":1.7139233419219941,"scale_y":1.7139233419219941,"scale_z":1.7139233419219941,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Dresser - Dark Wood","item_type":1,"model_url":"models/js/DWR_MATERA_DRESSER2.js","xpos":1950.52900413866,"ypos":57.785001860754996,"zpos":-361.5037581175612,"rotation":0,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff","#a3a3a3"]},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":1756.877736217012,"ypos":68.55794076138812,"zpos":-67.13724082341834,"rotation":0,"scale_x":1.6114180478821365,"scale_y":1.6114180478821365,"scale_z":1.6114180478821365,"fixed":true,"material_colors":["#ffffff"]},{"item_name":"Sofa - Grey","item_type":1,"model_url":"models/js/cb-rochelle-gray_baked.js","xpos":1772.1688824199364,"ypos":68.55794076138812,"zpos":557.1941275023952,"rotation":3.141592653589793,"scale_x":1.6114180478821365,"scale_y":1.6114180478821365,"scale_z":1.6114180478821365,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Dining table","item_type":1,"model_url":"models/js/BlakeAvenuejoshuatreecheftable.js","xpos":1711.3247495134967,"ypos":52.65881666666665,"zpos":240.75363453665167,"rotation":1.5707963267948966,"scale_x":1.3249999999999997,"scale_y":1.3249999999999997,"scale_z":1.3249999999999997,"fixed":false,"material_colors":["#a3a3a3","#a3a3a3"]},{"item_name":"Dining table","item_type":1,"model_url":"models/js/BlakeAvenuejoshuatreecheftable.js","xpos":-1000.8286847040254,"ypos":39.74250314465408,"zpos":317.2110357190664,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#a3a3a3","#a3a3a3"]},{"item_name":"Bedside table - White","item_type":1,"model_url":"models/js/cb-archnight-white_baked.js","xpos":1731.7816209349915,"ypos":76.67476923651029,"zpos":-587.3841881406494,"rotation":0,"scale_x":2.460726800267727,"scale_y":2.460726800267727,"scale_z":2.460726800267727,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":498.42062292555715,"ypos":52.654571285078994,"zpos":-921.51888833143,"rotation":-1.5707963267948966,"scale_x":1.0232288490017158,"scale_y":1.0232288490017158,"scale_z":1.0232288490017158,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1307.1792918356575,"ypos":51.45923254260269,"zpos":602.2023328258132,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1186.3444992082118,"ypos":51.45923254260269,"zpos":602.3663574168561,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1052.1660253443254,"ypos":51.45923254260269,"zpos":606.038059195525,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":905.2454067751682,"ypos":51.45923254260269,"zpos":603.0623209249558,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":777.2868374895581,"ypos":51.45923254260269,"zpos":617.7926988253262,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":629.9972738821583,"ypos":51.45923254260269,"zpos":604.708318278631,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":512.7149913634055,"ypos":51.45923254260269,"zpos":608.611457216094,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":389.66001280239135,"ypos":51.45923254260269,"zpos":601.6409825588389,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-867.2965065171346,"ypos":51.45923254260269,"zpos":590.1476829497726,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-722.8330479191235,"ypos":51.45923254260269,"zpos":604.0904143028009,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-168.41487119226122,"ypos":51.45923254260269,"zpos":597.1825881331965,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-577.765363283223,"ypos":51.45923254260269,"zpos":596.6200300668113,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-429.16750602220645,"ypos":51.45923254260269,"zpos":607.7840165778605,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-288.9111758833434,"ypos":51.45923254260269,"zpos":606.548356926165,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":108.11950205572839,"ypos":51.45923254260269,"zpos":600.3071447043308,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-24.91189513244649,"ypos":51.45923254260269,"zpos":596.7854878390898,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-92.48906429761058,"ypos":51.45923254260269,"zpos":-573.7813342505672,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":352.26222646011627,"ypos":51.45923254260269,"zpos":-584.9113012127325,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":515.0647378312088,"ypos":51.45923254260269,"zpos":-581.108250139726,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1190.0670771183063,"ypos":51.45923254260269,"zpos":-581.2328280419373,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":929.8438876096236,"ypos":51.45923254260269,"zpos":325.6026051586115,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":794.57772088653,"ypos":51.45923254260269,"zpos":324.9752672383309,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":659.454450173552,"ypos":51.45923254260269,"zpos":324.0024177061651,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":522.5719669317225,"ypos":51.45923254260269,"zpos":330.42131398401204,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":393.408516744689,"ypos":51.45923254260269,"zpos":329.063712523785,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":46.4045051895917,"ypos":51.45923254260269,"zpos":-580.2650181140926,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-136.15283303828818,"ypos":51.45923254260269,"zpos":-918.2832872297154,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":275.74426359550637,"ypos":51.45923254260269,"zpos":-50.656256019319144,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-1.5243576980836906,"ypos":51.45923254260269,"zpos":-919.1559226817759,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":188.71417416105487,"ypos":51.45923254260269,"zpos":-583.8217142587533,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":346.1721111095143,"ypos":51.45923254260269,"zpos":-926.5982316048324,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":782.6662538898096,"ypos":51.45923254260269,"zpos":-921.1646726297914,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"خارجى اساور-سنجر","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1016.4828614665977,"ypos":51.45923254260269,"zpos":-584.9687129262074,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1042.0015464582245,"ypos":51.45923254260269,"zpos":321.04714738180104,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1248.7792828923732,"ypos":51.45923254260269,"zpos":-917.3815375101151,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1096.916502006649,"ypos":51.45923254260269,"zpos":-920.6157953117515,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":933.9801903440343,"ypos":51.45923254260269,"zpos":-914.5933036312965,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-272.4243031515616,"ypos":51.45923254260269,"zpos":-917.930348084592,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":1176.3079476679627,"ypos":51.45923254260269,"zpos":317.5963454085356,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-818.2467386725234,"ypos":51.45923254260269,"zpos":-582.9643224752169,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":633.2813934941157,"ypos":51.45923254260269,"zpos":-920.4951234831285,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":832.0131283236058,"ypos":51.45923254260269,"zpos":-579.4571944301622,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":673.4347028423899,"ypos":51.45923254260269,"zpos":-581.8754217120129,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":78.81389441968582,"ypos":51.45923254260269,"zpos":327.529874939683,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-71.46360981843361,"ypos":51.45923254260269,"zpos":318.4894528632522,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-211.31030145529297,"ypos":51.45923254260269,"zpos":324.15979643614105,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-338.9170938672653,"ypos":51.45923254260269,"zpos":320.9434829977008,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-467.579620687741,"ypos":51.45923254260269,"zpos":314.2371661605363,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-587.7195418384272,"ypos":51.45923254260269,"zpos":316.98377576407523,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-707.8401800365287,"ypos":51.45923254260269,"zpos":313.6135927788884,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-825.0973290303202,"ypos":51.45923254260269,"zpos":312.92469471431315,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-657.6572181895968,"ypos":51.45923254260269,"zpos":-582.9848196744821,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":126.15586037667015,"ypos":51.45923254260269,"zpos":-54.35971380206469,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-16.046457384960604,"ypos":51.45923254260269,"zpos":-52.00946300337888,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-156.97998015878898,"ypos":51.45923254260269,"zpos":-57.946958970564566,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-297.9479717002996,"ypos":51.45923254260269,"zpos":-61.61936671038744,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-414.72443047029157,"ypos":51.45923254260269,"zpos":-62.26155270024857,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-534.5950482938231,"ypos":51.45923254260269,"zpos":-61.19073407590918,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-657.5141170829611,"ypos":51.45923254260269,"zpos":-66.5369846315884,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-781.8464531604507,"ypos":51.45923254260269,"zpos":-64.92087358144052,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":420.9732300540902,"ypos":51.45923254260269,"zpos":-45.21774826633118,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-520.7170551280233,"ypos":51.45923254260269,"zpos":-923.3193331451553,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-666.4686198530653,"ypos":51.45923254260269,"zpos":-913.486429309972,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-384.1355545495608,"ypos":51.45923254260269,"zpos":-574.4008499927046,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-392.3605125265857,"ypos":51.45923254260269,"zpos":-916.0393645574009,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"ثنى اساور-سنجر","model_time":"18","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-815.0255642362529,"ypos":51.45923254260269,"zpos":-913.9623978700001,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"ثنى اساور-سنجر","model_time":"18","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-233.58920507915042,"ypos":51.45923254260269,"zpos":-580.2555179118361,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"داخلى اساور-سنجر تعريش","model_time":"36","format":"gltf","item_type":8,"model_url":"models/gltf/sewing.glb","xpos":-519.3305208785271,"ypos":51.45923254260269,"zpos":-579.6177929559163,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"تركيب اساور-سنجر","model_time":"60","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":554.2118305254293,"ypos":51.45923254260269,"zpos":-51.98577586795615,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"زراير قميص -زراير اتوماتيك","model_time":"60","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":827.9075599169478,"ypos":51.45923254260269,"zpos":-47.72713634488719,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"زراير قميص -زراير اتوماتيك","model_time":"60","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":963.2805082712089,"ypos":51.45923254260269,"zpos":-44.15765218788602,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"زراير قميص -زراير اتوماتيك","model_time":"60","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":700.2232067209562,"ypos":51.45923254260269,"zpos":-46.328174369337084,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"زراير قميص -زراير اتوماتيك","model_time":"60","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":1112.5313643206237,"ypos":51.45923254260269,"zpos":-42.464128657184354,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"زراير قميص -زراير اتوماتيك","model_time":"60","format":"gltf","item_type":1,"model_url":"models/gltf/sewing.glb","xpos":1256.5366708221813,"ypos":51.45923254260269,"zpos":-46.87626331761973,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#ffffff"]},{"item_name":"Dining table","item_type":1,"model_url":"models/js/BlakeAvenuejoshuatreecheftable.js","xpos":-979.4517251555565,"ypos":39.74250314465408,"zpos":-100.83477271013501,"rotation":1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#a3a3a3","#a3a3a3"]},{"item_name":"Dining table","item_type":1,"model_url":"models/js/BlakeAvenuejoshuatreecheftable.js","xpos":1350.5258865435528,"ypos":39.74250314465408,"zpos":309.5194597006592,"rotation":-1.5707963267948966,"scale_x":1,"scale_y":1,"scale_z":1,"fixed":false,"material_colors":["#a3a3a3","#a3a3a3"]}]}';
	blueprint3d.model.loadSerialized(myhome);
	
	
	addBlueprintListeners(blueprint3d);
	datGUI(blueprint3d.three, blueprint3d.floorplanner);
	blueprint3d.three.stopSpin();
//	gui.closed = true;
	
	
	$('#showAddItems').hide();
	$('#viewcontrols').hide();
	
	$('.card').flip({trigger:'manual', axis:'x'});  
	$('#showFloorPlan').click(function()
	{
		$('.card').flip(false);
		$(this).addClass('active');
		$('#showDesign').removeClass('active');
		$('#showFirstPerson').removeClass('active');
		$('#showAddItems').hide();
		$('#viewcontrols').hide();
//		gui.closed = true;
		blueprint3d.three.pauseTheRendering(true);
		blueprint3d.three.getController().setSelectedObject(null);
	});
	
	$('#showDesign').click(function()
	{ 
		blueprint3d.model.floorplan.update();
		$('.card').flip(true);
//		gui.closed = false;
		$(this).addClass('active');
		$('#showFloorPlan').removeClass('active');
		$('#showFirstPerson').removeClass('active');	
		
		$('#showAddItems').show();
		$('#viewcontrols').show();
		
		blueprint3d.three.pauseTheRendering(false);
		blueprint3d.three.switchFPSMode(false);
	});
	$('#showFirstPerson').click(function()
	{ 
		blueprint3d.model.floorplan.update();
		$('.card').flip(true);
//		gui.closed = true;
		$(this).addClass('active');
		$('#showFloorPlan').removeClass('active');
		$('#showDesign').removeClass('active');
		
		$('#showAddItems').hide();
		$('#viewcontrols').hide();
		
		blueprint3d.three.pauseTheRendering(false);
		blueprint3d.three.switchFPSMode(true);
	});
	
	$('#showSwitchCameraMode').click(function()
	{
		$(this).toggleClass('active');
		blueprint3d.three.switchOrthographicMode($(this).hasClass('active'));		
	});
	
	$('#showSwitchWireframeMode').click(function()
	{
		$(this).toggleClass('wireframe-active');
		blueprint3d.three.switchWireframe($(this).hasClass('wireframe-active'));		
	});
	
	$('#topview, #isometryview, #frontview, #leftview, #rightview').click(function(){
		blueprint3d.three.switchView($(this).attr('id'));
	});
	
	
	
	$("#add-items").find(".add-item").mousedown(function(e) {
		console.log("Item added 1");
		var timeSec=parseFloat($(this).attr("model-time"));
		var oldStr=$("#added-items-card").text();
		var a = oldStr.split(':'); // split it at the colons

		// minutes are worth 60 seconds. Hours are worth 60 minutes.
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
		var oldVal = isNaN(seconds) ? 0 : seconds;
		timeSec =isNaN(timeSec) ? 0 : timeSec;
		console.log(isNaN(timeSec));
		console.log("old Time "+oldVal+" new Val1 :"+timeSec);
		var totalTime=timeSec+oldVal;
		$("#added-items-card").text(new Date(totalTime * 1000).toISOString().substr(11, 8));
		
		
	      var modelUrl = $(this).attr("model-url");
	      var itemType = parseInt($(this).attr("model-type"));
	      var itemFormat = $(this).attr('model-format');
	      var metadata = {
	        itemName: $(this).attr("model-name"),
					resizable: true,
					time:$(this).attr("model-time"),
	        modelUrl: modelUrl,
	        itemType: itemType,
	        format: itemFormat,
	        
	      }
	      console.log('Typeeeee => '+itemType);
	/*      if([2,3,7,9].indexOf(metadata.itemType) != -1 && aWall.currentWall)
    	  {
	    	  var placeAt = aWall.currentFloor.center.clone();
	    	  blueprint3d.model.scene.addItem(1, modelUrl, metadata, null, null, null, false, {position: placeAt, edge: aWall.currentWall});
    	  }
	      else*/ if(aWall.currentFloor)
    	  {
	    	  var placeAt = aWall.currentFloor.center.clone();
	    	  blueprint3d.model.scene.addItem(1, modelUrl, metadata, null, null, null, false, {position: placeAt});
    	  }
	      else
    	  {
	    	  blueprint3d.model.scene.addItem(1, modelUrl, metadata);
    	  }
	    });	
});