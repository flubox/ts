# The Selector (ts)

## Usage for compiled widget :

- ``window.ts(options)`` *or* ``ts(options)``

- options : 
    - ``options.debug`` (optional) : Display some console.log|info|warn
    - ``options.domElement`` (required) : The selector for a DOM element, or the DOM element itself
    - ``options.locale`` (required) : The locale value to be provided to the ``translate`` function (see below) 
    - ``options.resolve`` (required) : The function triggered onClick, giving the selected id
    - ``options.reject`` (required) : The function triggered on any error
    - ``options.translate`` (required) : The function used to obtain the translated texts

### Required Structure for text translation :

``translate(id, locale)`` must return a structure compatible with the one below .

```
{
    title: "a title",
    description: "some description (optional)",
    button: "the text displayed inside the button"
}
```