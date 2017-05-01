# coding=utf-8

__author__ = 'Makubex'
from django import forms
from Home.models import Event


class EventAdminForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ('name',)
    element_set = forms.ModelMultipleChoiceField(queryset=Event.objects.all())