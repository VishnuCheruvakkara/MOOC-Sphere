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

      
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings

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
        

class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get(settings.JWT_REFRESH_COOKIE_NAME)
        if not refresh_token:
            return Response(
                {
                    "code": "REFRESH_TOKEN_MISSING",
                    "detail": "Refresh token not found"
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError:
            response = Response(
                {
                    "code": "REFRESH_TOKEN_INVALID",
                    "detail": "Refresh token expired or invalid"
                },
                status=status.HTTP_403_FORBIDDEN,
            )
            delete_access_cookie(response)
            delete_refresh_cookie(response)
            return response

        data = serializer.validated_data

        response = Response(
            {
                "code": "ACCESS_TOKEN_REFRESHED",
                "message": "Access token refreshed"
            }, status=status.HTTP_200_OK)
        
        set_access_cookie(response, data["access"])

        if api_settings.ROTATE_REFRESH_TOKENS and data.get("refresh"):
            set_refresh_cookie(response, data["refresh"])

        return response