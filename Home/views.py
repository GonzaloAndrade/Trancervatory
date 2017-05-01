# coding: utf8
from __future__ import division
from django.http import HttpResponse
from django.template import Context, loader
from django import forms
from django.shortcuts import render_to_response
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
import datetime
import json
import pytz
import sys
from pytz import timezone
from datetime import datetime, timedelta
from Home.models import Ticket
from Home.models import Event
from Home.models import User
from Home.models import UserTickets
from Home.models import TicketStatus
from Home.models import Promoter
from Home.models import Promo
from django.shortcuts import render
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

# Create your views here.
def buy(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        id_number = request.POST.get('id_number')
        city = request.POST.get('city')
        state = request.POST.get('state')
        country = request.POST.get('country')
        phone = request.POST.get('phone')
        quantity = request.POST.get('quantity')
        promo = request.POST.get('promo')
        date = datetime.now(pytz.timezone('America/Guayaquil'))
        user = User(first_name=first_name, last_name=last_name, id_number=id_number, email=email,
                    phone=phone, city=city, state=state, country=country, registration_date=date)
        user.save()

        event = Event.objects.get(pk=1)

        ticket = Ticket.objects.get(pk=2)

        ticket_status = TicketStatus.objects.get(pk=1)

        ThisPromoter = None
        check_promo = Promoter.objects.filter(code=promo).exists()

        if check_promo is True:
            ThisPromoter = Promoter.objects.get(code=promo)

        if promo == "Makubexin":
            ticket = Ticket.objects.get(pk=4)

        # Le asignamos el evento


        total = int(ticket.price) * int(quantity)

        user_ticket = UserTickets(event=event, user=user, ticket=ticket, quantity=quantity,
                                  ticket_status=ticket_status, total=total,  promoter=ThisPromoter, buy_date=date)
        user_ticket.save()

        # Enviar correo

        msg_plain = render_to_string('Email/neworder.html', {'first_name': first_name, 'last_name': last_name, 'id_number': id_number, 'quantity': quantity, 'type': (user_ticket.ticket.price + " - $" + user_ticket.ticket.price), 'total': total})
        msg_html = render_to_string('Email/neworder.html', {'first_name': first_name, 'last_name': last_name, 'id_number': id_number, 'quantity': quantity, 'type': (user_ticket.ticket.type + " - $" + user_ticket.ticket.price), 'total': total})

        subject, from_email, to, bcc = 'Trancervatory', 'ventas@trancervatory.com', email, 'ventas@trancervatory.com'
        text_content = msg_plain
        html_content = msg_html
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to], bcc=[bcc])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return HttpResponse(json.dumps("success"), content_type="application/json")


@login_required
def sendmail(request):
    if request.method == 'GET':
        not_confirmed = UserTickets.objects.filter(ticket_status=1)
        size = not_confirmed.count()

        i = 0
        while i < size:
            user = not_confirmed[i]

            # Enviar correo

            msg_plain = render_to_string('Email/reminder.html',
                                         {'first_name': user.user.first_name, 'last_name': user.user.last_name, 'id_number': user.user.id_number,
                                          'quantity': user.quantity,
                                          'type': (user.ticket.price + " - $" + user.ticket.price),
                                          'total': user.total})
            msg_html = render_to_string('Email/reminder.html',
                                        {'first_name': user.user.first_name, 'last_name': user.user.last_name,
                                         'id_number': user.user.id_number,
                                         'quantity': user.quantity,
                                         'type': (
                                         user.ticket.type + " - $" + user.ticket.price),
                                         'total': user.total})

            subject, from_email, to, = 'Tickets por confirmar en Trancervatory', 'ventas@trancervatory.com', user.user.email
            text_content = msg_plain
            html_content = msg_html
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()

            i += 1
            response = "Success. Correos enviados: " + str(i)
        return HttpResponse(json.dumps(response), content_type="application/json")


@login_required
def index(request):
    all = UserTickets.objects.filter()
    confirmed = UserTickets.objects.filter(ticket_status=3) #cambiar local
    not_confirmed = UserTickets.objects.filter(ticket_status=1)

    entradas_registradas = all.count()
    entradas_confirmadas = confirmed.count()
    entradas_pendientes = not_confirmed.count()

    total = 0
    tickets_confirmed = 0
    tickets_total = 0
    tickets_notconfirmed = 0
    entradas_pendientes_total = 0
    i = 0
    while i < entradas_confirmadas:
        total = int(confirmed[i].total) + int(total)
        tickets_confirmed += int(confirmed[i].quantity)
        i += 1

    j = 0
    while j < entradas_registradas:
        tickets_total = int(all[j].quantity) + int(tickets_total)
        j += 1

    k = 0
    while k < entradas_pendientes:
        tickets_notconfirmed = int(not_confirmed[k].quantity) + int(tickets_notconfirmed)
        entradas_pendientes_total = int(not_confirmed[k].total) + int(entradas_pendientes_total)
        k += 1

    porcentaje = (int(total) / 6000)*100

    context = {
        'entradas_registadas': entradas_registradas,
        'entradas_confirmadas': entradas_confirmadas,
        'entradas_pendientes': entradas_pendientes,
        'entradas_total': total,
        'tickets_confirmed': tickets_confirmed,
        'tickets_total': tickets_total,
        'tickets_notconfirmed': tickets_notconfirmed,
        'entradas_pendientes_total': entradas_pendientes_total,
        'porcentaje': float(porcentaje)
    }
    return render(request, 'Administrator/index.html', context)