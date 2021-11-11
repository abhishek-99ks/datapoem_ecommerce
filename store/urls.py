from django.urls import path

from . import views

from .views import PaymentView

app_name = 'store'

urlpatterns = [
    path('', views.home, name='home'),
    path('product/<id>', views.product, name='product'),
    path('add-to-cart/<id>/', views.add_to_cart, name='add-to-cart'),
    path('remove-from-cart/<id>/',
         views.remove_from_cart, name='remove-from-cart'),
    path('remove-item-from-cart/<id>/', views.remove_single_item_from_cart,
         name='remove-single-item-from-cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('cart/', views.cart, name="order-summary"),
    path('payment/<payment_option>/', PaymentView.as_view(), name='payment'),
]
