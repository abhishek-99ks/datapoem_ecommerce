from django.urls import path

from store.forms import CheckoutForm
from . import views

app_name = 'store'

urlpatterns = [
    path('', views.home, name='home'),
    path('product/<id>', views.product, name='product'),
    path('checkout/', views.checkout, name='checkout'),
]
