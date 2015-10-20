
var hbs = require( 'express-hbs' ) ;
var util = require( 'util' ) ;
var showdown  = require( 'showdown-ghost' ) ;
var converter = new showdown.converter( { extensions: ['ghostgfm'] } ) ;

var config = require( './config.local.js' ) ;

var helpers = hbs.handlebars.helpers ;


hbs.registerHelper( 'annonces' , function( count , options ) {
	
	var i , j , path , element ,
		output = '' ,
		keys = Object.keys( config.annonces ) ,
		selectedKeys = [] ;
	
	//if ( count > keys.length ) { count = keys.length ; }
	
	// Knuth-Fisher-Yates shuffle algorithm
	for ( i = keys.length - 1 ; i ; i-- )
	{
		j = Math.floor( Math.random() * ( i + 1 ) ) ;
		tmp = keys[ i ] ;
		keys[ i ] = keys[ j ] ;
		keys[ j ] = tmp ;
	}
	
	keys = keys.slice( 0 , count ) ;
	
	for ( i = 0 ; i < keys.length ; i ++ )
	{
		element = config.annonces[ keys[ i ] ] ;
		
		path = helpers.asset( 'annonces/' + element.image ) ;
		
		output += element.href ? '<a class="annonce" href="' + element.href + '" target="_blank">' : '<div class="annonce">' ;
		output += '<img class="annonce-image" src="' + path + '" />' ;
		
		if ( element.text ) { output += '<div class="annonce-text">' + converter.makeHtml( element.text ) + '</div>' ; }
		
		output += element.href ? '</a>' : '</div>' ;
	}
	
	//console.log( "annonces output:" , output ) ;
	
	return output ;
} ) ;



hbs.registerHelper( 'dump' , function( arg1 , arg2 , arg3 , options ) {
	
	var out = '' ;
	
	/*
	out += 'Arg1:' + arg1 + ' -- ' + 'Arg2:' + arg2 + ' -- ' + 'Arg3:' + arg3 +
		' -- ' + util.inspect( options ) +
		' -- ' + util.inspect( this ) ;
	*/
	
	console.log( '\n\n========================================================\n\n' ) ;
	
	console.log( '\n\noptions:\n\n' , options.data ) ;
	/*
	console.log( '\n\noptions:\n\n' , options ) ;
	console.log( '\n\nthis:\n\n' , this ) ;
	
	console.log( '\n\noptions.fn:\n\n' , options.fn ) ;
	console.log( '\n\noptions.inverse:\n\n' , options.inverse ) ;
	
	console.log( '\n\n' ) ;
	console.log( 'arg1:' , arg1 ) ;
	console.log( 'arg2:' , arg2 ) ;
	console.log( 'arg3:' , arg3 ) ;
	console.log( '\n\n' ) ;
	*/
	
	// options.fn(this) : options.inverse(this);
	
	return out ;
} ) ;
