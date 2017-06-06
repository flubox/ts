# ai-parser

## To allow data extraction from an Adobe Illustrator file (`some_file.ai`), please, follow the listed steps and specifications below :
[svg options screenshot](./svg_options.png "svg options")

## Export 
- Export to the **SVG format** (`some_file.svg`) using the following options (a screenshot is provided) :
    - Stylisation as attributes
    - no minification
    - not responsive

- options : 
    - ``options.debug: false`` (optional) : Display some console.log|info|warn
    - ``options.domElement`` (required) : The selector for a DOM element, or the DOM element itself
    - ``options.resolve`` (required) : The function triggered onClick, giving the selected id
    - ``options.reject`` (required) : The function triggered on any error
    - ``options.sort`` (optional) : The function used to sort the incoming data
    - ``options.tracking`` (optional) : Object containing Google Analytics tracking informations
        - ``options.tracking.id`` (optional) : The Google Analytics tracking id used for events tracking. If provided, enable automatically events tracking.
        - ``options.tracking.options`` (optional if no `id`, required otherwise) : Google Analytics options used during initialization. see [Analytics.js Field Reference](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference)
        - ``options.tracking.events`` (optional) : Mapping inner events (i.e: onClick) to Google Analytics hit events. See below
    - ``options.translate`` (required) : The function used to obtain the translated texts

n.b : ``options.locale`` is no more provided to the ``options.translate(id)`` function, as it is assumed it will be managed somehow (be it currying, or anything else), and hence, not required anymore.


### Tracking initialization keys and values :

- ``screenResolution``: The full screen resolution of the device
- ``viewportSize``: The viewport used in the page
