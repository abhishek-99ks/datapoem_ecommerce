'use strict';
{
    const Rs. = django.jQuery;
    const fields = Rs.('#django-admin-prepopulated-fields-constants').data('prepopulatedFields');
    Rs..each(fields, function(index, field) {
        Rs.('.empty-form .form-row .field-' + field.name + ', .empty-form.form-row .field-' + field.name).addClass('prepopulated_field');
        Rs.(field.id).data('dependency_list', field.dependency_list).prepopulate(
            field.dependency_ids, field.maxLength, field.allowUnicode
        );
    });
}
