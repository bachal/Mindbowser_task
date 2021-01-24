from django.contrib import admin
from employee.models import *
from django.db import models

#--------------------------show Employee table in admin panel-------------------
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin ):
    list_display = [f.name for f in Employee._meta.fields]


#--------------------------show Manager table in admin panel-------------------
@admin.register(Manager_Data)
class Manager_DataAdmin(admin.ModelAdmin ):
    list_display = [f.name for f in Manager_Data._meta.fields]
