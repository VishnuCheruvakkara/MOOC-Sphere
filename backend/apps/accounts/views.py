import logging

from rest_framework_simplejwt.tokens import RefreshToken 
from .serializers import SignupSerializer,LoginSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 

from django.db import IntegrityError

from .utils import set_access_cookie,set_refresh_cookie,delete_access_cookie,delete_refresh_cookie
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from django.conf import settings

logger = logging.getLogger(__name__)

# Create your views here.
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = serializer.save()

                refresh = RefreshToken.for_user(user)
                access = refresh.access_token

                response = Response({"data":{
                    "id":user.id,
                    "username":user.username,
                    "email":user.email,
                    "is_staff":user.is_staff,
                    "is_active":user.is_active,
                    },
                    "message":"Account created successfully"
                    },
                    status=status.HTTP_201_CREATED
                )

                response = set_access_cookie(response,access)
                response = set_refresh_cookie(response,refresh)

                return response
            
            except IntegrityError:
                return Response({"error":"User already exists"},status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response({"error":"Something went wrong"},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        # generate tokens
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response(
            {
                "message": "Login successful",
                "data": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_staff":user.is_staff,
                    "is_active":user.is_active,
                }
            },
            status=status.HTTP_200_OK
        )

        set_access_cookie(response, access)
        set_refresh_cookie(response, refresh)

        return response

class MeView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        user = request.user

        if not user  or not user.is_authenticated:
            return Response({"detail":"Not authenticated"},status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({
            "id":user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "is_active": user.is_active,
        },
        status=status.HTTP_200_OK
    )

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
       
        refresh_token = request.COOKIES.get(settings.JWT_REFRESH_COOKIE_NAME)

        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        response = Response(
            {"message":"Logout successful"},
            status=status.HTTP_200_OK
        )

        delete_access_cookie(response)
        delete_refresh_cookie(response)

        return response
        
        