from rest_framework import serializers
from employee.models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import exceptions
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext as _
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
User = get_user_model()
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER



class Employee_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name', 'last_name', 'email','password')
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    def validate(self,data):
        email=data.get('email')
        email_check=User.objects.filter(email=email).first()
        if email_check:
           
            raise serializers.ValidationError('Email allready exist!!')
        return data
        

class ManagersignupSerializer(serializers.ModelSerializer):
    
    user = UserSerializer(required=True)
    class Meta:
        model = Manager_Data
        fields = ('id','user','address', 'company','dob')
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        manager, created = Manager_Data.objects.update_or_create(user=user,address=validated_data.pop('address'),company=validated_data.pop('company'),dob=validated_data.pop('dob'))
        return manager

class ManagerloginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    class Meta:
        model = User
        fields = ('id','username','password', 'email')
    def validate(self, data):
        username = data.get("username", "")
        password = data.get("password", "")
        
        if username and password:
            user = User.objects.get(email=username)
            if user: 
                if user.check_password(password):
                    data["user"] = user
                   
            else:
                msg = "Unable to login with given credentials."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Must provide username and password both."
            raise exceptions.ValidationError(msg)
        return data










