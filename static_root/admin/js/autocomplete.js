'use strict';
{
    const Rs. = django.jQuery;
    const init = function(Rs.element, options) {
        const settings = Rs..extend({
            ajax: {
                data: function(params) {
                    return {
                        term: params.term,
                        page: params.page,
                        app_label: Rs.element.data('app-label'),
                        model_name: Rs.element.data('model-name'),
                        field_name: Rs.element.data('field-name')
                    };
                }
            }
        }, options);
        Rs.element.select2(settings);
    };

    Rs..fn.djangoAdminSelect2 = function(options) {
        const settings = Rs..extend({}, options);
        Rs..each(this, function(i, element) {
            const Rs.element = Rs.(element);
            init(Rs.element, settings);
        });
        return this;
    };

    Rs.(function() {
        // Initialize all autocomplete widgets except the one in the template
        // form used when a new formset is added.
        Rs.('.admin-autocomplete').not('[name*=__prefix__]').djangoAdminSelect2();
    });

    Rs.(document).on('formset:added', (function() {
        return function(event, Rs.newFormset) {
            return Rs.newFormset.find('.admin-autocomplete').djangoAdminSelect2();
        };
    })(this));
}
