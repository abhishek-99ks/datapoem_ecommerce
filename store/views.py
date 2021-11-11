from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from django.utils import timezone


from .forms import CheckoutForm
from django.views.generic import View, ListView

from .models import (
    Item,
    OrderItem,
    Order,
    UserProfile,
    Address
)


def home(request):
    items = Item.objects.all()
    context = {
        'items': items
    }

    return render(request, 'home.html', context)


def product(request, id):
    item = Item.objects.filter(id=id)
    context = {
        'item': item
    }

    return render(request, 'product.html', context)


def checkout(request):
    order = Order.objects.filter(user=request.user, ordered=False)
    form = CheckoutForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            messages.success(request, "Order placed")
            return redirect('home')

    context = {
        'form': form,
        'order': order
    }
    return render(request, 'checkout.html', context)


@login_required
def add_to_cart(request, id):
    item = get_object_or_404(Item, id=id)
    order_item, created = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__id=item.id).exists():
            order_item.quantity += 1
            order_item.save()
            messages.info(request, "This item quantity was updated.")
            return redirect("store:order-summary")
        else:
            order.items.add(order_item)
            messages.info(request, "This item was added to your cart.")
            return redirect("store:order-summary")
    else:
        ordered_date = timezone.now()
        order = Order.objects.create(
            user=request.user, ordered_date=ordered_date)
        order.items.add(order_item)
        messages.info(request, "This item was added to your cart.")
        return redirect("store:order-summary")


def checkout(request):
    return render(request, 'checkout.html')


@login_required
def remove_from_cart(request, id):
    item = get_object_or_404(Item, id=id)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False
    )
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.id).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order.items.remove(order_item)
            order_item.delete()
            messages.info(request, "This item was removed from your cart.")
            return redirect("store:order-summary")
        else:
            messages.info(request, "This item was not in your cart")
            return redirect("store:product", id=id)
    else:
        messages.info(request, "You do not have an active order")
        return redirect("store:product", id=id)


@login_required
def remove_single_item_from_cart(request, id):
    item = get_object_or_404(Item, id=id)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False
    )
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.id).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
            else:
                order.items.remove(order_item)
            messages.info(request, "This item quantity was updated.")
            return redirect("store:order-summary")
        else:
            messages.info(request, "This item was not in your cart")
            return redirect("store:product", id=id)
    else:
        messages.info(request, "You do not have an active order")
        return redirect("store:product", id=id)
