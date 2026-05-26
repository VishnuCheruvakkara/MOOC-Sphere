from rest_framework import serializers 
import re
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User 
        fields = ["username","email","password"]
    
    def validate_username(self,value):
        if len(value)<3:
            raise serializers.ValidationError("Full name must be at least 3 characters")
        
        if not re.match(r"^[a-zA-Z0-9_ ]+$",value):
            raise serializers.ValidationError("Full name can only contain letters, numbers, underscore and space")

        return value

    def validate_email(self,value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already exists. Please log in")
        return value
    
    def validate_password(self,value):
        if len(value)<6:
            raise serializers.ValidationError("Password must be at least 6 characters")
        
        if not re.search(r"[a-zA-Z]",value):
            raise serializers.ValidationError("Password must contain at least one letter")
        
        if not re.search(r"[0-9]",value):
            raise serializers.ValidationError("Password must contain at least one number")
        
        if not re.search(r"[!@#$%^&*()]",value):
            raise serializers.ValidationError("Password must contain at least one special character")
        
        return value

    def create(self,validated_data):
        user = User.objects.create_user(
            username = validated_data["username"],
            email = validated_data["email"],
            password = validated_data["password"],
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True,min_length=6)

    def validate(self,data):
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")
            
        data["user"] = user 
        return data