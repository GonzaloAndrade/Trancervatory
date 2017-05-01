from django.contrib import admin
from .models import Ticket
from .models import UserTickets
from .models import User
from .models import TicketStatus
from .models import Event
from .models import Promo
from .models import Promoter


# Register your models here.
class UsersAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'id_number', 'email', 'phone', 'city', 'state', 'country', 'registration_date')
    fields = ['first_name', 'last_name', 'id_number', 'email', 'phone', 'city', 'state', 'country', 'registration_date']


class PromoterAdmin(admin.ModelAdmin):
    list_display = ('code', 'first_name', 'last_name', 'id_number', 'email', 'phone', 'city', 'state', 'country', 'registration_date')
    fields = ['code', 'first_name', 'last_name', 'id_number', 'email', 'phone', 'city', 'state', 'country', 'registration_date']


class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'date')
    fields = ['name', 'city', 'date']


class TicketAdmin(admin.ModelAdmin):
    list_display = ('type', 'location', 'price')
    fields = ['type', 'location', 'price']


class StatusAdmin(admin.ModelAdmin):
    list_display = ['status']
    fields = ['status']


class PromoAdmin(admin.ModelAdmin):
    list_display = ['code', 'description']
    fields = ['code', 'description']


class UserTicketsAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'user_name', 'user_phone', 'user_email', 'user_id', 'user_city', 'promo_code', 'promoter_name', 'buy_date', 'get_ticket', 'quantity', 'total', 'get_ticket_status', 'has_confirmed')
    fields = ['event', 'user', 'user_email', 'user_phone', 'user_id', 'user_city', 'promo', 'promoter', 'buy_date', 'ticket', 'quantity', 'total', 'ticket_status', 'has_confirmed']
    readonly_fields = ['user_email', 'user_phone', 'user_id', 'user_city', 'has_confirmed']

    def event_name(self, obj):
        return obj.event.name
    event_name.short_description = 'Evento'
    event_name.admin_order_field = 'event__name'

    def user_name(self, obj):
        return (obj.user.first_name + " " + obj.user.last_name)
    user_name.short_description = 'Nombre del Comprador'
    user_name.admin_order_field = 'user__first_name'

    def user_id(self, obj):
        return (obj.user.id_number)
    user_id.short_description = 'Cedula'
    user_id.admin_order_field = 'user__id_number'

    def user_city(self, obj):
        return (obj.user.city)
    user_city.short_description = 'Ciudad'
    user_city.admin_order_field = 'user__city'

    def get_ticket(self, obj):
        return (obj.ticket.type + " / $" + obj.ticket.price)
    get_ticket.short_description = 'Ticket'
    get_ticket.admin_order_field = 'ticket__type'

    def get_ticket_status(self, obj):
        return obj.ticket_status.status
    get_ticket_status.short_description = 'Estado de la Venta'
    get_ticket_status.admin_order_field = 'ticket_status__status'

    def promo_code(self, obj):
        if obj.promo is not None:
            return obj.promo.code
        else:
            return ""
    promo_code.short_description = 'Codigo de Promocion'
    promo_code.admin_order_field = 'promo__code'

    def promoter_name(self, obj):
        if obj.promoter is not None:
            return ("Codigo: " + obj.promoter.code + " - " + obj.promoter.first_name + " " + obj.promoter.last_name)
        else:
            return ""
    promoter_name.short_description = 'Nombre del Promotor'
    promoter_name.admin_order_field = 'promoter__first_name'

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'
    user_email.admin_order_field = 'user__email'


    def user_phone(self, obj):
        return obj.user.phone
    user_phone.short_description = 'Celular'
    user_phone.admin_order_field = 'user__phone'


    def has_confirmed(self, obj):
        return obj.ticket_status.status == "Confirmado"
    has_confirmed.admin_order_field = 'ticket_status__status'
    has_confirmed.boolean = True
    has_confirmed.short_description = 'Pago confirmado?'



admin.site.register(User, UsersAdmin)
admin.site.register(Promoter, PromoterAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Ticket, TicketAdmin)
admin.site.register(TicketStatus, StatusAdmin)
admin.site.register(Promo, PromoAdmin)
admin.site.register(UserTickets, UserTicketsAdmin)