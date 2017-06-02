# The Selector (ts)

## Usage :

- ``window.ts(options)`` *or* ``ts(options)``

- options : 
    - ``options.debug`` (optional) : Display some console.log|info|warn
    - ``options.domElement`` (required) : The selector for a DOM element, or the DOM element itself
    - ``options.resolve`` (required) : The function triggered onClick, giving the selected id
    - ``options.reject`` (required) : The function triggered on any error
    - ``options.translate`` (required) : The function used to obtain the translated texts
    - ``options.sort`` (optional) : The function used to sort the incoming data

n.b : ``options.locale`` is no more provided to the ``options.translate(id)`` function, as it is assumed it will be managed somehow (be it currying, or anything else) 

### Required Structure for text translation :

``translate(id)`` must return a structure compatible with the one below (``description`` is optional).

```
{
    title: "a title",
    description: "some (OPTIONAL) description, not displayed if missing",
    button: "the text displayed inside the button"
}
```
