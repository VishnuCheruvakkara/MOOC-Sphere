from rest_framework_simplejwt.tokens import RefreshToken 
from .serializers import SignupSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 

from django.db import IntegrityError

from .utils import set_access_cookie,set_refresh_cookie

# Create your views here.

class SignupView(APIView):
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

