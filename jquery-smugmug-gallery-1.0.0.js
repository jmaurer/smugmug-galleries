(function($) {
	
var ss = $.smugmugGalleries = {};

var smug_escape = function(str) {
  str = str.replace(/ /g, "-");
  str = str.replace(/'/g, "");
  return str;
};

$.fn.smugmugGalleries = function(options) {
	var nick = options.nickname;
	var category = options.category;
	console.log("category: " + category );
	
	// Setup div
	var div = this;
	div.append("<ul></ul>");
	var ul = div.find("ul");
	// this.empty();
	
	$.smugmug.login.anonymously(function() {
		$.smugmug.albums.get({NickName: nick, Heavy: 1}, function(albums) {
			
			$.each(albums.Albums, function() {
				var album = this;

        // console.log("category");
        // console.log(category);
				if (category == undefined || album.Category.Name == category)
				{
					var url = "http://" + nick + ".smugmug.com/gallery/";
					url += album.id;
					url += "_";
					url += album.Key;
					
					html = "<li><a href=\"" + url + "\" id=\"" + album.id + "\">" + album.Title + "</a></li>";
					ul.append(html);

					$.smugmug.images.get({AlbumID: album.id, AlbumKey: album.Key, Heavy: 1}, function(images) {
						var image = images.Album.Images[0];
						if (image) {
							// console.log(images);
							var li    = $("li a#" + album.id);
							var title = li.text();
							var img   = "<img src=\"" + image.ThumbURL + "\" title=\"" + title + "\"/>";
							li.text("");
							$("li a#" + album.id).append(img);
						}
					});
				}
			});
			// 	var album = this;
			// });
		});
	});
	
};

})(jQuery);

// http://photos.hurleyhome.com/2009/xmas/2009-12-09/IMG0021/736786636_oVM2Q-S.jpg