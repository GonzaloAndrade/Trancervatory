#coding: utf8
from django.conf.urls import include, url
from django.views.generic import RedirectView
from django.views.generic.base import TemplateView
from Home import views
from django.contrib import admin

urlpatterns = [
                  # Examples:
                  # url(r'^$', 'Trancervatory.views.home', name='home'),
                  # url(r'^blog/', include('blog.urls')),
                  url(r'^$', TemplateView.as_view(template_name='Home/index.html')),
                  url(r'^administrator/$', views.index, name='contact'),
                  url(r'^buy/$', views.buy, name='contact'),
                  url(r'^faq/$', TemplateView.as_view(template_name='Home/faq.html')),
                  url(r'^sendmail/$', views.sendmail, name='sendmail'),
                  url(r'^admin/', include(admin.site.urls)),
              ]

