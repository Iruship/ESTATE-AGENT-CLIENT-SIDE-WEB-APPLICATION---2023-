//w1867413 Irushi Perera

$( function() {

    var $gallery = $( "#gallery" ),
    $favouriteList = $( "#favouriteList" );
  
  // References: https://jqueryui.com/draggable/
  // draggable events
  // cancel: Dragging will not begin if you click an icon.
  // reveret: Dropping the property is required; otherwise, the property will revert to its original location.
  $( "li", $gallery ).draggable({
    cancel: "a.ui-icon", 
    revert: "invalid", 
    containment: "document", 
    helper: "clone",
    cursor: "move"
  });
  
  //Reference: https://jqueryui.com/droppable/
  // droppable area (favouriteList ) 
  $favouriteList.droppable({
    accept: "#gallery > li",
    classes: {
      "ui-droppable-active": "ui-state-highlight"
    },
    drop: function( event, ui ) {
      addToFav( ui.draggable );
    }
  });
  
  // making the Properties droppable (so that it could be  to removed from the favouriteList )
  //Reference: https://jqueryui.com/droppable/
  $gallery.droppable({
    accept: "#favouriteList li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function( event, ui ) {
      removeFromfavouriteList( ui.draggable );
    }
  });
  
  // Adding  properties to the to the favouriteList
  var remove_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Remove from Favorites' class='ui-icon ui-icon-trash'>Remove from list</a>";
  function addToFav( $item ) {
    $item.fadeOut(function() {
      var $list = $( "ul", $favouriteList ).length ?
        $( "ul", $favouriteList ) :
        $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $favouriteList );
  
      $item.find( "a.ui-icon-heart" ).remove();
      $item.append( remove_icon ).appendTo( $list ).fadeIn(function() {
        $item
          .animate({ width: "80px" })
          .find( "img" )
            .animate({ height: "78px" });
      });
    });
  } 
  // Removing properties from the favouriteList
  var add_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Add to List' class='ui-icon ui-icon-heart'>Add to List</a>";
  function removeFromfavouriteList( $item ) {
    $item.fadeOut(function() {
      $item
        .find( "a.ui-icon-trash" )
        .remove() //Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
        .end()
        .css( "width", "180")
        .append( add_icon )
        .find( "img" )
        .css( "height", "120" )
        .end()
        .appendTo( $gallery )
        .fadeIn();
    });
  }
  
  // englarging the  Image
  function enlargeImg( $link ) {
    var src = $link.attr( "href" ),
      title = $link.siblings( "img" ).attr( "alt" ),
      $modal = $( "img[src$='" + src + "']" );
  
    if ( $modal.length ) {
      $modal.dialog( "open" );
    } else {
      var img = $( "<img alt='" + title + "' width='385' height='287' style='display: none; padding: 8px;' />" )
        .attr( "src", src ).appendTo( "body" );
      setTimeout(function() {
        img.dialog({
          title: title,
          width: 400,
          modal: true
        });
      }, 1 );
    }
  }
  
  //functionality (Icons-heart/trash)
  $( "ul.gallery > li" ).on( "click", function( event ) {
    var $item = $( this ),
      $target = $( event.target );
  
    if ( $target.is( "a.ui-icon-heart" ) ) {
      addToFav( $item );
    } else if ( $target.is( "a.ui-icon-trash" ) ) {
      removeFromfavouriteList( $item ); //Removing the item from the favourites list
    }
    return false;
  });
  } );
  
  function clearList(){
    window.location.reload();
  }