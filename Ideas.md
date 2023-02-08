# Ideas sobre posibles temas del proyecto

#### APIs públicas:

Anime: https://github.com/AniList/ApiV2-GraphQL-Docs/blob/master/README.md

UserGenerator: https://randomuser.me/

CatFacts: https://github.com/alexwohlbruck/cat-facts

ApiMusica: https://rapidapi.com/theaudiodb/api/theaudiodb/


## Brainstorming de ideas


#### Aplicación musica:

	-integracion con la api de spotify
	
	-integracion de un buscador que haga las peticiones una vez se encuentra una de las canciones y se pulsa enviar

El usuario hace una peticion a la API desde el front, esta devuelve los datos y a traves de otra API guarda en base de datos los datos recuperados sobre la cancion o artista haciendo así una lista de canciones / artistas favoritos y sus detalles.

https://rapidapi.com/theaudiodb/api/theaudiodb/


#### Aplicación de préstamos de libros entre particulares

	-Cada usuario tendrá asociado los libros que tenga disponibles para prestar así como si se encuentran o no disponibles.
	
	-Cada usuario podrá pedir prestado un número limitado de libros simultaneamente.
	
	-Se podrá buscar libros por título, autor, año, prestamista de este o género literario/temática.
	

#### Aplicación de lista de la compra compartida entre personas.

	-Cada lista de la compra tendrá asociado al menos a un usuario.
	
	-Cada usuario podrá añadir o eliminar artículos de la lista.
	
	-Un usuario puede crear, obtener, modificar y eliminar listas de la compra y añadir usuarios que colaborarán en la compra de esta.
	
	-Cada usuario podrá marcar como reservados ciertos productos de la lista para indicar que será quien se encargue de comprarlos.
	
	-Cada artículo de la lista debe tener un identificador, un nombre del producto. Opcionalmente puede añadirse la marca y el precio del producto.
	
	(Esta aplicación puede ir orientada a compañeros de piso, familias, preparación de eventos y listas de bodas).


#### Aplicación de Animes

- Aplicación estilo myanimelist-> lo mismo pero con animes

- https://medium.com/nerd-for-tech/how-to-fetch-data-from-the-anilist-api-graphql-using-axios-77527efc8a89

Ejemplo de como usar la api


## Idea Final - MoneyMate


#### Aplicacion de gastos con gráficas -> ReactCharts con la información que 
le vayas pasando.

	- Desplegable con el tipo de gasto, input de texto con el nombre del gasto, etc.
	
	- Mostrar gastos en tabla + graficas.
	
	- Conversiones de monedas usando api externa.


https://github.com/fawazahmed0/currency-api#readme -> **Api de conversiones**

**Librerías de gráficas**

	- https://react-charts.tanstack.com/

	- https://www.chartjs.org/
