# The Selector (ts)

## Usage :

- ``window.ts(options)`` *or* ``ts(options)``

- options : 
    - ``options.debug: false`` (optional) : Display some console.log|info|warn
    - ``options.domElement`` (required) : The selector for a DOM element, or the DOM element itself
    - ``options.resolve`` (required) : The function triggered onClick, giving the selected id
    - ``options.reject`` (required) : The function triggered on any error
    - ``options.sort`` (optional) : The function used to sort the incoming data
    - ``options.tracking`` (optional) : Object containing Google Analytics tracking informations
        - ``options.tracking.id`` (optional) : The Google Analytics tracking id used for events tracking. If provided, enable automatically events tracking.
        - ``options.tracking.options`` (optional if no `id`, required otherwise) : Google Analytics options used during initialization. see [Analytics.js Field Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference)
        - 
    - ``options.translate`` (required) : The function used to obtain the translated texts

n.b : ``options.locale`` is no more provided to the ``options.translate(id)`` function, as it is assumed it will be managed somehow (be it currying, or anything else), and hence, not required anymore.


### options.tracking.options default keys and values : 

```
options.tracking.options = {
    language: (options.tracking.options.language || options.locale || getLocale(),
    screenResolution: getScreenResolution(),
    viewportSize: getViewport()
}
```

``getLocale()``, ``getScreenResolution()`` and ``getViewport()`` are internal methods

### Required Structure for text translation :

``translate(id)`` must return a structure compatible with the one below (``description`` is optional).

```
{
    title: "a title",
    description: "some (OPTIONAL) description, not displayed if missing",
    button: "the text displayed inside the button"
}
```
