from django.db import models

# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    id_number = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    registration_date = models.DateTimeField('date registered')

    def __unicode__(self):
        return (self.first_name +" "+ self.last_name)

class Promoter(models.Model):
    code = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    id_number = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    registration_date = models.DateTimeField('date registered')

    def __unicode__(self):
        return (self.code + ": " +  self.first_name +" "+ self.last_name)


class Ticket(models.Model):
    type = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    price = models.CharField(max_length=100)

    def __unicode__(self):
        return (self.type + " / $" + self.price)


class Event(models.Model):
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    date = models.DateField("Date")

    def __unicode__(self):
        return (self.name)

class TicketStatus(models.Model):
    status = models.CharField(max_length=50)

    def __unicode__(self):
        return (self.status)

class Promo(models.Model):
    code = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=50)

    def __unicode__(self):
        return (self.code)

class UserTickets(models.Model):
    event = models.ForeignKey(Event)
    buy_date = models.DateTimeField('Fecha de Compra')
    user = models.ForeignKey(User)
    ticket = models.ForeignKey(Ticket)
    quantity = models.IntegerField('Cantidad', default=0)
    ticket_status = models.ForeignKey(TicketStatus)
    promoter = models.ForeignKey(Promoter, blank=True, null=True)
    promo = models.ForeignKey(Promo, blank=True, null=True)
    total = models.CharField(max_length=50)
