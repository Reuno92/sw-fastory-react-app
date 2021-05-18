# TODO

* Replace date by relative dates without **birth_year** in people. E.g. created and updated.
* Create Custom Hooks for colors. For example, hair_colors give nothing with any value. e.g. "blond".
* Same for eyes.
* Create Condition for hidden a row if a person do not ride starships or vehicles.
* Create custom hook, for CardColumns with film. DRY DRY DRY DRY…
* Find module for image fallback. Then create pictures set for replace missing legit pictures.
* Create a condition if "id" not exist in Imperial database.   
* Create CardColumns for search. Need a switch with Playlist View.
* Maybe create a TRELLO ?!?

# STATEMENT

## Star Wars Rebels Alliance Search System

Welcome to the Rebel Alliance, young Padawan!
We need motivated people to defeat the Empire.

Lord Vader's spies are everywhere!
We need a way to thwart their plans.

That's why we've decided to give you a mission of the utmost importance!

For the sake of the rebellion, we need to create an interface that will allow us to search the Empire's database.
One of our spies gave his life so that we could access this information.

The Empire's database is accessible at this [URL](https://swapi.dev/).

### Mission Objective

#### Step 1

##### Mandatory

* Creation of a back-end in Node to retrieve data from SWAPI
    * The API will have to be adapted to the needs of the second stage.
    * The API will have to adapt to the needs of the second stage.

##### Optional

* Authentication system that must verify
        * user: Luke
        * password: DadSucks
* The use of HAPI because the rebellion developers like it.

#### Step 2

##### Mandatory

* Creation of a front-end in ReactJS allowing to search easily on the back-end created beforehand.
   * Creation of a search field
   * Creation of a list displaying the results with the name and the image
   * Creation of a form detailing the result where the basic information will be presented

##### Optionnal


* Make highly detailed records
    * Display different records depending on the type of data
* Implementation of a router
    * The router must allow access to any record
    * It can allow direct access to the result of a search
* Implementation of a filter system
    * Implement a filter system by data type (character, ship, ...)
* Implementation of an authentication system with the API
* Use of Redux
* Use of functional and immutability
* A debounce for the search
* Implementation of CSS modules

#### Bonus

Despite the tensions between the Empire and the Wookiee people, it is surprising to find a way to translate into this language in their database.

    * Allow to display the results in Wookiee

Warning, the use of [swapi-node](https://www.npmjs.com/package/swapi-node) is prohibited, as the application is monitored by the Empire.

In order for the alliance's intelligence service to verify the integrity of your code, it will be necessary to make it available on an accessible git repo.
