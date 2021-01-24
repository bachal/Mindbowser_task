from django.db import models
from django.contrib.auth.models import User

# -----------------------------------Manager Data  table---------------------------.
class Manager_Data(models.Model): 
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    address=models.CharField(max_length=200)
    company=models.CharField(max_length=200)
    dob=models.DateField(auto_now=False, auto_now_add=False,blank=True,null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.email

# -----------------------------------Employee Data  table---------------------------.
class Employee(models.Model):
    email=models.EmailField(max_length=200,unique = True)
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    password=models.CharField(max_length=200)
    address=models.CharField(max_length=200)
    company=models.CharField(max_length=200)
    mobile=models.CharField(max_length=200)
    city=models.CharField(max_length=200)
    dob=models.DateField(auto_now=False, auto_now_add=False,blank=True,null=True)
    
    

    



