function onAddItem(time) {
	var oldVal = isNaN(parseFloat($("#added-items-card").text())) ? 0 : parseFloat($("#added-items-card").text());
	var newVal = parseFloat(time);
	$("#added-items-card").text(oldVal + newVal);
	console.log(item)
}
$(document).ready(function () {
	//var items = [{ "name": "Simplecabinet", "model": "models/gltf/SimpleCabinet.glb", "type": "9", "image": "models/thumbnails_new/SimpleCabinet.png", "format": "gltf" }, { "name": "Bathroomcabinet", "model": "models/gltf/bathroomCabinet.glb", "type": "2", "image": "models/thumbnails_new/bathroomCabinet.png", "format": "gltf" }, { "name": "Bathroomcabinetdrawer", "model": "models/gltf/bathroomCabinetDrawer.glb", "type": "9", "image": "models/thumbnails_new/bathroomCabinetDrawer.png", "format": "gltf" }, { "name": "Bathroommirror", "model": "models/gltf/bathroomMirror.glb", "type": "2", "image": "models/thumbnails_new/bathroomMirror.png", "format": "gltf" }, { "name": "Bathroomsink", "model": "models/gltf/bathroomSink.glb", "type": "9", "image": "models/thumbnails_new/bathroomSink.png", "format": "gltf" }, { "name": "Bathroomsinksquare", "model": "models/gltf/bathroomSinkSquare.glb", "type": "9", "image": "models/thumbnails_new/bathroomSinkSquare.png", "format": "gltf" }, { "name": "Bathtub", "model": "models/gltf/bathtub.glb", "type": "1", "image": "models/thumbnails_new/bathtub.png", "format": "gltf" }, { "name": "Bear", "model": "models/gltf/bear.glb", "type": "2", "image": "models/thumbnails_new/bear.png", "format": "gltf" }, { "name": "Bedbunk", "model": "models/gltf/bedBunk.glb", "type": "1", "image": "models/thumbnails_new/bedBunk.png", "format": "gltf" }, { "name": "Beddouble", "model": "models/gltf/bedDouble.glb", "type": "1", "image": "models/thumbnails_new/bedDouble.png", "format": "gltf" }, { "name": "Bedsingle", "model": "models/gltf/bedSingle.glb", "type": "1", "image": "models/thumbnails_new/bedSingle.png", "format": "gltf" }, { "name": "Bench", "model": "models/gltf/bench.glb", "type": "1", "image": "models/thumbnails_new/bench.png", "format": "gltf" }, { "name": "Benchcushion", "model": "models/gltf/benchCushion.glb", "type": "1", "image": "models/thumbnails_new/benchCushion.png", "format": "gltf" }, { "name": "Benchcushionlow", "model": "models/gltf/benchCushionLow.glb", "type": "1", "image": "models/thumbnails_new/benchCushionLow.png", "format": "gltf" }, { "name": "Bookcaseclosed", "model": "models/gltf/bookcaseClosed.glb", "type": "9", "image": "models/thumbnails_new/bookcaseClosed.png", "format": "gltf" }, { "name": "Bookcasecloseddoors", "model": "models/gltf/bookcaseClosedDoors.glb", "type": "9", "image": "models/thumbnails_new/bookcaseClosedDoors.png", "format": "gltf" }, { "name": "Bookcaseclosedwide", "model": "models/gltf/bookcaseClosedWide.glb", "type": "9", "image": "models/thumbnails_new/bookcaseClosedWide.png", "format": "gltf" }, { "name": "Bookcaseopen", "model": "models/gltf/bookcaseOpen.glb", "type": "1", "image": "models/thumbnails_new/bookcaseOpen.png", "format": "gltf" }, { "name": "Bookcaseopenlow", "model": "models/gltf/bookcaseOpenLow.glb", "type": "1", "image": "models/thumbnails_new/bookcaseOpenLow.png", "format": "gltf" }, { "name": "Books", "model": "models/gltf/books.glb", "type": "0", "image": "models/thumbnails_new/books.png", "format": "gltf" }, { "name": "Cabinetbed", "model": "models/gltf/cabinetBed.glb", "type": "1", "image": "models/thumbnails_new/cabinetBed.png", "format": "gltf" }, { "name": "Cabinetbeddrawer", "model": "models/gltf/cabinetBedDrawer.glb", "type": "1", "image": "models/thumbnails_new/cabinetBedDrawer.png", "format": "gltf" }, { "name": "Cabinetbeddrawertable", "model": "models/gltf/cabinetBedDrawerTable.glb", "type": "1", "image": "models/thumbnails_new/cabinetBedDrawerTable.png", "format": "gltf" }, { "name": "Cabinettelevision", "model": "models/gltf/cabinetTelevision.glb", "type": "1", "image": "models/thumbnails_new/cabinetTelevision.png", "format": "gltf" }, { "name": "Cabinettelevisiondoors", "model": "models/gltf/cabinetTelevisionDoors.glb", "type": "1", "image": "models/thumbnails_new/cabinetTelevisionDoors.png", "format": "gltf" }, { "name": "Cardboardboxclosed", "model": "models/gltf/cardboardBoxClosed.glb", "type": "0", "image": "models/thumbnails_new/cardboardBoxClosed.png", "format": "gltf" }, { "name": "Cardboardboxopen", "model": "models/gltf/cardboardBoxOpen.glb", "type": "0", "image": "models/thumbnails_new/cardboardBoxOpen.png", "format": "gltf" }, { "name": "Ceilingfan", "model": "models/gltf/ceilingFan.glb", "type": "0", "image": "models/thumbnails_new/ceilingFan.png", "format": "gltf" }, { "name": "Chair", "model": "models/gltf/chair.glb", "type": "1", "image": "models/thumbnails_new/chair.png", "format": "gltf" }, { "name": "Chaircushion", "model": "models/gltf/chairCushion.glb", "type": "1", "image": "models/thumbnails_new/chairCushion.png", "format": "gltf" }, { "name": "Chairdesk", "model": "models/gltf/chairDesk.glb", "type": "1", "image": "models/thumbnails_new/chairDesk.png", "format": "gltf" }, { "name": "Chairmoderncushion", "model": "models/gltf/chairModernCushion.glb", "type": "1", "image": "models/thumbnails_new/chairModernCushion.png", "format": "gltf" }, { "name": "Chairmodernframecushion", "model": "models/gltf/chairModernFrameCushion.glb", "type": "1", "image": "models/thumbnails_new/chairModernFrameCushion.png", "format": "gltf" }, { "name": "Chairrounded", "model": "models/gltf/chairRounded.glb", "type": "1", "image": "models/thumbnails_new/chairRounded.png", "format": "gltf" }, { "name": "Coatrack", "model": "models/gltf/coatRack.glb", "type": "2", "image": "models/thumbnails_new/coatRack.png", "format": "gltf" }, { "name": "Coatrackstanding", "model": "models/gltf/coatRackStanding.glb", "type": "1", "image": "models/thumbnails_new/coatRackStanding.png", "format": "gltf" }, { "name": "Computerkeyboard", "model": "models/gltf/computerKeyboard.glb", "type": "0", "image": "models/thumbnails_new/computerKeyboard.png", "format": "gltf" }, { "name": "Computermouse", "model": "models/gltf/computerMouse.glb", "type": "0", "image": "models/thumbnails_new/computerMouse.png", "format": "gltf" }, { "name": "Computerscreen", "model": "models/gltf/computerScreen.glb", "type": "2", "image": "models/thumbnails_new/computerScreen.png", "format": "gltf" }, { "name": "Desk", "model": "models/gltf/desk.glb", "type": "1", "image": "models/thumbnails_new/desk.png", "format": "gltf" }, { "name": "Deskcorner", "model": "models/gltf/deskCorner.glb", "type": "2", "image": "models/thumbnails_new/deskCorner.png", "format": "gltf" }, { "name": "Doorway", "model": "models/gltf/doorway.glb", "type": "3", "image": "models/thumbnails_new/doorway.png", "format": "gltf" }, { "name": "Doorwayfront", "model": "models/gltf/doorwayFront.glb", "type": "3", "image": "models/thumbnails_new/doorwayFront.png", "format": "gltf" }, { "name": "Doorwayopen", "model": "models/gltf/doorwayOpen.glb", "type": "3", "image": "models/thumbnails_new/doorwayOpen.png", "format": "gltf" }, { "name": "Dryer", "model": "models/gltf/dryer.glb", "type": "2", "image": "models/thumbnails_new/dryer.png", "format": "gltf" }, { "name": "Floorcorner", "model": "models/gltf/floorCorner.glb", "type": "0", "image": "models/thumbnails_new/floorCorner.png", "format": "gltf" }, { "name": "Floorcornerround", "model": "models/gltf/floorCornerRound.glb", "type": "0", "image": "models/thumbnails_new/floorCornerRound.png", "format": "gltf" }, { "name": "Floorfull", "model": "models/gltf/floorFull.glb", "type": "0", "image": "models/thumbnails_new/floorFull.png", "format": "gltf" }, { "name": "Floorhalf", "model": "models/gltf/floorHalf.glb", "type": "0", "image": "models/thumbnails_new/floorHalf.png", "format": "gltf" }, { "name": "Hoodlarge", "model": "models/gltf/hoodLarge.glb", "type": "0", "image": "models/thumbnails_new/hoodLarge.png", "format": "gltf" }, { "name": "Hoodmodern", "model": "models/gltf/hoodModern.glb", "type": "0", "image": "models/thumbnails_new/hoodModern.png", "format": "gltf" }, { "name": "Kitchenbar", "model": "models/gltf/kitchenBar.glb", "type": "9", "image": "models/thumbnails_new/kitchenBar.png", "format": "gltf" }, { "name": "Kitchenbarend", "model": "models/gltf/kitchenBarEnd.glb", "type": "9", "image": "models/thumbnails_new/kitchenBarEnd.png", "format": "gltf" }, { "name": "Kitchenblender", "model": "models/gltf/kitchenBlender.glb", "type": "0", "image": "models/thumbnails_new/kitchenBlender.png", "format": "gltf" }, { "name": "Kitchencabinet", "model": "models/gltf/kitchenCabinet.glb", "type": "9", "image": "models/thumbnails_new/kitchenCabinet.png", "format": "gltf" }, { "name": "Kitchencabinetcornerinner", "model": "models/gltf/kitchenCabinetCornerInner.glb", "type": "9", "image": "models/thumbnails_new/kitchenCabinetCornerInner.png", "format": "gltf" }, { "name": "Kitchencabinetcornerround", "model": "models/gltf/kitchenCabinetCornerRound.glb", "type": "9", "image": "models/thumbnails_new/kitchenCabinetCornerRound.png", "format": "gltf" }, { "name": "Kitchencabinetdrawer", "model": "models/gltf/kitchenCabinetDrawer.glb", "type": "2", "image": "models/thumbnails_new/kitchenCabinetDrawer.png", "format": "gltf" }, { "name": "Kitchencabinetupper", "model": "models/gltf/kitchenCabinetUpper.glb", "type": "2", "image": "models/thumbnails_new/kitchenCabinetUpper.png", "format": "gltf" }, { "name": "Kitchencabinetuppercorner", "model": "models/gltf/kitchenCabinetUpperCorner.glb", "type": "2", "image": "models/thumbnails_new/kitchenCabinetUpperCorner.png", "format": "gltf" }, { "name": "Kitchencabinetupperdouble", "model": "models/gltf/kitchenCabinetUpperDouble.glb", "type": "2", "image": "models/thumbnails_new/kitchenCabinetUpperDouble.png", "format": "gltf" }, { "name": "Kitchencabinetupperlow", "model": "models/gltf/kitchenCabinetUpperLow.glb", "type": "2", "image": "models/thumbnails_new/kitchenCabinetUpperLow.png", "format": "gltf" }, { "name": "Kitchencoffeemachine", "model": "models/gltf/kitchenCoffeeMachine.glb", "type": "0", "image": "models/thumbnails_new/kitchenCoffeeMachine.png", "format": "gltf" }, { "name": "Kitchenfridge", "model": "models/gltf/kitchenFridge.glb", "type": "1", "image": "models/thumbnails_new/kitchenFridge.png", "format": "gltf" }, { "name": "Kitchenfridgebuiltin", "model": "models/gltf/kitchenFridgeBuiltIn.glb", "type": "1", "image": "models/thumbnails_new/kitchenFridgeBuiltIn.png", "format": "gltf" }, { "name": "Kitchenfridgelarge", "model": "models/gltf/kitchenFridgeLarge.glb", "type": "1", "image": "models/thumbnails_new/kitchenFridgeLarge.png", "format": "gltf" }, { "name": "Kitchenfridgesmall", "model": "models/gltf/kitchenFridgeSmall.glb", "type": "1", "image": "models/thumbnails_new/kitchenFridgeSmall.png", "format": "gltf" }, { "name": "Kitchenmicrowave", "model": "models/gltf/kitchenMicrowave.glb", "type": "0", "image": "models/thumbnails_new/kitchenMicrowave.png", "format": "gltf" }, { "name": "Kitchensink", "model": "models/gltf/kitchenSink.glb", "type": "1", "image": "models/thumbnails_new/kitchenSink.png", "format": "gltf" }, { "name": "Kitchenstove", "model": "models/gltf/kitchenStove.glb", "type": "1", "image": "models/thumbnails_new/kitchenStove.png", "format": "gltf" }, { "name": "Kitchenstoveelectric", "model": "models/gltf/kitchenStoveElectric.glb", "type": "1", "image": "models/thumbnails_new/kitchenStoveElectric.png", "format": "gltf" }, { "name": "Lamproundfloor", "model": "models/gltf/lampRoundFloor.glb", "type": "1", "image": "models/thumbnails_new/lampRoundFloor.png", "format": "gltf" }, { "name": "Lamproundtable", "model": "models/gltf/lampRoundTable.glb", "type": "0", "image": "models/thumbnails_new/lampRoundTable.png", "format": "gltf" }, { "name": "Lampsquareceiling", "model": "models/gltf/lampSquareCeiling.glb", "type": "0", "image": "models/thumbnails_new/lampSquareCeiling.png", "format": "gltf" }, { "name": "Lampsquarefloor", "model": "models/gltf/lampSquareFloor.glb", "type": "1", "image": "models/thumbnails_new/lampSquareFloor.png", "format": "gltf" }, { "name": "Lampsquaretable", "model": "models/gltf/lampSquareTable.glb", "type": "0", "image": "models/thumbnails_new/lampSquareTable.png", "format": "gltf" }, { "name": "Lampwall", "model": "models/gltf/lampWall.glb", "type": "2", "image": "models/thumbnails_new/lampWall.png", "format": "gltf" }, { "name": "Laptop", "model": "models/gltf/laptop.glb", "type": "0", "image": "models/thumbnails_new/laptop.png", "format": "gltf" }, { "name": "Loungechair", "model": "models/gltf/loungeChair.glb", "type": "1", "image": "models/thumbnails_new/loungeChair.png", "format": "gltf" }, { "name": "Loungechairrelax", "model": "models/gltf/loungeChairRelax.glb", "type": "1", "image": "models/thumbnails_new/loungeChairRelax.png", "format": "gltf" }, { "name": "Loungedesignchair", "model": "models/gltf/loungeDesignChair.glb", "type": "1", "image": "models/thumbnails_new/loungeDesignChair.png", "format": "gltf" }, { "name": "Loungedesignsofa", "model": "models/gltf/loungeDesignSofa.glb", "type": "1", "image": "models/thumbnails_new/loungeDesignSofa.png", "format": "gltf" }, { "name": "Loungedesignsofacorner", "model": "models/gltf/loungeDesignSofaCorner.glb", "type": "9", "image": "models/thumbnails_new/loungeDesignSofaCorner.png", "format": "gltf" }, { "name": "Loungesofa", "model": "models/gltf/loungeSofa.glb", "type": "1", "image": "models/thumbnails_new/loungeSofa.png", "format": "gltf" }, { "name": "Loungesofacorner", "model": "models/gltf/loungeSofaCorner.glb", "type": "9", "image": "models/thumbnails_new/loungeSofaCorner.png", "format": "gltf" }, { "name": "Loungesofalong", "model": "models/gltf/loungeSofaLong.glb", "type": "1", "image": "models/thumbnails_new/loungeSofaLong.png", "format": "gltf" }, { "name": "Loungesofaottoman", "model": "models/gltf/loungeSofaOttoman.glb", "type": "1", "image": "models/thumbnails_new/loungeSofaOttoman.png", "format": "gltf" }, { "name": "Paneling", "model": "models/gltf/paneling.glb", "type": "2", "image": "models/thumbnails_new/paneling.png", "format": "gltf" }, { "name": "Pillow", "model": "models/gltf/pillow.glb", "type": "0", "image": "models/thumbnails_new/pillow.png", "format": "gltf" }, { "name": "Pillowblue", "model": "models/gltf/pillowBlue.glb", "type": "0", "image": "models/thumbnails_new/pillowBlue.png", "format": "gltf" }, { "name": "Pillowbluelong", "model": "models/gltf/pillowBlueLong.glb", "type": "0", "image": "models/thumbnails_new/pillowBlueLong.png", "format": "gltf" }, { "name": "Pillowlong", "model": "models/gltf/pillowLong.glb", "type": "0", "image": "models/thumbnails_new/pillowLong.png", "format": "gltf" }, { "name": "Plantsmall1", "model": "models/gltf/plantSmall1.glb", "type": "1", "image": "models/thumbnails_new/plantSmall1.png", "format": "gltf" }, { "name": "Plantsmall2", "model": "models/gltf/plantSmall2.glb", "type": "1", "image": "models/thumbnails_new/plantSmall2.png", "format": "gltf" }, { "name": "Plantsmall3", "model": "models/gltf/plantSmall3.glb", "type": "1", "image": "models/thumbnails_new/plantSmall3.png", "format": "gltf" }, { "name": "Pottedplant", "model": "models/gltf/pottedPlant.glb", "type": "1", "image": "models/thumbnails_new/pottedPlant.png", "format": "gltf" }, { "name": "Radio", "model": "models/gltf/radio.glb", "type": "0", "image": "models/thumbnails_new/radio.png", "format": "gltf" }, { "name": "Rugdoormat", "model": "models/gltf/rugDoormat.glb", "type": "1", "image": "models/thumbnails_new/rugDoormat.png", "format": "gltf" }, { "name": "Rugrectangle", "model": "models/gltf/rugRectangle.glb", "type": "1", "image": "models/thumbnails_new/rugRectangle.png", "format": "gltf" }, { "name": "Ruground", "model": "models/gltf/rugRound.glb", "type": "1", "image": "models/thumbnails_new/rugRound.png", "format": "gltf" }, { "name": "Rugrounded", "model": "models/gltf/rugRounded.glb", "type": "1", "image": "models/thumbnails_new/rugRounded.png", "format": "gltf" }, { "name": "Rugsquare", "model": "models/gltf/rugSquare.glb", "type": "1", "image": "models/thumbnails_new/rugSquare.png", "format": "gltf" }, { "name": "Shower", "model": "models/gltf/shower.glb", "type": "9", "image": "models/thumbnails_new/shower.png", "format": "gltf" }, { "name": "Showerround", "model": "models/gltf/showerRound.glb", "type": "9", "image": "models/thumbnails_new/showerRound.png", "format": "gltf" }, { "name": "Sidetable", "model": "models/gltf/sideTable.glb", "type": "1", "image": "models/thumbnails_new/sideTable.png", "format": "gltf" }, { "name": "Sidetabledrawers", "model": "models/gltf/sideTableDrawers.glb", "type": "1", "image": "models/thumbnails_new/sideTableDrawers.png", "format": "gltf" }, { "name": "Speaker", "model": "models/gltf/speaker.glb", "type": "1", "image": "models/thumbnails_new/speaker.png", "format": "gltf" }, { "name": "Speakersmall", "model": "models/gltf/speakerSmall.glb", "type": "1", "image": "models/thumbnails_new/speakerSmall.png", "format": "gltf" }, { "name": "Stairs", "model": "models/gltf/stairs.glb", "type": "1", "image": "models/thumbnails_new/stairs.png", "format": "gltf" }, { "name": "Stairscorner", "model": "models/gltf/stairsCorner.glb", "type": "1", "image": "models/thumbnails_new/stairsCorner.png", "format": "gltf" }, { "name": "Stairsopen", "model": "models/gltf/stairsOpen.glb", "type": "1", "image": "models/thumbnails_new/stairsOpen.png", "format": "gltf" }, { "name": "Stairsopensingle", "model": "models/gltf/stairsOpenSingle.glb", "type": "1", "image": "models/thumbnails_new/stairsOpenSingle.png", "format": "gltf" }, { "name": "Stoolbar", "model": "models/gltf/stoolBar.glb", "type": "1", "image": "models/thumbnails_new/stoolBar.png", "format": "gltf" }, { "name": "Stoolbarsquare", "model": "models/gltf/stoolBarSquare.glb", "type": "1", "image": "models/thumbnails_new/stoolBarSquare.png", "format": "gltf" }, { "name": "Table", "model": "models/gltf/table.glb", "type": "1", "image": "models/thumbnails_new/table.png", "format": "gltf" }, { "name": "Tablecloth", "model": "models/gltf/tableCloth.glb", "type": "1", "image": "models/thumbnails_new/tableCloth.png", "format": "gltf" }, { "name": "Tablecoffee", "model": "models/gltf/tableCoffee.glb", "type": "1", "image": "models/thumbnails_new/tableCoffee.png", "format": "gltf" }, { "name": "Tablecoffeeglass", "model": "models/gltf/tableCoffeeGlass.glb", "type": "1", "image": "models/thumbnails_new/tableCoffeeGlass.png", "format": "gltf" }, { "name": "Tablecoffeeglasssquare", "model": "models/gltf/tableCoffeeGlassSquare.glb", "type": "1", "image": "models/thumbnails_new/tableCoffeeGlassSquare.png", "format": "gltf" }, { "name": "Tablecoffeesquare", "model": "models/gltf/tableCoffeeSquare.glb", "type": "1", "image": "models/thumbnails_new/tableCoffeeSquare.png", "format": "gltf" }, { "name": "Tablecross", "model": "models/gltf/tableCross.glb", "type": "1", "image": "models/thumbnails_new/tableCross.png", "format": "gltf" }, { "name": "Tablecrosscloth", "model": "models/gltf/tableCrossCloth.glb", "type": "1", "image": "models/thumbnails_new/tableCrossCloth.png", "format": "gltf" }, { "name": "Tableglass", "model": "models/gltf/tableGlass.glb", "type": "1", "image": "models/thumbnails_new/tableGlass.png", "format": "gltf" }, { "name": "Tableround", "model": "models/gltf/tableRound.glb", "type": "1", "image": "models/thumbnails_new/tableRound.png", "format": "gltf" }, { "name": "Televisionantenna", "model": "models/gltf/televisionAntenna.glb", "type": "2", "image": "models/thumbnails_new/televisionAntenna.png", "format": "gltf" }, { "name": "Televisionmodern", "model": "models/gltf/televisionModern.glb", "type": "2", "image": "models/thumbnails_new/televisionModern.png", "format": "gltf" }, { "name": "Televisionvintage", "model": "models/gltf/televisionVintage.glb", "type": "2", "image": "models/thumbnails_new/televisionVintage.png", "format": "gltf" }, { "name": "Toaster", "model": "models/gltf/toaster.glb", "type": "0", "image": "models/thumbnails_new/toaster.png", "format": "gltf" }, { "name": "Toilet", "model": "models/gltf/toilet.glb", "type": "1", "image": "models/thumbnails_new/toilet.png", "format": "gltf" }, { "name": "Toiletsquare", "model": "models/gltf/toiletSquare.glb", "type": "1", "image": "models/thumbnails_new/toiletSquare.png", "format": "gltf" }, { "name": "Trashcan", "model": "models/gltf/trashcan.glb", "type": "1", "image": "models/thumbnails_new/trashcan.png", "format": "gltf" }, { "name": "Wall", "model": "models/gltf/wall.glb", "type": "0", "image": "models/thumbnails_new/wall.png", "format": "gltf" }, { "name": "Wallcorner", "model": "models/gltf/wallCorner.glb", "type": "0", "image": "models/thumbnails_new/wallCorner.png", "format": "gltf" }, { "name": "Wallcornerrond", "model": "models/gltf/wallCornerRond.glb", "type": "0", "image": "models/thumbnails_new/wallCornerRond.png", "format": "gltf" }, { "name": "Walldoorway", "model": "models/gltf/wallDoorway.glb", "type": "3", "image": "models/thumbnails_new/wallDoorway.png", "format": "gltf" }, { "name": "Walldoorwaywide", "model": "models/gltf/wallDoorwayWide.glb", "type": "3", "image": "models/thumbnails_new/wallDoorwayWide.png", "format": "gltf" }, { "name": "Wallhalf", "model": "models/gltf/wallHalf.glb", "type": "0", "image": "models/thumbnails_new/wallHalf.png", "format": "gltf" }, { "name": "Wallwindow", "model": "models/gltf/wallWindow.glb", "type": "3", "image": "models/thumbnails_new/wallWindow.png", "format": "gltf" }, { "name": "Wallwindowslide", "model": "models/gltf/wallWindowSlide.glb", "type": "3", "image": "models/thumbnails_new/wallWindowSlide.png", "format": "gltf" }, { "name": "Washer", "model": "models/gltf/washer.glb", "type": "1", "image": "models/thumbnails_new/washer.png", "format": "gltf" }, { "name": "Washerdryerstacked", "model": "models/gltf/washerDryerStacked.glb", "type": "1", "image": "models/thumbnails_new/washerDryerStacked.png", "format": "gltf" }];
	
	//var items = [{ "time":"344","name": "مكنه 1", "model": "models/gltf/sewing.glb", "type": "1", "image": "models/thumbnails_new/sweing.png", "format": "gltf" },{ "time":"111","name": "sewingMachine2", "model": "models/gltf/sewing.glb", "type": "1", "image": "models/thumbnails_new/sweing.png", "format": "gltf" }];
	/*
	var items = [{
		"time": "14",
		"name": "تعريش رجل الياقة-اوفر 3 فتلة",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Over_3_Fatla.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "ثنى رجل الياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى بالين-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "60",
		"name": "خياطة بالين-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "24",
		"name": "داخلى راس ياقة-سنجر تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "قلب وتعريش راس ياقة-مقلاب",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/meklab.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى راس ياقة-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "24",
		"name": "خارجى راس ياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "10",
		"name": "تعريش نصفى راس ياقة-مكبس تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makbas_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "خياطة راس & رجل-سنجر تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى نهائى الياقة-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "15",
		"name": "تعريش نهائى-اوفر 3 فتلة",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Over_3_Fatla.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "بنط نصف الياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	}];
*/
var items = [{
		"time": "14",
		"name": "تعريش رجل الياقة-اوفر 3 فتلة",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Over_3_Fatla.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "ثنى رجل الياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى بالين-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "60",
		"name": "خياطة بالين-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "24",
		"name": "داخلى راس ياقة-سنجر تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "قلب وتعريش راس ياقة-مقلاب",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/meklab.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى راس ياقة-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "24",
		"name": "خارجى راس ياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "10",
		"name": "تعريش نصفى راس ياقة-مكبس تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makbas_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "خياطة راس & رجل-سنجر تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى نهائى الياقة-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "15",
		"name": "تعريش نهائى-اوفر 3 فتلة",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Over_3_Fatla.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "بنط نصف الياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "9",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "20",
		"name": "مكوى عصفورة-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "7",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "24",
		"name": "خياطة شريط كم-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "7",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "تثبيت شريط كم-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "7",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "20",
		"name": "مكوى ثنى عصفورة-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "7",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "60",
		"name": "تركيب عصفورة كم-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "7",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "عروة كم-عراوى",
		"model": "models/gltf/sewing.glb",
		"type": "7",
		"image": "models/thumbnails_new/Sewing_Machine/3rawy.jpg",
		"format": "gltf"
	},
	{
		"time": "20",
		"name": "تركيب تكت-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "3",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "30",
		"name": "تجميع قصتى الظهر-اوفر5 فتلة",
		"model": "models/gltf/sewing.glb",
		"type": "3",
		"image": "models/thumbnails_new/Sewing_Machine/Over_5_fatla.jpg",
		"format": "gltf"
	},
	{
		"time": "30",
		"name": "شيمة قصتى الظهر-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "3",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "تجميع سفرة الظهر-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "3",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "شيمة الظهر-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "3",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى الظهر-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "3",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكبس يمين-مكبس صدر",
		"model": "models/gltf/sewing.glb",
		"type": "2",
		"image": "models/thumbnails_new/Sewing_Machine/makbas_Sadr.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "مكبس شمال-مكبس صدر",
		"model": "models/gltf/sewing.glb",
		"type": "2",
		"image": "models/thumbnails_new/Sewing_Machine/makbas_Sadr.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "خياطة باندا يمين-سنجر بولر",
		"model": "models/gltf/sewing.glb",
		"type": "2",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_poler.jpg",
		"format": "gltf"
	},
	{
		"time": "24",
		"name": "خياطة باندا شمال-سنجر بولر",
		"model": "models/gltf/sewing.glb",
		"type": "2",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_poler.jpg",
		"format": "gltf"
	},
	{
		"time": "29",
		"name": "عراوى باندا-عراوى اتوماتيك",
		"model": "models/gltf/sewing.glb",
		"type": "2",
		"image": "models/thumbnails_new/Sewing_Machine/3rawy_otomatic.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى باندا-مكوى",
		"model": "models/gltf/sewing.glb",
		"type": "2",
		"image": "models/thumbnails_new/Sewing_Machine/Makwa.jpg",
		"format": "gltf"
	},
	{
		"time": "18",
		"name": "ثنى اساور-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "8",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "36",
		"name": "داخلى اساور-سنجر تعريش",
		"model": "models/gltf/sewing.glb",
		"type": "8",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_Ta3resh.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "قلب وتعريش اساور-مقلاب",
		"model": "models/gltf/sewing.glb",
		"type": "8",
		"image": "models/thumbnails_new/Sewing_Machine/meklab.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "مكوى اساور-مكبس اساور",
		"model": "models/gltf/sewing.glb",
		"type": "8",
		"image": "models/thumbnails_new/Sewing_Machine/Makbas_asawr.jpg",
		"format": "gltf"
	},
	{
		"time": "36",
		"name": "خارجى اساور-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "8",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "14",
		"name": "عروة اساور-عراوى",
		"model": "models/gltf/sewing.glb",
		"type": "8",
		"image": "models/thumbnails_new/Sewing_Machine/3rawy.jpg",
		"format": "gltf"
	},
	{
		"time": "30",
		"name": "كتف -سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "تركيب كم-سنجر 2ابرة",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer_2_ibra.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "رد كم-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "30",
		"name": "تركيب ياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "رد ياقة-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "خياطة جنب-كوع",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/KOO3.jpg",
		"format": "gltf"
	},
	{
		"time": "40",
		"name": "خياطة ذيل-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "60",
		"name": "تركيب اساور-سنجر",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Singer.jpg",
		"format": "gltf"
	},
	{
		"time": "30",
		"name": "عروة ياقة + تنشين زراير-عراوى",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/3rawy.jpg",
		"format": "gltf"
	},
	{
		"time": "60",
		"name": "زراير قميص -زراير اتوماتيك",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Zarair_otomatic.jpg",
		"format": "gltf"
	},
	{
		"time": "15",
		"name": "زرار كم-زراير",
		"model": "models/gltf/sewing.glb",
		"type": "1",
		"image": "models/thumbnails_new/Sewing_Machine/Zarair.jpg",
		"format": "gltf"
	}];



	
	var modelTypesNum = ["1", "2", "3", "7", "8", "9"];

	var modelTypesIds = ["floor-items", "wall-items", "in-wall-items", "in-wall-floor-items", "on-floor-items", "wall-floor-items"];

	var itemsDiv = $("#items-wrapper");

	for (var i = 0; i < items.length; i++) 
	
	{
	
		var item = items[i];
	
		itemsDiv = $("#"+modelTypesIds[modelTypesNum.indexOf(item.type)]+"-wrapper");
	
		var modelformat = (item.format) ?' model-format="'+item.format+'"' : "";
	
		var html = '<div class="col-sm-4">' + '<a class="thumbnail add-item"' +' model-name="'+ item.name +'"' +' model-time="'+ item.time +'"' +' model-url="' +item.model+'"' +' model-type="' +item.type+'"' + modelformat+'>'+'<img src="'+item.image +'" alt="Add Item"   data-dismiss="modal"	> '+item.name +'</a></div>';
	
		itemsDiv.append(html);
	
	}
/*
	function getItems() {
		$.get("http://www.mocky.io/v2/5ce15e3e320000112d2f62dd", function (data) {
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				item.time = parseInt(Math.random() * 100);
				itemsDiv = $("#" + modelTypesIds[modelTypesNum.indexOf(item.type)] + "-wrapper");
				var modelformat = (item.format) ? ' model-format="' + item.format + '"' : "";
				var html = '<div class="col-sm-4">' + '<a class="thumbnail add-item"' +' model-name="'+ item.name +'"' +' model-time="'+ item.time +'"' +' model-url="' +item.model+'"' +' model-type="' +item.type+'"' + modelformat+'>'+'<img src="'+item.image +'" alt="Add Item"   data-dismiss="modal" 	> '+item.name +'</a></div>';
	
				itemsDiv.append(html);
			}

		});
	}
	getItems();

*/
});
