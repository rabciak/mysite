from django.contrib import admin

from django.contrib.gis import admin
from .models import WorldBorder
from.models import NuclearReactor

admin.site.register(WorldBorder, admin.ModelAdmin)
admin.site.register(NuclearReactor, admin.ModelAdmin)